"use client";

import Image from "next/image";
import hatch from "@/public/home/models/hatch.jpg";
import sedan from "@/public/home/models/sedan.jpeg";
import suv from "@/public/home/models/SUV.jpeg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronRight } from "lucide-react";

const Models = () => {
  return (
    <div className="p-main flex flex-col gap-6 p-4 pt-24">
      <div>
        <h1 className="text-3xl font-semibold">Modelos</h1>
      </div>
      <TooltipProvider>
        <div className="flex lg:flex-row flex-col justify-between items-center gap-4">
          <Tooltip>
            <TooltipTrigger>
              <div className="lg:max-w-[440px] cursor-pointer">
                <Image src={suv} className="rounded-lg" alt="Volkswagen" />
                <p className="-mt-8 text-lg text-white font-bold text-start ml-2 flex justify-between">
                  SUV <ChevronRight />
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>SUV</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <div className="lg:max-w-[440px] cursor-pointer">
                <Image src={hatch} className="rounded-lg" alt="Chevrolet" />
                <p className="-mt-8 text-lg text-white font-bold text-start ml-2 flex justify-between">
                  Hatch <ChevronRight />
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hatch</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <div className="lg:max-w-[440px] cursor-pointer">
                <Image src={sedan} className="rounded-lg" alt="Fiat" />
                <p className="-mt-8 text-lg text-white font-bold text-start ml-2 flex justify-between">
                  Sedan <ChevronRight />
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sedan</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Models;
