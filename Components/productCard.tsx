"use client";
import { useTransition } from "@/Components/TransitionProvider";

import { urlFor } from "../src/lib/image";
import "./productCard.css"
import FadeIn from "@/Components/FadeIn";

export default function ProductCard({ product }: any) {

  const rightGradient = `linear-gradient(
    to right,
    ${product.colorGradient
      ?.map((color: any) => color.hex)
      .join(", ")}
  )`;

  const bottomGradient = `linear-gradient(
    to bottom,
    ${product.colorGradient
      ?.map((color: any) => color.hex)
      .join(", ")}
  )`;

  const { navigate } = useTransition();

  return (
    
    <div className="
    relative min-w-[100px] w-[calc(33.333%-0.5rem)] 
    sm:w-[calc(25%-2rem)]
    md:w-[calc(25%-2rem)]
    lg:w-[calc(25%-2rem)]
      justify-center ">
        <FadeIn>
        <div className="p-[4px] rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" >
          <div onClick={() => navigate(`/Product/${product.name}`)}>
           <div className="bg-[#F2F2F2] rounded-[10px] shadow-lg p-0.75 productBackground">
            <div className="absolute inset-1 rounded-[10px] productOverlap"
              style={
                {
                  background: bottomGradient,
                } 
              }> </div>
            <img
                src={urlFor(product.image).width(600).url()}
                alt={product.name}
                width={600}
                height={800}
                className="relative h-full w-45 "
              />
              <h3 className="ProductName" 
                style={{
                  background: rightGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                >
                  {product.name}
              </h3>
          </div>
          </div>
        </div>
        </FadeIn>
    </div>
  );
}