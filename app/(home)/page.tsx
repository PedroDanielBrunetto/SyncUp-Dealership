import Header from "../_components/(home)/Header";
import HighlightWeek from "../_components/(home)/HighlightWeek";
import Models from "../_components/(home)/Models";
import SpecificModel from "../_components/(home)/SpecificModelForm";
import Start from "../_components/(home)/Start";

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
    </main>
  );
}
