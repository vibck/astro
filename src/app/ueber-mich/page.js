import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata = {
  title: "Über mich",
  description: "Lerne Patricia Beck kennen, die Seele hinter Seelensprache. Astrologische Beraterin aus Loxstedt mit Leidenschaft für persönliche Horoskope.",
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
                {/* PLATZHALTER – Hier kann Patricia ihren persönlichen Text einsetzen */}
                Schön, dass du hier bist! Ich bin Patricia – astrologische Beraterin und die Seele hinter Seelensprache.
              </p>
              <p>
                Schon seit meiner Kindheit faszinieren mich die Sterne und ihre Geschichten.
                Was als Neugier begann, wurde zu einer tiefen Leidenschaft, die mich bis heute begleitet.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-earth text-sm leading-relaxed">
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">Mein Weg zur Astrologie</h2>
              <p>
                {/* PLATZHALTER – Patricias Geschichte / Ausbildung / Werdegang */}
                Die Astrologie hat mir geholfen, mich selbst besser zu verstehen – und genau das möchte ich
                auch dir ermöglichen. Jedes Geburtshoroskop erzählt eine einzigartige Geschichte, und es ist
                mir eine Herzensangelegenheit, diese Geschichte für dich sichtbar zu machen.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-gold mb-2">Meine Arbeit</h2>
              <p>
                {/* PLATZHALTER – Wie Patricia arbeitet, was sie besonders macht */}
                Jedes Reading erstelle ich mit größter Sorgfalt und persönlicher Hingabe. Ich nehme mir
                die Zeit, dein Geburtshoroskop in all seinen Facetten zu analysieren und dir eine
                einfühlsame, verständliche Deutung zu schenken – kein Computertext, sondern echte,
                persönliche Worte von Herz zu Herz.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-gold mb-2">Was mich antreibt</h2>
              <p>
                {/* PLATZHALTER – Motivation, Werte, persönliche Note */}
                Ich glaube daran, dass jeder Mensch ein einzigartiges kosmisches Geschenk in sich trägt.
                Mein Ziel ist es, dir zu helfen, dieses Geschenk zu erkennen und dein volles Potenzial
                zu entfalten.
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
