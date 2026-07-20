
interface PreviewCardProps {
  cardImage: string | Blob | undefined;
  caseImage: string | Blob | undefined;
  setCardImage: React.Dispatch<React.SetStateAction<string | Blob | undefined>>;
  flip: boolean | undefined;
  caseName: string;
}

import { useRef } from "react";
import { useState } from "react";
import "@/Components/ColorFit/ColorFit.css"
import { useTransition } from "@/Components/TransitionProvider";

export default function PreviewCard({
  cardImage, caseImage, setCardImage, flip, caseName
}: PreviewCardProps) {

    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [dragging, setDragging] = useState(false);

    const { navigate } = useTransition();
  
    const handleClick = () => {
      fileInputRef.current?.click();
    };
  
    const handleFile = (file: File) => {
      if (file.size > MAX_FILE_SIZE) {
        alert("Image must be smaller than 10 MB.");
        return;
      }
  
      const reader = new FileReader();
  
      reader.onload = () => {
        if (typeof reader.result == "string") {
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
    <>
    {/* Desktop Version */}
    <div className="hidden lg:block">
      <div className="relative h-[830px] shadow-sm overflow-hidden rounded-[36px] bg-white">
        <MainPreviewDesktop/>
      </div>
    </div>

    {/* Mobile Version */}
    <div className="block lg:hidden">
      <div className="relative h-[550px] shadow-sm rounded-[36px] bg-white">
        <MainPreviewMobile/>
      </div>
        <button onClick={() => navigate(`/Product/${caseName}`)} className="AlatsiText GuardDetail w-full mt-4 bg-black text-[25px] py-3 px-5 rounded-[20px] cursor-pointer">
            Guard Details
        </button>
    </div>
    </>
  );

  function MainPreviewDesktop(){
    return (
      <>
        {/* <div
          className="absolute
            left-[-200px]
            top-[-150px]
            h-[700px]
            w-[700px]
            rounded-full
            bg-white/30
            blur-3xl
          "
        /> */}

        <div className="flex h-full items-center justify-center overflow-hidden">

          {/* Hidden Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            className={`
              absolute
              ${
                cardImage ? "w-[350px] h-[70%]"
                : "w-[280px] h-[62%] min-w-[300px]"
              }
              max-w-[450px]
              overflow-hidden
              rounded-md
              z-10
              object-contain
              flex
              items-center
              justify-center
              cursor-pointer
              `}

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
          >
            {cardImage ? (
              <img
                src={cardImage}
                className="h-full w-full object-cover pointer-events-none"
              />
            ) : (
              <div className={`relative h-full w-full object-cover 
                  flex-col
                  items-center
                  justify-center
                  rounded-[15px]
                  border-5
                  border-dashed
                  transition
                  ${
                    dragging
                      ? "border-blue-500"
                      : "border-black hover:border-gray-400"
                  }`}>
                
                <h2 className="absolute inset-0 justify-center items-center object-cover 
                  text-black text-xl flex AlatsiText">
                  Upload Your Scan Here
                </h2>
              </div>
            )}
          </button>    

          {/* Case */}
          {caseImage && (
            <img
              src={caseImage}
              alt=""
              width={1000}
              height={600}
              className={
                `
                absolute
                w-auto
                h-[75%]
                object-contain
                pointer-events-none
                overflow-hidden
                z-10
                max-w-[500px]
                ${
                  flip && "rotate-180" 
                }
                `
              }
            />
          )}      

          <button onClick={() => navigate(`/Product/${caseName}`)} className="AlatsiText GuardDetail absolute bottom-5 right-5 bg-black text-[25px] py-3 px-5 rounded-[20px] cursor-pointer">
            Guard Details
          </button>
        </div>
      </>
    );
  }
  function MainPreviewMobile(){
    return (
      <>
        {/* <div
          className="absolute
            left-[-200px]
            top-[-150px]
            h-[700px]
            w-[700px]
            rounded-full
            bg-white/30
            blur-3xl
          "
        /> */}

        <div className="flex h-full items-center justify-center overflow-hidden">

          {/* Hidden Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            className={`
              absolute
              ${
                cardImage ? "w-[250px] h-[75%] max-w-[300px]"
                : "w-[180px] h-[68%] min-w-[220px]"
              }
              max-w-[450px]
              overflow-hidden
              rounded-md
              z-10
              object-contain
              flex
              items-center
              justify-center
              cursor-pointer
              `}

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
          >
            {cardImage ? (
              <img
                src={cardImage}
                className="h-full w-full object-cover pointer-events-none"
              />
            ) : (
              <div className={`relative h-full w-full object-cover 
                  flex-col
                  items-center
                  justify-center
                  rounded-[15px]
                  border-5
                  border-dashed
                  transition
                  ${
                    dragging
                      ? "border-blue-500"
                      : "border-black hover:border-gray-400"
                  }`}>
                
                <h2 className="absolute inset-0 justify-center items-center object-cover 
                  text-black text-xl flex AlatsiText">
                  Upload Your Scan Here
                </h2>
              </div>
            )}
          </button>    

          {/* Case */}
          {caseImage && (
            <img
              src={caseImage}
              alt=""
              width={1000}
              height={600}
              className={
                `
                absolute
                w-auto
                h-[80%]
                object-contain
                pointer-events-none
                overflow-hidden
                z-10
                max-w-[500px]
                ${
                  flip && "rotate-180" 
                }
                `
              }
            />
          )}      

        </div>
      </>
    );
  }
}