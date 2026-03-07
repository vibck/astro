import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata = {
  title: "Über mich",
  description: "Lerne Patricia Beck kennen, die Seele hinter Seelensprache. Astrologische Beraterin aus Loxstedt mit Leidenschaft für persönliche Horoskope.",
  alternates: {
    canonical: "/ueber-mich",
  },
};

export default function UeberMichPage() {
  return (
    <div className="min-h-screen px-6 py-12 relative">
      <JsonLd data={breadcrumbJsonLd([{ name: "Startseite", url: "/" }, { name: "Über mich" }])} />
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
            Über mich
          </h1>

          {/* Foto-Bereich */}
          <div className="flex flex-col sm:flex-row gap-8 mb-8">
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <img
                src="/patricia.jpeg"
                alt="Patricia Beck"
                className="w-48 h-48 rounded-full object-cover object-top border-2 border-rose-light/20 shadow-[0_4px_30px_rgba(196,134,139,0.15)]"
              />
            </div>

            <div className="text-earth text-sm leading-relaxed">
              <h2 className="font-serif text-xl text-gold mb-3">
                Patricia Beck
              </h2>
              <p className="mb-3">
                Schön, dass du hier bist. Ich bin Patricia – die Seele hinter Seelensprache.
              </p>
              <p>
                Schon seit vielen Jahren begleitet mich Astrologie. Mal leise im Hintergrund, mal ganz präsent.
                Ein Reading, das ich selbst bekommen habe, war für mich ein echter Wendepunkt. Nicht weil es
                „magisch" war, sondern weil ich mich klar gesehen und verstanden gefühlt habe. Da wurde mir
                bewusst: Genau das möchte ich weitergeben.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-earth text-sm leading-relaxed">
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">Mein Weg zur Astrologie</h2>
              <p className="mb-3">
                Ich war schon immer jemand, der genauer hinschaut und Fragen stellt. Ich wollte verstehen,
                warum Menschen fühlen, handeln und reagieren, wie sie es tun. Astrologie hat mir dafür
                Sprache gegeben. Nicht als Schublade, sondern als Orientierung.
              </p>
              <p>
                Seit einigen Jahren fühlt sich Astrologie für mich nicht mehr nur nach Interesse an, sondern
                nach Berufung. Und ja, das passt auch zu meinem Chart.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-gold mb-2">Meine Arbeit</h2>
              <p className="mb-3">
                Jedes Reading erstelle ich individuell und schreibe es komplett neu für dich. Ich übersetze
                dein Geburtshoroskop in Alltagssprache, damit du dich wirklich wiedererkennst.
              </p>
              <p>
                Du bekommst Klarheit über deine Stärken, deine Muster, deine Trigger und deine Bedürfnisse.
                Mir ist wichtig, dass du nicht nur „schöne Worte" liest, sondern etwas mitnimmst, das dich
                im echten Leben weiterbringt.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-gold mb-2">Was mich antreibt</h2>
              <p className="mb-3">
                Ich glaube, dass in jedem Menschen etwas sehr Eigenes steckt. Manchmal ist es nur überdeckt
                von Stress, Erwartungen oder alten Geschichten.
              </p>
              <p>
                Mein Ziel ist, dass du dich durch dein Reading besser verstehst und dich in deinem Leben
                klarer ausrichten kannst. Mit Respekt, mit Herz und mit ehrlichen Worten.
              </p>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-10 pt-8 border-t border-rose-light/15 text-center">
            <p className="text-earth text-sm mb-4">
              Neugierig geworden? Entdecke dein persönliches Reading.
            </p>
            <Link
              href="/#angebot"
              className="inline-block bg-gold text-white hover:bg-gold-light rounded-full px-8 py-3 text-sm font-medium transition-colors glow-gold-warm"
            >
              Zu den Angeboten
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
