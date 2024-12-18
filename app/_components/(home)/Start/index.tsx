"use client";

import Image from "next/image";
import carImage from "@/public/carros/porsche/carroCapa.png";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

const Start = () => {
  return (
    <div>
      <div className="flex justify-between lg:flex-row flex-col items-center">
        <div className="2xl:pl-40 xl:pl-32 lg:pl-24">
          <h1 className="2xl:text-8xl xl:text-7xl lg:text-6xl text-[44px] leading-none font-bold text-main">
            Qualidade,
            <br />
            Segurança,
            <br />
            Transparência.
          </h1>
          <div className="lg:pt-6 pt-3">
            <Button size="xl">
              Acessar estoque completo <ArrowRight />
            </Button>
          </div>
        </div>
        <div className="2xl:w-[900px] lg:w-[720px]">
          <Image src={carImage} alt="Carro" />
        </div>
      </div>
      <div className="flex w-full justify-center">
        <a href="/#models">
          <ChevronDown size={48} />
        </a>
      </div>
    </div>
  );
};

export default Start;
