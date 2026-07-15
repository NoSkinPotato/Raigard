'use client'

import { useEffect, useRef, useState } from "react";

interface ToolbarProps {
  onFlip: () => void;
  onShuffle: () => void;
  onClear: () => void;
}

export default function Toolbar({
  onFlip, onShuffle, onClear
}: ToolbarProps) {

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

  return (
    <>
      <div className="hidden lg:block">
        <div
          className="
            absolute right-6 top-1/2 -translate-y-1/2
            flex flex-col gap-8
            rounded-2xl bg-white/90  p-3
            shadow-xl backdrop-blur-md border border-neutral-200
          ">
          <ToolbarSlider onFlip={onFlip} onShuffle={onShuffle} onClear={onClear}/>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="block lg:hidden sticky top-0 z-100">
        <div ref={sentinelRef} className="h-px" />
        <nav
          className="mt-5 mx-5 py-2 flex gap-10 justify-center
            rounded-2xl bg-white/60 border border-neutral-200
          ">
          <ToolbarSlider onFlip={onFlip} onShuffle={onShuffle} onClear={onClear}/>
        </nav>
      </div>
    </>
  );
}

interface ToolbarButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
}

function ToolbarSlider({
  onFlip, onShuffle, onClear
}: ToolbarProps){
  return(
    <>
      <ToolbarButton
        icon="/Picture/FlipIcon.svg"
        label="Flip"
        onClick={onFlip}
      />

      <ToolbarButton
        icon="/Picture/ShuffleIcon.png"
        label="Shuffle"
        onClick={onShuffle}
      />

      <ToolbarButton
        icon="/Picture/ClearIcon.jpg"
        label="Clear"
        onClick={onClear}
      /> 
    </>
  )
}

function ToolbarButton({
  icon,
  label,
  onClick,
}: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      title={label}
      className="
        h-16
        w-14

        rounded-xl
        transition-all
        duration-200

        hover:bg-neutral-100
        hover:scale-105

        active:scale-95
      "
    >
      <div className="flex h-[50%] w-full items-center justify-center">
        <img
         src={icon}
         alt={label}
         className="
           h-full
           w-[60%]
           object-contain
           items-center justify-center
           transition
           group-hover:scale-110
         "
        />
      </div>
      
      <h2 className="text-black mt-1">
        {label}
      </h2>
    </button>
    
  );
}