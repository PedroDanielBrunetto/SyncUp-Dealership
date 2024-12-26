"use server";

import FormAnunciar from "../_components/anunciar/FormAnunciar";
import Footer from "../_components/Footer";
import Header from "../_components/Header";

const Anunciar = async () => {
  return (
    <main>
      <header className="fixed w-full z-50">
        <Header />
      </header>
      <section>
        <FormAnunciar />
      </section>
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default Anunciar;
