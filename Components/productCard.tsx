import { urlFor } from "../src/lib/image";
import "./productCard.css"

export default function ProductCard({ product }: any) {

  const gradient = `linear-gradient(
    to right,
    ${product.colorGradient
      ?.map((color: any) => color.hex)
      .join(", ")}
  )`;

  return (
    
    <div className="relative w-full h-[300px] flex justify-center">
      <img
        src={urlFor(product.image).width(800).url()}
        alt={product.name}
        width={800}
        height={800}
        className="h-full w-45 object-cover items-center justify-center "
      />
      <h3 className="ProductName" 
        style={{
          background: gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        >
          {product.name}
      </h3>
    </div>
  );
}