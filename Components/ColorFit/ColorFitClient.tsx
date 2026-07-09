"use client";
import { useState, useEffect } from "react";
import UploadCard from "@/Components/ColorFit/UploadCard";
import CasePicker from "@/Components/ColorFit/CasePicker";
import PreviewCard from "@/Components/ColorFit/PreviewArea";
import ProductBackButton from "@/Components/ProductBackButton"
import { main } from "framer-motion/client";

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

  if (caseImage == null){
     setCaseImage(colors[0].imageUrl);
  }

  const preloadImage = (url: string) => {
    const img = new Image();
    img.src = url;
  };
  
  colors.forEach((color) => preloadImage(color.imageUrl));

    return(
      // Desktop Version
      <main>
        <div className="min-h-screen bg-[#F7F4EF] hidden lg:block">
  ...     <div className="mx-auto flex max-w-[1700px] gap-8 p-8">
            <aside className="w-[400px] shrink-0">
              <img className="HeaderLogo mx-4"
                src="/Picture/Raigard.png"
                alt="Store Logo"
                width={150}
                height={20}

              />
              <UploadCard setCardImage={setCardImage}/>
              <CasePicker setCaseImage={setCaseImage} cases={colors} />
            </aside>

            <section className="flex-1">
              <PreviewCard cardImage={cardImage} caseImage={caseImage}/>
            </section>
          </div>
        </div>

        {/* Mobile Version */}
        <div className="min-h-screen bg-[#F7F4EF] block lg:hidden">
          <div className="flex items-center justify-center">
            <img className="HeaderLogo flex justify-center items-center"
                src="/Picture/Raigard.png"
                alt="Store Logo"
                width={150}
                height={20}
              />
          </div>
          <div className="m-5">
            <PreviewCard cardImage={cardImage} caseImage={caseImage}/>
          </div>
          
          <UploadCard setCardImage={setCardImage}/>


              {/* <CasePicker setCaseImage={setCaseImage} cases={colors} /> */}
            

            {/* <section className="flex-1">
              <PreviewCard cardImage={cardImage} caseImage={caseImage}/>
            </section> */}
          
        </div>
      </main>
    );
}