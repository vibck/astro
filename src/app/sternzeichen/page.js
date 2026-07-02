import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { zodiacSigns } from "@/lib/sternzeichen";

export const metadata = {
  title: "Die 12 Sternzeichen im Überblick",
  description:
    "Alle 12 Sternzeichen mit Eigenschaften, Stärken, Schwächen und Liebe: Widder, Stier, Zwillinge, Krebs, Löwe, Jungfrau, Waage, Skorpion, Schütze, Steinbock, Wassermann und Fische.",
  alternates: {
    canonical: "/sternzeichen",
  },
};

export default function SternzeichenPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Startseite", url: "/" },
          { name: "Sternzeichen" },
        ])}
      />
      <Navbar />

      <main className="flex-1 px-6 pt-32 sm:pt-36 lg:pt-40 pb-16">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-gold mb-3">
              Sternzeichen
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gold mb-4">
              Die 12 Sternzeichen im Überblick
            </h1>
            <p className="text-earth/70 max-w-2xl mx-auto">
              Jedes Sternzeichen trägt eine eigene Energie. Entdecke
              Eigenschaften, Stärken, Schattenseiten und wie jedes Zeichen
              liebt.
            </p>
          </div>

          {/* Sternzeichen-Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {zodiacSigns.map((sign) => (
              <Link key={sign.slug} href={`/sternzeichen/${sign.slug}`} className="group">
                <article className="glass-warm-strong rounded-3xl p-6 md:p-8 h-full flex flex-col transition-all duration-300 group-hover:shadow-[0_8px_30px_rgba(196,134,139,0.15)] group-hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl text-gold">{sign.symbol}</span>
                    <span className="text-xs font-medium text-gold tracking-wide uppercase">
                      {sign.element}
                    </span>
                  </div>
                  <h2 className="font-serif text-xl text-earth group-hover:text-gold transition-colors mb-1">
                    {sign.name}
                  </h2>
                  <p className="text-xs text-earth/50 mb-3">{sign.dateRange}</p>
                  <p className="text-sm text-earth/70 leading-relaxed">
                    {sign.strength} · liebt {sign.love.toLowerCase()}
                  </p>
                </article>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center glass-warm rounded-3xl p-8 md:p-12">
            <h2 className="font-serif text-2xl md:text-3xl text-gold mb-4">
              Dein Sternzeichen ist nur der Anfang
            </h2>
            <p className="text-earth/70 mb-6 max-w-xl mx-auto">
              Aszendent, Mondzeichen und alle Planeten: Dein persönliches
              Geburtshoroskop zeigt das ganze Bild deiner Seele, individuell
              erstellt und als hochwertiges PDF geliefert.
            </p>
            <Link
              href="/#angebot"
              className="inline-flex items-center gap-2 bg-gold text-white hover:bg-gold-light rounded-full px-8 py-3 text-sm font-medium transition-colors glow-gold-warm"
            >
              Zu den Angeboten
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
