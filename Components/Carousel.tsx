"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { urlFor } from "@/src/lib/image";

interface Carousel {
  _id: string;
  Number: number;
  image: any;
}

export default function Carousel({
  carousels,
}: {
  carousels: Carousel[];
}) {
  const [current, setCurrent] = useState(0);

  const touchStartX = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const total = carousels.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      next();
    }, 4000);
  }, [next]);

  useEffect(() => {
    resetInterval();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetInterval]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;

    if (delta > 50) {
      prev();
      resetInterval();
    }

    if (delta < -50) {
      next();
      resetInterval();
    }
  };

  const getOffset = (index: number) => {
    let offset = index - current;

    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    return offset;
  };

  if (!carousels.length) return null;

  return (
    <div
      className="relative w-full h-[500px] overflow-hidden bg-white"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {carousels.map((product, index) => {
        const offset = getOffset(index);

        let translateX = 0;
        let scale = 0.7;
        let opacity = 0;
        let zIndex = 0;

        if (offset === 0) {
          translateX = 0;
          scale = 1;
          opacity = 1;
          zIndex = 30;
        } else if (offset === -1) {
          translateX = -260;
          scale = 0.82;
          opacity = 0.75;
          zIndex = 20;
        } else if (offset === 1) {
          translateX = 260;
          scale = 0.82;
          opacity = 0.75;
          zIndex = 20;
        } else {
          opacity = 0;
          zIndex = 0;
        }

        return (
          <div
            key={product.Number}
            className="
              absolute
              left-1/2
              top-1/2
              pb-10
              transition-all
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
            "
            style={{
              zIndex,
              opacity,
              transform: `
                translate(-50%, -50%)
                translateX(${translateX}px)
                scale(${scale})
              `,
            }}
          >
            <div
              className="
                w-[80vw] 
                max-w-[450px]
                aspect-[4/4]
                rounded-3xl
                overflow-hidden
                object-contain
                shadow-2xl
                bg-white
              "
            >
              <img
                src={urlFor(product.image).width(1200).url()}
                alt=""
                className="w-full h-full object-contain"
                draggable={false}
              />

            </div>
          </div>
        );
      })}

      <button
        onClick={() => {
          prev();
          resetInterval();
        }}
        className="
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          z-50
          w-10
          h-10
          rounded-full
          bg-black
          backdrop-blur
          shadow-lg
          hover:scale-110
          transition
        "
      >
        <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 18l-6-6 6-6" />
            </svg>
      </button>

      <button
        onClick={() => {
          next();
          resetInterval();
        }}
        className="
          absolute
          right-5
          top-1/2
          -translate-y-1/2
          z-50
          w-10
          h-10
          flex items-center justify-center
          rounded-full
          bg-black
          backdrop-blur
          shadow-lg
          hover:scale-110
          transition
        "
      >
        <svg
              xmlns="http://www.w3.org/2000/svg"
              className="scale-x-[-1]"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2  flex gap-2 z-50">
        {carousels.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index);
              resetInterval();
            }}
            className={`
              transition-all duration-300 rounded-full
              ${
                index === current
                  ? "w-6 h-2 bg-black"
                  : "w-2 h-2 bg-black/30 hover:bg-black"
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}