"use client";
import { useState } from "react";

interface ColorChoice {
  _id: string;
  name: string;
  imageUrl: string;
  colorGradient: any;
}

interface UploadColorProps {
  setCaseImage: React.Dispatch<React.SetStateAction<string | Blob | undefined>>;
  cases: ColorChoice[]
}

interface UploadColorProp {
  setCaseImage: React.Dispatch<React.SetStateAction<string | Blob | undefined>>;
  setClickName: React.Dispatch<React.SetStateAction<string>>;
  setHoverName: React.Dispatch<React.SetStateAction<string>>;
  setUseClick: React.Dispatch<React.SetStateAction<boolean>>;
  case1: ColorChoice;
}

export default function CasePicker({setCaseImage, cases} : UploadColorProps) {

  const [clickName, setClickName] = useState<string>(cases[0].name);
  const [hoverName, setHoverName] = useState<string>(cases[0].name);

  let [useClick, setUseClick] = useState<boolean>(true);
  
  return (
    <div className=" p-6">
      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white">
          2
        </div>

        <h2 className="font-semibold uppercase tracking-[0.2em] text-sm text-black">
          Pick a Case
        </h2>

      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm border">
        <h2 className="font-bold text-mb text-black pb-2">
          {useClick ? clickName : hoverName}
        </h2>
        <div className="grid grid-cols-5 gap-3">
            {cases.map((colorCase: ColorChoice) => (
              <CaseColor key={colorCase._id} 
              setCaseImage={setCaseImage} 
              setClickName={setClickName}
              setHoverName={setHoverName}
              setUseClick={setUseClick}
              case1={colorCase} />
            ))}
          </div>
      </div>
      
    </div>
  );
}

function CaseColor ({setCaseImage, setClickName, setHoverName, setUseClick, case1} : UploadColorProp){

  const ClickHandler = () => {
    setCaseImage(case1.imageUrl);
    setClickName(case1.name);
  };

  const MouseEnter = () => {
    setHoverName(case1.name);
    setUseClick(false);
  };

  const MouseLeave = () => {
    setUseClick(true);
  };

  const gradient = `linear-gradient(
    to bottom,
    ${case1.colorGradient
      ?.map((color: any) => color.hex)
      .join(", ")}
  )`;
  return (
    <button
      onClick={ClickHandler}
      onMouseEnter={MouseEnter}
      onMouseLeave={MouseLeave}
      className="
        h-14
        rounded-xl
        shadow
        transition
        hover:scale-105
        active:scale-95
      "
      style={{
        background: gradient,
      }}
    />
  );
}