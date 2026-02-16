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

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-earth">
            <Link href="/impressum" className="hover:text-gold transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-gold transition-colors">
              Datenschutz
            </Link>
            <Link href="/agb" className="hover:text-gold transition-colors">
              AGB
            </Link>
            <Link href="/widerruf" className="hover:text-gold transition-colors">
              Widerruf
            </Link>
          </div>

          <p className="text-xs text-earth/60">
            &copy; {new Date().getFullYear()} Seelensprache
          </p>
        </div>
      </div>
    </footer>
  );
}
