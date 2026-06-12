"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { usePathname, useRouter } from "next/navigation";

type TransitionContextType = {
  navigate: (href: string) => void;
  back: () => void;
};

const TransitionContext = createContext<TransitionContextType | null>(null);

export function TransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
  if (isTransitioning) {
    setTimeout(() => {
      setIsTransitioning(false);
    }, 200); // fade back out
  }
}, [pathname]);

  const navigate = (href: string) => {
    setIsTransitioning(true);

    setTimeout(() => {
      router.push(href);
    }, 500);
  };

  const back = () => {
    setIsTransitioning(true);

    setTimeout(() => {
      router.back();
    }, 700);
  };

  return (
    <TransitionContext.Provider value={{ navigate , back}}>
      {children}

      <div
        className={`
          fixed inset-0
          bg-white
          z-[9999]
          pointer-events-none
          transition-opacity
          duration-700
          ${
            isTransitioning
              ? "opacity-100"
              : "opacity-0"
          }
        `}
      />
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);

  if (!context) {
    throw new Error(
      "useTransition must be used inside TransitionProvider"
    );
  }

  return context;
}