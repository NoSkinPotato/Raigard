"use client";
import { useTransition } from "@/Components/TransitionProvider";

export default function ColorFitButton({ colors }: any){

 const { navigate } = useTransition();

  return (
    <div className="flex items-center mx-10 lg:mx-50 mt-4 mb-4" onClick={() => navigate("/ColorFitting")}>
        <div className="flex-1 h-px bg-black" />
        <div className="mx-4">
          <div
            className="
              flex items-center gap-3 px-5 py-3 rounded-[20px] bg-gray-100 border-2 border-black
              hover:bg-gray-200 transition cursor-pointer w-fit whitespace-nowrap ">
            {/* <img
                src="/Picture/SlabLogo.png"
                alt="ColorFit"
                className="w-auto h-10 object-contain"
              /> */}
            {/* <div className="flex items-center justify-center rounded-full border border-black px-3 py-2">
              
            </div> */}
            <h1 className="text-sm md:text-base font-medium  ColorFitting">
              COLOR FITTING
            </h1>
          </div>
        </div>
        <div className="flex-1 h-px bg-black" />
    </div>
  );
}