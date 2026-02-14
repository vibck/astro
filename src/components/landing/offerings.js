import Link from "next/link";
import { Button } from "@/components/ui/button";

const offerings = [
  {
    title: "Geburtshoroskop",
    subtitle: "Dein kosmischer Fingerabdruck",
    description:
      "Eine vollständige Analyse deines Geburtshoroskops — Sonne, Mond, Aszendent, Planetenaspekte und Häuser. Erfahre, welche Energien dich prägen und wie du dein volles Potenzial entfalten kannst.",
    price: "49",
    features: [
      "Vollständige Geburtshoroskop-Analyse",
      "Sonne, Mond & Aszendent Deutung",
      "Planetenaspekte & Häuser",
      "Persönliche Stärken & Herausforderungen",
      "Hochwertiges PDF-Dokument",
    ],
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="6" fill="currentColor" opacity="0.7" />
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <circle cx="34" cy="14" r="2" fill="currentColor" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.2;0.5" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="12" cy="30" r="1.5" fill="currentColor" opacity="0.4">
          <animate attributeName="opacity" values="0.4;0.15;0.4" dur="5s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
  },
  {
    title: "Seelenkarte für Kinder",
    subtitle: "Die Sterne deines Kindes",
    description:
      "Eine liebevolle astrologische Deutung für dein Kind. Verstehe seine Talente, Bedürfnisse und Persönlichkeit — ein wundervolles Geschenk für Eltern, die ihr Kind noch tiefer verstehen möchten.",
    price: "39",
    features: [
      "Kindgerechte Horoskop-Deutung",
      "Talente & Begabungen",
      "Emotionale Bedürfnisse",
      "Lernstil & Kommunikation",
      "Liebevoll gestaltetes PDF",
    ],
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none">
        <path
          d="M24,8 L26.5,16 L35,16 L28,21 L30.5,29 L24,24 L17.5,29 L20,21 L13,16 L21.5,16 Z"
          fill="currentColor"
          opacity="0.6"
        />
        <path
          d="M24,34 C28,34 32,36 34,39 L14,39 C16,36 20,34 24,34Z"
          fill="currentColor"
          opacity="0.3"
        />
        <circle cx="36" cy="10" r="1.5" fill="currentColor" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="10" cy="12" r="1" fill="currentColor" opacity="0.25">
          <animate attributeName="opacity" values="0.25;0.55;0.25" dur="4s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
  },
  {
    title: "Partnerschafts-Reading",
    subtitle: "Die Verbindung zweier Seelen",
    description:
      "Entdecke die kosmische Dynamik zwischen dir und deinem Partner. Erfahre, wie eure Energien zusammenwirken, wo Harmonie und wo Wachstumspotenzial liegt.",
    price: "59",
    features: [
      "Synastrie-Analyse beider Charts",
      "Beziehungsdynamik & Stärken",
      "Kommunikationsmuster",
      "Wachstumspotenziale als Paar",
      "Gemeinsames PDF-Dokument",
    ],
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none">
        <circle cx="18" cy="24" r="10" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <circle cx="30" cy="24" r="10" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <path
          d="M24,17.5 A10,10 0 0,1 24,30.5 A10,10 0 0,1 24,17.5"
          fill="currentColor"
          opacity="0.15"
        />
        <circle cx="18" cy="24" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="30" cy="24" r="2" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
];

export function Offerings() {
  return (
    <section id="angebot" className="py-28 px-6 relative bg-cream-dark/30">
      <div className="mx-auto max-w-6xl relative">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4">
            Unsere Angebote
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gradient-warm">
            Finde dein Reading
          </h2>
          <p className="mt-4 text-earth max-w-xl mx-auto">
            Wähle das Reading, das zu dir passt — jedes wird individuell und mit
            Hingabe erstellt.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 items-stretch">
          {offerings.map((offering) => (
            <div
              key={offering.title}
              className="relative glass-warm-strong rounded-3xl overflow-hidden transition-all duration-500 hover:glow-warm group flex flex-col shadow-[0_8px_50px_rgba(196,134,139,0.25),0_2px_20px_rgba(196,134,139,0.15)]"
            >
              <div className="p-8 flex flex-col flex-1">
                {/* Icon */}
                <div className="mb-5 text-gold">
                  {offering.icon}
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl font-bold text-foreground mb-1">
                  {offering.title}
                </h3>
                <p className="text-sm text-gold mb-4">{offering.subtitle}</p>

                {/* Description */}
                <p className="text-sm text-earth leading-relaxed mb-6 flex-1">
                  {offering.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="font-serif text-4xl font-bold text-gradient-warm">
                    {offering.price}€
                  </span>
                  <span className="text-earth text-sm ml-2">einmalig</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {offering.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10">
                        <svg
                          className="h-3 w-3 text-gold"
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

                {/* CTA — same style for all */}
                <div className="mt-auto">
                  <Button
                    asChild
                    className="w-full rounded-full border border-gold/30 bg-transparent text-gold hover:bg-gold hover:text-white transition-all duration-300"
                  >
                    <Link href="/login">Jetzt bestellen</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating dots */}
      <div className="pointer-events-none absolute top-20 right-[10%] h-3 w-3 rounded-full bg-gold/10 animate-float-slow" />
      <div className="pointer-events-none absolute bottom-20 left-[8%] h-2 w-2 rounded-full bg-rose/15 animate-float animation-delay-1000" />
    </section>
  );
}
