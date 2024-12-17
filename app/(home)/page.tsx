import Brands from "../_components/(home)/Brands";
import Header from "../_components/Header";
import HighlightWeek from "../_components/(home)/HighlightWeek";
import Models from "../_components/(home)/Models";
import SpecificModel from "../_components/actions/SpecificModelForm";
import Start from "../_components/(home)/Start";
import Footer from "../_components/Footer";

export default function Home() {
  return (
    <main>
      <header className="w-full fixed">
        <Header />
      </header>
      <section id="home" className="pt-36 lg:pt-20">
        <Start />
      </section>
      <section id="models">
        <Models />
      </section>
      <section id="specific">
        <SpecificModel />
      </section>
      <section id="highlight">
        <HighlightWeek />
      </section>
      <section id="brands">
        <Brands />
      </section>
      <footer className="w-full">
        <Footer />
      </footer>
    </main>
  );
}
