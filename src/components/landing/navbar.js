import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <nav className="flex items-center justify-between glass-warm rounded-full px-6 py-3">
          {/* Logo */}
          <Link href="/" className="font-serif text-xl font-bold text-gold">
            Seelensprache
          </Link>

          {/* Center nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#angebot" className="text-sm text-earth hover:text-gold transition-colors">
              Angebot
            </a>
            <a href="#ablauf" className="text-sm text-earth hover:text-gold transition-colors">
              Ablauf
            </a>
            <a href="#preis" className="text-sm text-earth hover:text-gold transition-colors">
              Preis
            </a>
          </div>

          {/* CTA */}
          <Button
            asChild
            size="sm"
            className="bg-gold text-white hover:bg-gold-light rounded-full px-6 glow-gold-warm"
          >
            <Link href="/login">Anmelden</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
