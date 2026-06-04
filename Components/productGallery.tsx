"use client";

import { useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import { HTMLAttributes } from "react";

import "yet-another-react-lightbox/styles.css";

type Props = {
  slides: any[];
  children: React.ReactNode;
  index: number;
} & HTMLAttributes<HTMLDivElement>;

export default function ProductMediaGallery({
  slides,
  children,
  index,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="w-full h-full cursor-pointer"
      >
        {children}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Video]}
      />
    </>
  );
}