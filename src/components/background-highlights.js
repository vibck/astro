export function BackgroundHighlights() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Floating constellation dots */}
      <div className="absolute top-[12%] left-[70%] h-1.5 w-1.5 rounded-full bg-gold/20 animate-twinkle" />
      <div className="absolute top-[25%] left-[8%] h-1 w-1 rounded-full bg-rose/25 animate-twinkle animation-delay-1000" />
      <div className="absolute top-[38%] right-[15%] h-2 w-2 rounded-full bg-gold-light/15 animate-twinkle animation-delay-2000" />
      <div className="absolute top-[52%] left-[12%] h-1.5 w-1.5 rounded-full bg-blush/20 animate-twinkle animation-delay-3000" />
      <div className="absolute top-[65%] right-[25%] h-1 w-1 rounded-full bg-rose-light/25 animate-twinkle animation-delay-4000" />
      <div className="absolute top-[78%] left-[35%] h-2 w-2 rounded-full bg-gold/15 animate-twinkle animation-delay-5000" />
      <div className="absolute top-[88%] right-[40%] h-1.5 w-1.5 rounded-full bg-warm/20 animate-twinkle animation-delay-7000" />
      <div className="absolute top-[45%] left-[55%] h-1 w-1 rounded-full bg-rose/20 animate-twinkle animation-delay-600" />
      <div className="absolute top-[58%] left-[75%] h-1.5 w-1.5 rounded-full bg-gold/20 animate-twinkle animation-delay-4000" />
      <div className="absolute top-[33%] left-[42%] h-1 w-1 rounded-full bg-blush/25 animate-twinkle animation-delay-2000" />

      {/* Floating star shapes */}
      <svg className="absolute top-[18%] left-[80%] h-4 w-4 text-gold/15 animate-float animation-delay-1000" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,2 L13.5,9 L20,9 L14.5,13 L16.5,20 L12,15.5 L7.5,20 L9.5,13 L4,9 L10.5,9 Z" />
      </svg>
      <svg className="absolute top-[55%] left-[6%] h-3 w-3 text-rose/15 animate-float-slow animation-delay-3000" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,2 L13.5,9 L20,9 L14.5,13 L16.5,20 L12,15.5 L7.5,20 L9.5,13 L4,9 L10.5,9 Z" />
      </svg>
      <svg className="absolute top-[75%] right-[8%] h-5 w-5 text-gold-light/10 animate-float animation-delay-5000" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,2 L13.5,9 L20,9 L14.5,13 L16.5,20 L12,15.5 L7.5,20 L9.5,13 L4,9 L10.5,9 Z" />
      </svg>
      <svg className="absolute top-[42%] right-[70%] h-3.5 w-3.5 text-blush/15 animate-float-slow animation-delay-7000" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,2 L13.5,9 L20,9 L14.5,13 L16.5,20 L12,15.5 L7.5,20 L9.5,13 L4,9 L10.5,9 Z" />
      </svg>

      {/* Shooting stars */}
      <div className="absolute top-[10%] left-[20%] animate-shooting-star">
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/30 to-transparent rounded-full" />
      </div>
      <div className="absolute top-[35%] left-[50%] animate-shooting-star animation-delay-4000">
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-rose/25 to-transparent rounded-full" />
      </div>
      <div className="absolute top-[60%] left-[10%] animate-shooting-star animation-delay-7000">
        <div className="h-px w-14 bg-gradient-to-r from-transparent via-gold-light/20 to-transparent rounded-full" />
      </div>

      {/* Rising particles */}
      <div className="absolute bottom-[5%] left-[20%] h-1 w-1 rounded-full bg-gold/25 animate-rise" style={{ animationDuration: "8s" }} />
      <div className="absolute bottom-[5%] left-[45%] h-1.5 w-1.5 rounded-full bg-rose/20 animate-rise animation-delay-2000" style={{ animationDuration: "7s" }} />
      <div className="absolute bottom-[5%] left-[70%] h-1 w-1 rounded-full bg-blush/25 animate-rise animation-delay-4000" style={{ animationDuration: "9s" }} />
      <div className="absolute bottom-[5%] left-[35%] h-1 w-1 rounded-full bg-gold-light/20 animate-rise animation-delay-5000" style={{ animationDuration: "6s" }} />
      <div className="absolute bottom-[5%] left-[60%] h-1.5 w-1.5 rounded-full bg-warm/15 animate-rise animation-delay-3000" style={{ animationDuration: "10s" }} />

      {/* Moon crescent */}
      <svg className="absolute top-[8%] left-[8%] w-8 h-8 text-gold/10 animate-float-slow" viewBox="0 0 32 32" fill="currentColor">
        <path d="M20,4 A14,14 0 1,1 20,28 A10,10 0 1,0 20,4" />
      </svg>
    </div>
  );
}
