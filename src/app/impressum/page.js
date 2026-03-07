import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung von Seelensprache gemäß § 5 DDG.",
  alternates: {
    canonical: "/impressum",
  },
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen px-6 py-12 relative">
      <JsonLd data={breadcrumbJsonLd([{ name: "Startseite", url: "/" }, { name: "Impressum" }])} />
      <div className="mx-auto max-w-3xl relative z-10">
        {/* Navbar */}
        <div className="flex items-center justify-between mb-10">
          <BrandLogo size="md" />
          <Link href="/" className="text-sm text-earth hover:text-gold transition-colors">
            &larr; Zurück zur Startseite
          </Link>
        </div>

        {/* Content Card */}
        <div className="glass-warm-strong rounded-3xl p-8 md:p-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gold mb-8">
            Impressum
          </h1>

          <div className="space-y-6 text-earth text-sm leading-relaxed">
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">Angaben gemäß § 5 DDG</h2>
              <p>
                Patricia Beck<br />
                Sandberg 20<br />
                27612 Loxstedt
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-gold mb-2">Kontakt</h2>
              <p>
                E-Mail: <a href="mailto:kontakt@seelensprache-astro.de" className="text-gold hover:text-gold-light underline transition-colors">kontakt@seelensprache-astro.de</a>
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-gold mb-2">Umsatzsteuer-ID</h2>
              <p>
                Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-gold mb-2">EU-Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
                bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light underline transition-colors"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="mt-2">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-gold mb-2">Haftung für Inhalte</h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen
                Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir
                als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
                rechtswidrige Tätigkeit hinweisen.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-gold mb-2">Haftung für Links</h2>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
                keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
                Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
                Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
