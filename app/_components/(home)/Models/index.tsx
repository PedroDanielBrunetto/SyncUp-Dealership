"use client";

import Image from "next/image";
import combustion from "@/public/home/models/Combustion.png";
import eletric from "@/public/home/models/Eletric.png";
import hybrid from "@/public/home/models/Hybrid.png";

const Models = () => {
  return (
    <div className="p-main flex flex-col gap-6 p-4 ">
      <div>
        <h1 className="font-semibold text-3xl text-center lg:text-start">Modelos</h1>
      </div>
      <nav className="flex lg:flex-row flex-col justify-between items-center gap-4">
        <div>
          <a href="">
            <Image src={combustion} alt="Combustível" />
          </a>
        </div>
        <div>
          <a href="">
            <Image src={eletric} alt="Elétrico" />
          </a>
        </div>
        <div>
          <a href="">
            <Image src={hybrid} alt="Híbrido" />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Models;
