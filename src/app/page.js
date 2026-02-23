import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Offerings } from "@/components/landing/offerings";
import { Services } from "@/components/landing/services";
import { Testimonials } from "@/components/landing/testimonials";
import { Footer } from "@/components/landing/footer";
import { JsonLd } from "@/components/json-ld";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { products } from "@/lib/products";

export default function Home() {
  const productSchemas = Object.values(products).map(productJsonLd);
  const breadcrumb = breadcrumbJsonLd([{ name: "Startseite", url: "/" }]);

  return (
    <>
      <JsonLd data={[...productSchemas, breadcrumb]} />
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
