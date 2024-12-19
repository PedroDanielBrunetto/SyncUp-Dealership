"use client";

import Image from "next/image";
import chevrolet from "@/public/home/brands/chevrolet.jpg";
import fiat from "@/public/home/brands/Fiat.png";
import volks from "@/public/home/brands/volkswagem.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowRight, ChevronRight } from "lucide-react";

const Brands = () => {
  return (
    <main className="p-main gap-4 flex flex-col p-4 pt-8">
      <div>
        <h1 className="text-3xl font-semibold">Principais marcas</h1>
      </div>
      <TooltipProvider>
        <div className="flex lg:flex-row flex-col justify-between items-center gap-4">
          <Tooltip>
            <TooltipTrigger>
              <div className="lg:max-w-[440px] cursor-pointer">
                <Image src={volks} className="rounded-lg" alt="Volkswagen" />
                <p className="-mt-8 text-lg text-white font-bold text-start ml-2 flex justify-between">
                  Volkswagen <ChevronRight />
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Volkswagen</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <div className="lg:max-w-[440px] cursor-pointer">
                <Image src={fiat} className="rounded-lg" alt="Fiat" />
                <p className="-mt-8 text-lg text-white font-bold text-start ml-2 flex justify-between">
                  Fiat <ChevronRight />
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Fiat</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <div className="lg:max-w-[440px] cursor-pointer">
                <Image src={chevrolet} className="rounded-lg" alt="Chevrolet" />
                <p className="-mt-8 text-lg text-white font-bold text-start ml-2 flex justify-between">
                  Chevrolet <ChevronRight />
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chevrolet</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </main>
  );
};

export default Brands;
