import { Nav } from "@/components/Nav";
import { About } from "@/components/About";
import { Work } from "@/components/Work";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <About />
      <Work />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
