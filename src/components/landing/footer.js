import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative py-14 px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand to-transparent" />

      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl font-bold text-gradient-warm">
              Seelensprache
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-earth">
            <Link href="/login" className="hover:text-gold transition-colors">
              Anmelden
            </Link>
            <a href="#angebot" className="hover:text-gold transition-colors">
              Angebot
            </a>
            <a href="#preis" className="hover:text-gold transition-colors">
              Preis
            </a>
          </div>

          <p className="text-xs text-earth/60">
            &copy; {new Date().getFullYear()} Seelensprache
          </p>
        </div>
      </div>
    </footer>
  );
}
