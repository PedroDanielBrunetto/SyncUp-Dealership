"use server";

import { db } from "@/lib/prisma";
import SpecificModel from "../_components/actions/SpecificModelForm";
import CardContact from "../_components/contato/CardContact";
import Footer from "../_components/Footer";
import Header from "../_components/Header";

const Contato = async () => {
  const data = await db.contato.findUnique({
    where: {
      id: 1,
    },
  });

  return (
    <main>
      <header className="w-full fixed z-50">
        <Header />
      </header>
      <section className="pt-36 lg:pt-52">
        <CardContact
          celular={`tel:+55${data?.celular || null}`}
          email={`mailto:${data?.email || null}`}
          instagram={`${data?.instagramUrl || null}`}
          wpp={`${data?.whatsAppUrl || null}`}
        />
      </section>
      <section className="pt-12">
        <SpecificModel />
      </section>
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default Contato;
