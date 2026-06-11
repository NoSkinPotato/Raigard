"use client";
import { useTransition } from "@/Components/TransitionProvider";

import { urlFor } from "../src/lib/image";
import Link from "next/link";
import FadeIn from "@/Components/FadeIn";

export default function ProductBackButton(){

  const { back } = useTransition();

  return (
    <div
        onClick={() => back()}
        className="flex items-center gap-1.5 text-sm text-[#888] hover:text-[#1a1a18] transition-colors duration-200 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back
    </div>
    
  );
}