import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Offerings } from "@/components/landing/offerings";
import { Services } from "@/components/landing/services";
import { Testimonials } from "@/components/landing/testimonials";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Offerings />
      <Features />
      <Services />
      <Testimonials />
      <Footer />
    </>
  );
}
