"use client";
import { useState, useEffect } from "react";
import UploadCard from "@/Components/ColorFit/UploadCard";
import CasePicker from "@/Components/ColorFit/CasePicker";
import PreviewCard from "@/Components/ColorFit/PreviewArea";
import ProductBackButton from "@/Components/ProductBackButton"
import { useTransition } from "@/Components/TransitionProvider";
import { main } from "framer-motion/client";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface CaseColors {
  _id: string;
  name: string;
  imageUrl: string;
  colorGradient: any[];
}

export default function ColorFitClient({
  colors,
}: {
  colors: CaseColors[];
}){
  const [cardImage, setCardImage] = useState<string | Blob | undefined>();
  const [caseImage, setCaseImage] = useState<string | Blob | undefined>();
  
  const { back } = useTransition();

  if (caseImage == null){
     setCaseImage(colors[0].imageUrl);
  }

  useEffect(() => {
    if (!colors.length) return; 

    colors.forEach((color) => {
      const img = new Image();
      img.src = color.imageUrl;
    });
  }, [colors]);

    return(
      // Desktop Version
      <main>
        <div className="min-h-screen bg-[#F7F4EF] hidden lg:block">
  ...     <div className="mx-auto flex max-w-[1500px] gap-8 px-8 pt-4">
            <aside className="w-[400px] ">
              <img className="mx-auto cursor-pointer"
                src="/Picture/Raigard.png"
                alt="Store Logo"
                width={150}
                height={20}
                onClick={() => back()}
              />
              <UploadCard setCardImage={setCardImage}/>
              <CasePicker setCaseImage={setCaseImage} cases={colors} />
            </aside>

            <section className="flex-1">
              <PreviewCard cardImage={cardImage} caseImage={caseImage} setCardImage={setCardImage}/>
            </section>
          </div>
        </div>

        {/* Mobile Version */}
        <div className="min-h-screen bg-[#F7F4EF] block lg:hidden">
          <div className="flex items-center justify-center">
            <img className="HeaderLogo flex justify-center items-center  cursor-pointer"
                src="/Picture/Raigard.png"
                alt="Store Logo"
                width={150}
                height={20}
                onClick={() => back()}
              />
          </div>
          <div className="m-5">
            <PreviewCard cardImage={cardImage} caseImage={caseImage}  setCardImage={setCardImage}/>
          </div>
          
          <UploadCard setCardImage={setCardImage}/>
          <CasePicker setCaseImage={setCaseImage} cases={colors} />
        </div>
      </main>
    );
}