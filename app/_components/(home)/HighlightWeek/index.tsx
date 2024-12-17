"use client";

import Image from "next/image";
import macan from "@/public/home/highlight/macan.png";

const HighlightWeek = () => {
  return (
    <main className="p-main flex flex-col gap-4 p-4">
      <div className="text-3xl font-semibold">
        <h1>Destaque da Semana</h1>
      </div>
      <div className="flex lg:flex-row flex-col justify-between items-center gap-4">
        <div className="lg:h-[460px] h-64 w-full lg:w-auto">
          <Image
            src={macan}
            alt="Destaque"
            className="object-cover h-full w-full rounded-lg"
          />
        </div>

        <div
          className="bg-cover bg-center text-white p-8 rounded-lg lg:w-2/5 lg:h-[460px]"
          style={{
            backgroundImage: `url(/home/highlight/textHighlight.png)`,
          }}
        >
          <h2 className="xl:text-3xl lg:text-xl text-lg font-bold mb-4 text-center">
            Novo Porsche Macan GTS.
            {/* Máximo de 25 Caracteres */}
          </h2>
          <p className="xl:text-lg lg:text-base text-sm text-justify">
            Novo Macan GTS: destaque nos aspectos em que os outros se perdem na
            multidão. Jovem, dinâmico e urbano, com equipamentos de série
            completos, características de design exclusivas do modelo e, é
            claro, o tradicional desempenho Porsche. Com motor potente e direção
            precisa, oferece uma experiência de condução esportiva incomparável.
            {/* Máximo de 280 Caracteres */}
          </p>
        </div>
      </div>
    </main>
  );
};

export default HighlightWeek;
