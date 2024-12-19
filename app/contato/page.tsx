"use client";

import SpecificModel from "../_components/actions/SpecificModelForm";
import CardContact from "../_components/contato/CardContact";
import Footer from "../_components/Footer";
import Header from "../_components/Header";

const Contato = () => {
  return (
    <main>
      <header className="w-full fixed z-50">
        <Header />
      </header>
      <section className="pt-36 lg:pt-52">
        <CardContact />
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
