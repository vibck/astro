import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export function Footer() {
  return (
    <footer className="relative py-6 px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand to-transparent" />

      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <BrandLogo size="sm" />

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
