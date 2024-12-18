"use client";

import Image from "next/image";
import porsche from "@/public/sobre/porsche.png";

interface IProps {
  car: boolean;
  text: string;
}

const MainCard = ({ car, text }: IProps) => {
  return (
    <section className="bg-[#F4F4F4] rounded-lg w-full lg:w-2/3 h-auto flex items-center justify-center">
      {car ? (
        <div className="relative w-full h-80 lg:h-96 xl:h-[420px] 2xl:h-[472px] flex items-start justify-start overflow-hidden lg:pb-0 pb-16">
          <Image
            src={porsche}
            alt="Porsche"
            className="object-cover scale-125"
            style={{ height: "100%", width: "auto" }}
          />
        </div>
      ) : (
        <div className="text-start w-full p-6">
          <h1 className="text-2xl font-semibold mb-2">Sobre nós</h1>
          <p className="text-base font-medium whitespace-pre-line">{text}</p>
        </div>
      )}
    </section>
  );
};

export default MainCard;
