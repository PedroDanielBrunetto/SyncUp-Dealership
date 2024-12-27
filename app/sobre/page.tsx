"use server";

import { db } from "@/lib/prisma";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import MainCard from "../_components/sobre/MainCard";
import SecondCard from "../_components/sobre/SecondCard";

const mainText: string = `
A Concessionária é especializada, principalmente, na venda de veículos casuais. 

Com segurança, transparência e qualidade, nossos veículos são verificados e certificados para 
garantir ao cliente uma compra completamente segura.

Oferecemos exemplares especiais e em estados de conservação melhor impossível, além de um amplo estoque renovado diariamente para oferecer a melhor experiência e um alto padrão de qualidade.

Contamos com Detail Center, frota própria para entrega em toda região sudeste, além de um show room bem receptivo dedicado aos carros que você vai se encantar.
`;

const missionTitle: string = `
Missão
`;

const missionText: string = `
Ser a melhor escolha em automóveis na baixada e fazer parte dos momentos especiais da vida das pessoas.
`;

const eyeTitle: string = `
Visão
`;

const eyeText: string = `
Ser referência em toda baixada santista como a empresa mais surpreendente na conexão entre pessoas, veículos e bens.
`;

export default async function Sobre() {
  const data = await db.sobre.findUnique({
    where: {
      id: 1,
    },
  });
  return (
    <main>
      <header className="w-full fixed z-50">
        <Header />
      </header>
      <section className="flex flex-col lg:flex-row p-4 lg:p-main pt-36 lg:pt-48 justify-center gap-8">
        <MainCard car={false} text={data?.sobreNos || mainText} />
        <MainCard car={true} text={""} />
      </section>
      <section className="flex flex-col lg:flex-row p-4 lg:p-main justify-center gap-8">
        <SecondCard
          title={missionTitle}
          description={data?.missao || missionText}
        />
        <SecondCard title={eyeTitle} description={data?.visao || eyeText} />
      </section>
      <section className="flex p-4 lg:p-main">
        <iframe
          className="rounded-lg w-full h-96"
          src={
            data?.localizacao ||
            `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47402149.96562581!2d-51.316680000000005!3d-14.40952615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9c59c7ebcc28cf%3A0x295a1506f2293e63!2sBrasil!5e1!3m2!1spt-BR!2sbr!4v1735255036133!5m2!1spt-BR!2sbr`
          }
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
      <footer>
        <Footer />
      </footer>
    </main>
  );
}
