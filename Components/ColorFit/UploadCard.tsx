"use client";

import { useRef } from "react";
import { useState } from "react";

interface UploadCardProps {
  setCardImage: React.Dispatch<React.SetStateAction<string | Blob | undefined>>;
}

export default function UploadCard({
  setCardImage,
}: UploadCardProps) {
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setCardImage(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    handleFile(file);
  };

  return (
    <div className="p-6 ">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-sm text-white">
          1
        </div>

        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-black">
          Upload Card
        </h2>
      </div>

      {/* Hidden Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Your Custom Button */}
      <button
        onClick={handleClick}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}        

        onDragLeave={() => setDragging(false)}        

        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);       

          const file = e.dataTransfer.files?.[0];       

          if (!file) return;        

          if (!file.type.startsWith("image/")) return;        

          handleFile(file);
        }}
        className={`
          flex
          h-32
          w-full
          flex-col
          items-center
          justify-center
          rounded-2xl
          border-2
          border-dashed
          transition
          ${
            dragging
              ? "border-blue-500 bg-blue-50"
              : "border-neutral-300 hover:border-neutral-700"
          }
        `}
      >
        <p className="mt-5 font-bold text-black">Drop a Card Scan Here</p>

        <span className="text-neutral-500">
          or browse
        </span>
      </button>
    </div>
  );
}