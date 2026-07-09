"use client";
import { useState } from "react";
import UploadCard from "@/Components/ColorFit/UploadCard";
import CasePicker from "@/Components/ColorFit/CasePicker";
import PreviewCard from "@/Components/ColorFit/PreviewArea";
import ProductBackButton from "@/Components/ProductBackButton"

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

    return(
        <main className="min-h-screen bg-[#F7F4EF]">
      {/* <section id="home" className="flex w-full bg-white py-5 justify-center border-b-5 border-black" >
        <img className="HeaderLogo"
          src="/Picture/Raigard.png"
          alt="Store Logo"
          width={150}
          height={20}
        />
      </section> */}
      
      <div className="mx-auto flex max-w-[1700px] gap-8 p-8">
        
        {/* Left Panel */}
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
        
        {/* Preview */}
        <section className="flex-1">
          <PreviewCard cardImage={cardImage} caseImage={caseImage}/>
        </section>

      </div>
    </main>
    );
}