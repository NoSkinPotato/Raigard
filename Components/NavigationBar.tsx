"use client";

import { useEffect, useRef, useState } from "react";
import "../app/homePage.css"

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
        (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-15% 0px -15% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsSticky(!entry.isIntersecting);
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const links = [
    { id: "home", label: "HOME" },
    { id: "catalog", label: "CATALOG" },
    { id: "story", label: "STORY" },
    { id: "marketplace", label: "MARKETPLACE" },
    // { id: "reviews", label: "REVIEW" },
  ];

  return (
    <>
      <div ref={sentinelRef} className="h-px" />

      <nav className="sticky top-4 z-100 pb-5 flex justify-center">
        <div
          className={`
            flex items-center
            rounded-xl
            border
            px-3
            py-2
            transition-all
            duration-300
            ${
              isSticky
                ? "bg-white/70 backdrop-blur-xl shadow-lg"
                : "bg-white shadow-md"
            }
          `}
        >
          {links.map((link, index) => (
            <div key={link.id} className="flex items-center NavBar">
              <a
                href={`#${link.id}`}
                className={`
                  rounded-xl
                  px-1.5
                  py-2
                  sm: text-sm
                  lg: text-md
                  font-medium
                  transition-all
                  duration-400
                  ${
                    activeSection === link.id
                      ? "bg-black text-white"
                      : "text-gray-700 hover:text-black"
                  }
                `}
              >
                {link.label}
              </a>

              {index !== links.length - 1 && (
                <div className="mx-2 h-5 w-px bg-gray-300" />
              )}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
