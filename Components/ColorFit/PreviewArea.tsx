import { div } from "framer-motion/client";

interface PreviewCardProps {
  cardImage: string | Blob | undefined;
  caseImage: string | Blob | undefined;
}

export default function PreviewCard({
  cardImage, caseImage
}: PreviewCardProps) {

  return (
    <div className="relative h-[830px] overflow-hidden rounded-[36px] bg-[#D9D1C5]">

      {/* Light */}
      <div
        className="
          absolute
          left-[-200px]
          top-[-150px]
          h-[700px]
          w-[700px]
          rounded-full
          bg-white/30
          blur-3xl
        "
      />

      <div className="relative flex h-full items-center justify-center">

        <div
          className="
            absolute
            w-[35%]
            h-[85%]
            overflow-hidden
            rounded-md
            z-10
            items-center
            flex
            justify-center
          "
        >
          {cardImage ? (
            <img
              src={cardImage}
              className="h-full w-full object-cover"
            />
          ) : (
            <h1 className=" text-lg text-black">
              Place Your Card
            </h1>
          )}
        </div>    

        {/* Case */}
        {caseImage && (
          <img
            src={caseImage}
            alt=""
            width={1000}
            height={600}
            className="
              absolute
              h-[91%]
              w-auto
              object-contain
              pointer-events-none
              z-10
            "
          />
        )}      

      </div>

      {/* {caseImage ? (
        <div className="relative w-[380px] aspect-[0.62]">
          <div
            className="
              absolute
              left-[12%]
              top-[8%]
              w-[76%]
              h-[84%]
              overflow-hidden
              rounded-lg
            "
          >
            <img
              src={caseImage}
              className="h-full w-full object-cover"
            />
          </div>

          <img
            src={cardImage}
            className="absolute inset-0 h-full w-full object-contain"
          />

        </div>
        ) : (
          <div className="flex h-full items-center justify-center text-white">
            Pick a Case
          </div>
        )} */}
      
    </div>
  );
}