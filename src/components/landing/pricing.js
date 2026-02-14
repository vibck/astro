import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
  "Vollständige Geburtshoroskop-Analyse",
  "Sonne, Mond & Aszendent Deutung",
  "Planetenaspekte & Häuser",
  "Persönliche Stärken & Herausforderungen",
  "Hochwertiges PDF-Dokument",
  "Persönlicher Download in deinem Dashboard",
];

export function Pricing() {
  return (
    <section id="preis" className="py-28 px-6 relative bg-cream-dark/30">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute top-[20%] right-[-5%] h-[300px] w-[300px] bg-gold/[0.03] rounded-full blur-[80px] animate-breathe" />
      <div className="pointer-events-none absolute bottom-[10%] left-[-5%] h-[250px] w-[250px] bg-rose/[0.04] rounded-full blur-[80px] animate-breathe animation-delay-2000" />

      <div className="mx-auto max-w-2xl relative">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4">
            Preis
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gradient-warm">
            Dein persönliches Reading
          </h2>
        </div>

        <div className="relative glass-warm-strong rounded-3xl overflow-hidden glow-warm">
          {/* Top gold line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

          <div className="p-8 md:p-12 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-gold mb-6">
              Geburtshoroskop Reading
            </p>

            <div className="mb-2">
              <span className="font-serif text-6xl md:text-7xl font-bold text-gradient-warm">
                49€
              </span>
            </div>
            <p className="text-earth mb-10">Einmalige Zahlung</p>

            <ul className="space-y-4 mb-10 text-left max-w-sm mx-auto">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10">
                    <svg
                      className="h-3.5 w-3.5 text-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              size="lg"
              className="w-full max-w-sm bg-gold text-white hover:bg-gold-light text-base rounded-full glow-gold-warm"
            >
              <Link href="/login">Jetzt bestellen</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
