
import Link from "next/link";
import Image from "next/image";
import { client } from "@/src/lib/sanity";
import { urlFor } from "@/src/lib/image";
import { getProduct } from "@/src/lib/sanity";



export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id} = await params;

  const query = `
      *[_type == "product" && _id == $id]{
        _id,
        name,
        price,
        description,
        colorGradient,
        mainImage,
        sideImage
      }
    `;

  const product = await client.fetch(`
      *[_type == "product" && _id == $id]{
        _id,
        name,
        price,
        description,
        colorGradient,
        mainImage,
        sideImage,
        video{
          asset->{
            url
          }
        }
      }[0]
    `, {id});
  
  return (
    
    <main className="min-h-screen bg-[#f5f4f1] text-[#1a1a18] font-sans">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <Link
            href="/"
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
          </Link>

        <div className="flex justify-between items-start mb-2">
          <h1 className="text-[38px] font-medium leading-[1.15] tracking-[-0.02em]">
            {product.name}
          </h1>
          <div className="text-right pt-1.5">
            <p className="text-[28px] font-medium">$480</p>
          </div>
        </div>

        <p className="text-[15px] text-[#666] leading-relaxed max-w-sm mb-8">
          {product.description}
        </p>

        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#e2dfd8] mb-5 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2.5 text-[#b0aca5]">
            {product.mainImage && (
              <img
                src={urlFor(product.mainImage).url()}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <span className="absolute bottom-4 left-5 text-[11px] text-[#7a7770] tracking-[0.06em] bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full">
            Hero shot
          </span>
        </div>

        {/* Side Images */}
        <div className="grid grid-cols-2 gap-5 mb-10">
          {[
            { label: "Image", bg: "bg-[#d8dde3]" },
            { label: "Video", bg: "bg-[#dedad2]" },
          ].map(({ label, bg }) => (
            <div
              key={label}
              className={`aspect-square rounded-2xl overflow-hidden ${bg} flex flex-col items-center justify-center gap-2.5 text-[#9a9691]`}
            >
              {label == "Image" && product.sideImage && (
                <img
                  src={urlFor(product.sideImage).url()}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
              {label == "Video" && product.video && (
                <video
                  src={product.video.asset.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover object-bottom"
                />
              )}
              
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
