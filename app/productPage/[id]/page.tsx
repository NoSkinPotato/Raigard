

import Link from "next/link";
import { client } from "@/src/lib/sanity";
import { urlFor } from "@/src/lib/image";
import ProductGallery from "@/Components/productGallery";
import "yet-another-react-lightbox/styles.css";
import "@/Components/productCard.css"
import { preload } from "react-dom";


export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id} = await params;

  const product = await client.fetch(`
      *[_type == "product" && _id == $id]{
        _id,
        name,
        price,
        description,
        colorGradient,
        mainImage,
        sideImage,
        smallVideo{
          asset->{
            url
          }
        },
        bigVideo{
          asset->{
            url
          }
        }
      }[0]
    `, {id});

    const pageSlides: any[] = [];
    
    if (product.mainImage) {
      pageSlides.push({
        src: urlFor(product.mainImage).url(),
      });
    }
    if (product.sideImage) {
      pageSlides.push({
        src: urlFor(product.sideImage).url(),
      });
    }

    if (product.bigVideo?.asset?.url) {
      pageSlides.push({
        type: "video",
        width: 2160,
        height: 3840,
        autoPlay: true,
        muted: true,
        loop: true,
        playsInline: true,
        controls: false,
        preload: false,
        sources: [
          {
            src: product.bigVideo.asset.url,
            type: "video/mp4",
          },
        ],
      });
    }
  
  return (
    
    <main className="min-h-screen bg-[#f5f4f1] text-[#1a1a18]">
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
          <h1 className="text-[38px] font-medium leading-[1.15] tracking-[-0.02em] ProductMainName">
            {product.name}
          </h1>
          {/* <div className="text-right pt-1.5">
            <p className="text-[28px] font-medium">Rp 139.000,00</p>
          </div> */}
        </div>

        <p className="text-[20px] text-[#666] leading-relaxed max-w-sm mb-8 ProductMainDescription">
          {product.description}
        </p>

        <div className="relative w-full aspect-[4/3] rounded-2xl shadow-lg overflow-hidden bg-[#e2dfd8] mb-5 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2.5 text-[#b0aca5]">
            <ProductGallery
              slides={pageSlides}
              index={0}
              className="w-full h-full object-cover"
            >
            {product.mainImage && (
              <img
                src={urlFor(product.mainImage).url()}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
            </ProductGallery>
          </div>
          {/* <span className="absolute bottom-4 left-5 text-[11px] text-[#7a7770] tracking-[0.06em] bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full">
            Hero shot
          </span> */}
        </div>

        {/* Side Images */}
        <div className="grid grid-cols-2 gap-5 mb-10">
          {[
            { label: "Image", bg: "bg-[#d8dde3]" },
            { label: "Video", bg: "bg-[#dedad2]" },
          ].map(({ label, bg }) => (
            <div
              key={label}
              className={`aspect-[3/5] rounded-2xl overflow-hidden shadow-lg ${bg} flex flex-col items-center justify-center gap-2.5 text-[#9a9691]`}
            >
              {label == "Image" && product.sideImage && (
                <ProductGallery
                  slides={pageSlides}
                  index={1}
                >
                  <img
                    src={urlFor(product.sideImage).url()}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </ProductGallery>
              )}
              {label == "Video" && product.smallVideo && (
                <ProductGallery
                  slides={pageSlides}
                  index={2}
                >
                <video
                  src={product.smallVideo.asset.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover object-bottom"
                />
                </ProductGallery>
              )}
              
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
