"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

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

  const navigate = (href: string) => {
    setIsTransitioning(true);

    setTimeout(() => {
      router.push(href);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    }, 600);
  };

  const back = () => {
    setIsTransitioning(true);

    setTimeout(() => {
      router.back();

      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    }, 600);
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