import Link from "next/link";

export function AboutPatricia() {
  return (
    <section className="py-16 md:py-28 px-6 relative">
      <div className="mx-auto max-w-4xl relative">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4">
            Die Seele hinter Seelensprache
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gradient-warm">
            Persönlich erstellt von Patricia
          </h2>
        </div>

        <div className="glass-warm-strong rounded-3xl p-8 md:p-12">
          <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-12">
            {/* Foto */}
            <div className="flex-shrink-0">
              <img
                src="/patricia.jpeg"
                alt="Patricia Beck"
                className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover object-top border-2 border-rose-light/20 shadow-[0_4px_30px_rgba(196,134,139,0.15)]"
              />
            </div>

            {/* Text */}
            <div className="text-center sm:text-left">
              <p className="text-earth leading-relaxed mb-4">
                &bdquo;Schön, dass du hier bist. Jedes Reading erstelle ich
                individuell und schreibe es komplett neu für dich. Kein
                Algorithmus, keine Vorlagen. Ich übersetze dein Geburtshoroskop
                in Alltagssprache, damit du dich wirklich wiedererkennst. Mit
                Respekt, mit Herz und mit ehrlichen Worten.&ldquo;
              </p>

              <p
                className="text-3xl text-gradient-warm mb-4"
                style={{ fontFamily: "var(--font-dancing-script)" }}
              >
                Patricia
              </p>

              <Link
                href="/ueber-mich"
                className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light transition-colors"
              >
                Mehr über mich &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating dots */}
      <div className="pointer-events-none absolute top-24 right-[8%] h-2 w-2 rounded-full bg-warm/20 animate-float-slow animation-delay-1000" />
      <div className="pointer-events-none absolute bottom-20 left-[10%] h-3 w-3 rounded-full bg-gold/10 animate-drift animation-delay-1500" />
    </section>
  );
}
