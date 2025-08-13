import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
    </>
  );
}
