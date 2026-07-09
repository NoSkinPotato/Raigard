import { div } from "framer-motion/client";

interface PreviewCardProps {
  cardImage: string | Blob | undefined;
  caseImage: string | Blob | undefined;
}

export default function PreviewCard({
  cardImage, caseImage
}: PreviewCardProps) {

  return (
    <>
    {/* Desktop Version */}
    <div className="hidden lg:block">
      <div className="relative h-[830px] overflow-hidden rounded-[36px] bg-[#D9D1C5]">
        <MainPreview/>
      </div>
    </div>

    {/* Mobile Version */}
    <div className="block lg:hidden">
      <div className="relative h-[800px] overflow-hidden rounded-[36px] bg-[#D9D1C5]">
        <MainPreview/>
      </div>
    </div>
    </>
  );

  function MainPreview(){
    return (
      <>
        <div
          className="absolute
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
      </>
    );
  }
}