const features = [
  {
    title: "Individuelle Deutung",
    description: "Kein Algorithmus — eine erfahrene Astrologin erstellt dein Reading persönlich.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: "Hochwertiges PDF",
    description: "Dein Reading als professionell gestaltetes Dokument — zum Immer-wieder-Lesen.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Sichere Zahlung",
    description: "Bezahle sicher und unkompliziert mit Stripe — alle gängigen Zahlungsmethoden.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: "Dein Dashboard",
    description: "Verwalte deine Readings und lade dein PDF jederzeit herunter.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm10 0a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section id="angebot" className="py-28 px-6 relative bg-cream-dark/30">
      <div className="mx-auto max-w-5xl relative">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4">
            Was dich erwartet
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gradient-warm">
            Dein Astrologie-Erlebnis
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex gap-4 glass-warm-strong rounded-2xl p-6 hover:glow-warm transition-all duration-500"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/10 to-warm/10 text-gold group-hover:from-gold/20 group-hover:to-rose/10 transition-all duration-500">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold mb-1 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-earth leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating decorative dots */}
      <div className="pointer-events-none absolute top-20 right-[10%] h-3 w-3 rounded-full bg-gold/15 animate-float-slow" />
      <div className="pointer-events-none absolute bottom-20 left-[8%] h-2 w-2 rounded-full bg-rose/20 animate-float animation-delay-1000" />
    </section>
  );
}
