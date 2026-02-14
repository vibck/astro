import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* Floating organic shapes */}
      <div className="pointer-events-none absolute inset-0">
        {/* Large warm morph blob */}
        <div className="absolute top-[15%] right-[-5%] h-[350px] w-[350px] md:h-[500px] md:w-[500px] bg-gradient-to-br from-gold-light/15 to-warm-light/20 animate-morph animate-drift" />

        {/* Rose accent blob */}
        <div className="absolute bottom-[10%] left-[-8%] h-[300px] w-[300px] md:h-[400px] md:w-[400px] bg-gradient-to-tr from-rose-light/15 to-cream-dark/20 animate-morph animate-drift-reverse" style={{ animationDelay: "3s" }} />

        {/* Small floating circles */}
        <div className="absolute top-[25%] left-[15%] h-3 w-3 rounded-full bg-gold/30 animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute top-[35%] right-[20%] h-2 w-2 rounded-full bg-rose/40 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-[30%] left-[25%] h-4 w-4 rounded-full bg-warm/20 animate-float-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[60%] right-[10%] h-2.5 w-2.5 rounded-full bg-gold/25 animate-float" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-[20%] right-[35%] h-1.5 w-1.5 rounded-full bg-rose/30 animate-twinkle" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-[40%] right-[30%] h-2 w-2 rounded-full bg-gold-light/30 animate-twinkle animation-delay-2000" />

        {/* Rotating ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] md:h-[500px] md:w-[500px] animate-spin-slow">
          <div className="absolute inset-0 rounded-full border border-gold/[0.07]" />
          <div className="absolute inset-6 rounded-full border border-dashed border-warm/[0.08]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-gold/40" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-rose/30" />
        </div>

        {/* Warm center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-gold/[0.04] blur-[100px] animate-breathe" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Cosmic icon */}
        <div className="mx-auto mb-8 animate-float-slow">
          <div className="relative h-20 w-20 md:h-24 md:w-24 mx-auto">
            <svg viewBox="0 0 96 96" className="h-full w-full" fill="none">
              <circle cx="48" cy="48" r="8" fill="#C4868B" opacity="0.8" />
              <circle cx="48" cy="48" r="8" fill="none" stroke="#C4868B" strokeWidth="0.5" opacity="0.3">
                <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="48" cy="48" r="22" stroke="#D4A0A4" strokeWidth="0.5" opacity="0.3" />
              <circle cx="48" cy="48" r="36" stroke="#E8BFC2" strokeWidth="0.3" opacity="0.2" />
              <circle cx="66" cy="34" r="3" fill="#B87D82" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.3;0.6" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="30" cy="58" r="2.5" fill="#D4A0A4" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.2;0.5" dur="5s" repeatCount="indefinite" />
              </circle>
              <circle cx="58" cy="68" r="2" fill="#C4949A" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-warm rounded-full px-4 py-1.5 mb-8 animate-fade-up">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-xs uppercase tracking-[0.2em] text-earth">
            Professionelle Astrologie
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] max-w-4xl animate-fade-up">
          <span className="text-foreground">Entdecke die Sterne</span>
          <br />
          <span className="text-gradient-warm">in deinem Chart.</span>
        </h1>

        {/* Subline */}
        <p className="mt-6 md:mt-8 text-lg md:text-xl text-earth max-w-xl mx-auto leading-relaxed animate-fade-up animation-delay-200">
          Erhalte ein individuell erstelltes Astrologie-Reading — professionell
          gedeutet und als hochwertiges PDF für dich aufbereitet.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animation-delay-400">
          <Button
            asChild
            size="lg"
            className="bg-gold text-white hover:bg-gold-light text-base px-8 rounded-full glow-gold-warm"
          >
            <Link href="/login">Reading bestellen</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-sand text-earth hover:bg-cream-dark text-base px-8 rounded-full"
          >
            <Link href="#angebot">Mehr erfahren</Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 z-10 animate-bounce">
        <div className="h-9 w-5 rounded-full border-2 border-sand flex items-start justify-center p-1.5">
          <div className="h-2 w-1 rounded-full bg-gold animate-pulse" />
        </div>
      </div>

      {/* Bottom divider wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full text-cream-dark/50">
          <path d="M0,40 C360,10 720,60 1080,30 C1260,18 1380,40 1440,35 L1440,60 L0,60 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
