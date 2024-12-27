"use server";

import Image from "next/image";
import sw4 from "@/public/home/highlight/sw4.jpeg";
import { db } from "@/lib/prisma";

const AdminPreviewHighlight = async () => {
  const data = await db.destaqueSemanal.findUnique({
    where: {
      id: 1,
    },
  });

  return (
    <main className="flex flex-col gap-4 p-4">
      <div className="text-xl font-semibold">
        <h1>Atual:</h1>
      </div>
      <div className="flex lg:flex-row flex-col justify-between items-center gap-4">
        <div className="lg:h-[460px] h-64 w-full lg:w-auto">
          <Image
            src={data?.imageUrl || sw4}
            alt="Destaque"
            width={1920}
            height={1080}
            className="object-cover h-full w-full rounded-lg lg:h-[460px]"
          />
        </div>

        <div
          className="bg-cover bg-center text-white p-8 rounded-lg lg:w-2/5 lg:h-[460px]"
          style={{
            backgroundImage: `url(/home/highlight/textHighlight.png)`,
          }}
        >
          <h2 className="xl:text-3xl lg:text-xl text-lg font-bold mb-4 text-center">
            {data?.titulo || "Toyota SW4"}

            {/* Máximo de 25 Caracteres */}
          </h2>
          <p className="xl:text-lg lg:text-base text-sm text-justify">
            {data?.descricao ||
              `Destaque nos aspectos em que os outros se perdem na multidão. Jovem,
            dinâmico e urbano, com equipamentos de série completos,
            características de design exclusivas do modelo e, é claro, o
            tradicional desempenho Toyota.`}
            {/* Máximo de 240 Caracteres */}
          </p>
        </div>
      </div>
    </main>
  );
};

export default AdminPreviewHighlight;
