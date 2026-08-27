"use client";
import { useState, useEffect } from "react";
import UploadCard from "@/Components/ColorFit/UploadCard";
import CasePicker from "@/Components/ColorFit/CasePicker";
import PreviewCard from "@/Components/ColorFit/PreviewArea";
import Toolbar from "@/Components/ColorFit/Toolbar";
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
  
  const [flip, setFlip] = useState<boolean | undefined>();
  const [clickName, setClickName] = useState<string | undefined>(colors[0].name);
  const [currColorIndex, setColorIndex] = useState<number>(0);

  const { back } = useTransition();

  function Flip(): void {
    setFlip(!flip);
  }

  function Shuffle(): void {

    let randomIndex = Math.floor(Math.random() * colors.length);
    
    while(randomIndex == currColorIndex){
      randomIndex = Math.floor(Math.random() * colors.length);
    }
    
    setColorIndex(randomIndex);
    setCaseImage(colors[randomIndex].imageUrl);
    setClickName(colors[randomIndex].name);
  }

  function ClearCard(): void {
    setCardImage('');
  }

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
              <CasePicker setCaseImage={setCaseImage} cases={colors} clickName={clickName} setClickName={setClickName} setColorIndex={setColorIndex}/>
            </aside>

            <section className="flex-1">
              <PreviewCard cardImage={cardImage} caseImage={caseImage} setCardImage={setCardImage} flip={flip} caseName={colors[currColorIndex].name}/>
              <Toolbar onFlip={Flip} onShuffle={Shuffle} onClear={ClearCard}/>
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
          <Toolbar onFlip={Flip} onShuffle={Shuffle} onClear={ClearCard}/>
          <div className="m-5">
            <PreviewCard cardImage={cardImage} caseImage={caseImage}  setCardImage={setCardImage} flip={flip} caseName={colors[currColorIndex].name}/>
          </div>
          
          <UploadCard setCardImage={setCardImage}/>
          <CasePicker setCaseImage={setCaseImage} cases={colors} clickName={clickName} setClickName={setClickName} setColorIndex={setColorIndex}/>
        </div>
      </main>
    );
}