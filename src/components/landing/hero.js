"use client";

import { Button } from "@/components/ui/button";

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* Hands background image — seamless blend */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="relative w-full max-w-3xl h-[90vh] bg-contain bg-center bg-no-repeat opacity-[0.15] animate-breathe"
          style={{
            backgroundImage: "url('/hands-bg.jpg')",
            maskImage: "radial-gradient(ellipse 50% 45% at 50% 50%, black 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 50% 45% at 50% 50%, black 20%, transparent 100%)",
          }}
        />
      </div>

      {/* Animated overlay elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Morph blobs */}
        <div className="absolute top-[10%] right-[-5%] h-[300px] w-[300px] md:h-[450px] md:w-[450px] bg-gradient-to-br from-gold-light/10 to-warm-light/15 animate-morph animate-drift" />
        <div className="absolute bottom-[10%] left-[-8%] h-[250px] w-[250px] md:h-[350px] md:w-[350px] bg-gradient-to-tr from-rose-light/10 to-cream-dark/15 animate-morph animate-drift-reverse" style={{ animationDelay: "3s" }} />

        {/* Floating sparkle dots */}
        <div className="absolute top-[25%] left-[20%] h-2 w-2 rounded-full bg-gold/30 animate-float" />
        <div className="absolute top-[30%] right-[22%] h-1.5 w-1.5 rounded-full bg-rose/35 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-[35%] left-[30%] h-3 w-3 rounded-full bg-warm/20 animate-float-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[55%] right-[15%] h-2 w-2 rounded-full bg-gold/25 animate-float" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-[20%] right-[38%] h-1 w-1 rounded-full bg-rose/25 animate-twinkle" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-[40%] left-[40%] h-1.5 w-1.5 rounded-full bg-gold-light/30 animate-twinkle animation-delay-2000" />
        <div className="absolute bottom-[25%] right-[35%] h-2 w-2 rounded-full bg-blush/25 animate-twinkle animation-delay-3000" />
        <div className="absolute top-[45%] left-[18%] h-1 w-1 rounded-full bg-gold/20 animate-twinkle animation-delay-1000" />

        {/* Rotating ring around hands */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[280px] w-[280px] md:h-[420px] md:w-[420px] animate-spin-slow opacity-20">
          <div className="absolute inset-0 rounded-full border border-gold/30" />
          <div className="absolute inset-4 rounded-full border border-dashed border-rose/20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-gold/50" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-rose/40" />
        </div>

        {/* Soft center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-gold/[0.04] blur-[120px] animate-breathe" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-warm rounded-full px-5 py-2 mb-8 animate-fade-up">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-xs uppercase tracking-[0.2em] text-earth">
            Deine Seelensprache entschlüsselt
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.08] animate-fade-up drop-shadow-[0_2px_10px_rgba(255,248,245,0.8)]">
          <span className="text-[#4A2E34]">Entdecke deine</span>
          <br />
          <span className="text-gradient-warm">Seelensprache</span>
        </h1>

        {/* Subline */}
        <p className="mt-6 md:mt-8 text-lg md:text-xl text-[#6B4C52] font-medium max-w-xl mx-auto leading-relaxed animate-fade-up animation-delay-200 drop-shadow-[0_1px_6px_rgba(255,248,245,0.7)]">
          Persönliche Astrologie-Readings — liebevoll gedeutet und als
          hochwertiges PDF für dich, dein Kind oder eure Partnerschaft aufbereitet.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animation-delay-400">
          <Button
            size="lg"
            className="bg-gold text-white hover:bg-gold-light text-base px-8 rounded-full glow-gold-warm"
            onClick={() => scrollTo("angebot")}
          >
            Angebote entdecken
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-sand text-earth hover:bg-cream-dark text-base px-8 rounded-full"
            onClick={() => scrollTo("ablauf")}
          >
            Wie es funktioniert
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 z-10 animate-bounce">
        <div className="h-9 w-5 rounded-full border-2 border-sand flex items-start justify-center p-1.5">
          <div className="h-2 w-1 rounded-full bg-gold animate-pulse" />
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full text-cream-dark/50">
          <path d="M0,40 C360,10 720,60 1080,30 C1260,18 1380,40 1440,35 L1440,60 L0,60 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
