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
  clickName: string | undefined;
  setClickName: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface UploadColorProp {
  setCaseImage: React.Dispatch<React.SetStateAction<string | Blob | undefined>>;
  setClickName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setHoverName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setUseClick: React.Dispatch<React.SetStateAction<boolean>>;
  case1: ColorChoice;
}

export default function CasePicker({setCaseImage, cases, clickName, setClickName} : UploadColorProps) {
  
  return (
    <>
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <CasePickerDesktop setCaseImage={setCaseImage} cases={cases} clickName={clickName} setClickName={setClickName}/>
      </div>

      {/* Mobile Version */}
      <div className="block lg:hidden">
        <div className="w-full h-45">

        </div>
        <div className="fixed bottom-0 left-0 w-full z-100">
          <CasePickerMobile setCaseImage={setCaseImage} cases={cases} clickName={clickName} setClickName={setClickName}/>
        </div>
      </div>
    </>
  );
}

function CasePickerDesktop({setCaseImage, cases, clickName, setClickName} : UploadColorProps){

  const [hoverName, setHoverName] = useState<string | undefined>(cases[0].name);

  let [useClick, setUseClick] = useState<boolean>(true);

  return (
    <div className="pb-6 px-6">
      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white">
          2
        </div>

        <h2 className="font-semibold uppercase tracking-[0.2em] text-sm text-black">
          Pick a Guard
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
  )
}

function CasePickerMobile({setCaseImage, cases, clickName, setClickName} : UploadColorProps){

  const [hoverName, setHoverName] = useState<string | undefined>(cases[0].name);

  let [useClick, setUseClick] = useState<boolean>(true);

  return (
    <>
      <div className="bg-white p-5 shadow-sm border">
        <h2 className="font-bold text-mb text-black pb-2">
          {useClick ? clickName : hoverName}
        </h2>

        <div className="overflow-x-auto py-2">
          <div className="flex w-max gap-2">
            {cases.map((colorCase: ColorChoice) => (
              <div key={colorCase._id} className="flex-shrink-0">
                <CaseColor
                  setCaseImage={setCaseImage}
                  setClickName={setClickName}
                  setHoverName={setHoverName}
                  setUseClick={setUseClick}
                  case1={colorCase}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
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
        h-15
        w-14
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