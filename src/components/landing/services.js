const steps = [
  {
    number: "01",
    title: "Reading bestellen",
    description:
      "Wähle dein Reading und schließe die Bestellung sicher über Stripe ab.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8l-1.5 7h13.2M8 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Geburtsdaten angeben",
    description:
      "Gib dein Geburtsdatum, deine Geburtszeit und deinen Geburtsort an.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Reading erhalten",
    description:
      "Dein persönliches Reading wird erstellt und als PDF in deinem Dashboard bereitgestellt.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section id="ablauf" className="py-28 px-6 relative">
      <div className="mx-auto max-w-5xl relative">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4">
            So funktioniert es
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gradient-warm">
            In drei Schritten zu deinem Reading
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.number} className="group text-center relative">
              {/* Connector line (between cards) */}
              {i < 2 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-sand to-transparent" />
              )}

              {/* Icon circle */}
              <div className="mx-auto mb-5 relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-full glass-warm-strong text-gold group-hover:glow-warm transition-all duration-500">
                  {step.icon}
                </div>
                <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-white text-xs font-bold">
                  {step.number}
                </span>
              </div>

              <h3 className="font-serif text-xl font-semibold mb-2 text-foreground">
                {step.title}
              </h3>
              <p className="text-earth leading-relaxed text-sm max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating dots */}
      <div className="pointer-events-none absolute top-32 left-[5%] h-2 w-2 rounded-full bg-warm/20 animate-float-slow animation-delay-600" />
      <div className="pointer-events-none absolute bottom-16 right-[12%] h-3 w-3 rounded-full bg-gold/10 animate-drift animation-delay-2000" />
    </section>
  );
}
