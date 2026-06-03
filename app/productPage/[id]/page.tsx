import Image from "next/image";
import { getProduct } from "@/src/lib/sanity";


export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);

  return (
    
    <main className="min-h-screen bg-[#f5f4f1] text-[#1a1a18] font-sans">
      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Header */}
        <p className="text-[10px] tracking-[0.14em] uppercase text-[#aaa] mb-3">
          New arrival — 2026
        </p>

        <div className="flex justify-between items-start mb-2">
          <h1 className="text-[38px] font-medium leading-[1.15] tracking-[-0.02em]">
            Object
            <br />
            No. 7
          </h1>
          <div className="text-right pt-1.5">
            <p className="text-[28px] font-medium">$480</p>
            <p className="text-xs text-[#aaa] mt-1">Free shipping</p>
          </div>
        </div>

        <p className="text-[15px] text-[#666] leading-relaxed max-w-sm mb-8">
          Designed for the everyday. Crafted for a lifetime. Every detail
          considered, nothing added without purpose.
        </p>

        {/* Hero Image */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#e2dfd8] mb-5 flex items-center justify-center">
          {/* Replace the div below with <Image> from next/image */}
          <div className="flex flex-col items-center gap-2.5 text-[#b0aca5]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-xs tracking-[0.06em]">Main product image</span>
          </div>
          <span className="absolute bottom-4 left-5 text-[11px] text-[#7a7770] tracking-[0.06em] bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full">
            Hero shot
          </span>
        </div>

        {/* Side Images */}
        <div className="grid grid-cols-2 gap-5 mb-10">
          {[
            { label: "Detail view", bg: "bg-[#d8dde3]" },
            { label: "Lifestyle", bg: "bg-[#dedad2]" },
          ].map(({ label, bg }) => (
            <div
              key={label}
              className={`aspect-square rounded-2xl overflow-hidden ${bg} flex flex-col items-center justify-center gap-2.5 text-[#9a9691]`}
            >
              {/* Replace with <Image> from next/image */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span className="text-[11px] tracking-[0.05em]">{label}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[#00000012] mb-8" />

        {/* Specs */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Material", value: "Grade 5", unit: "Titanium" },
            { label: "Weight", value: "84g", unit: "Ultralight" },
            { label: "Warranty", value: "10 yr", unit: "Guaranteed" },
          ].map(({ label, value, unit }) => (
            <div key={label}>
              <p className="text-[10px] tracking-[0.1em] uppercase text-[#aaa] mb-1.5">
                {label}
              </p>
              <p className="text-lg font-medium">{value}</p>
              <p className="text-[13px] text-[#888] mt-0.5">{unit}</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
