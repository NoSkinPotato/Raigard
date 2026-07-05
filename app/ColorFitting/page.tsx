"use client";

import { useState } from "react";

export default function ImageUpload() {
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-4">

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="border p-2"
      />

      {image && (
        <img
          src={image}
          alt="preview"
          className="w-64 h-64 object-cover rounded-xl border"
        />
      )}

    </div>
  );
}