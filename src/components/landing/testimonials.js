const testimonials = [
  {
    text: "Mein Reading hat mir so viele Aha-Momente geschenkt. Es fühlt sich an, als würde jemand meine Seele verstehen.",
    name: "Laura M.",
    type: "Seelenspiegel",
  },
  {
    text: "Die Seelenkarte für meine Tochter ist das schönste Geschenk, das ich je bekommen habe. So liebevoll und treffend!",
    name: "Sarah K.",
    type: "Seelenkarte",
  },
  {
    text: "Das Partnerschafts-Reading hat uns geholfen, unsere Dynamik besser zu verstehen. Absolut empfehlenswert!",
    name: "Nina & Tom",
    type: "Seelenkompass",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-28 px-6 relative">
      <div className="mx-auto max-w-5xl relative">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4">
            Stimmen
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gradient-warm">
            Was andere sagen
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="glass-warm-strong rounded-2xl p-6 relative group hover:glow-warm transition-all duration-500"
            >
              {/* Quote mark */}
              <span className="absolute top-4 right-5 font-serif text-5xl text-gold/15 leading-none">
                &ldquo;
              </span>

              <p className="text-sm text-foreground/80 leading-relaxed mb-6 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gold/20 to-rose/20 flex items-center justify-center">
                  <span className="text-xs font-semibold text-gold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-earth">{testimonial.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative */}
      <div className="pointer-events-none absolute top-16 left-[5%] h-2 w-2 rounded-full bg-warm/15 animate-float-slow animation-delay-600" />
      <div className="pointer-events-none absolute bottom-16 right-[8%] h-3 w-3 rounded-full bg-gold/10 animate-drift animation-delay-2000" />
    </section>
  );
}
