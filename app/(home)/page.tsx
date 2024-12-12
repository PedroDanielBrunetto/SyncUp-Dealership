import Header from "../_components/(home)/Header";
import Models from "../_components/(home)/Models";
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
    </main>
  );
}
