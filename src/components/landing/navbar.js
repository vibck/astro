"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <nav className="relative flex items-center rounded-full px-4 py-3 bg-white/80 backdrop-blur-xl border border-rose-light/15 shadow-[0_2px_20px_rgba(196,134,139,0.08)]">
          {/* Logo - links */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-1 cursor-pointer shrink-0">
            <img src="/logo.png" alt="Seelensprache Logo" className="h-28 w-28 -my-9 -ml-8" />
            <span className="text-4xl text-gradient-warm -ml-7 pl-1 pr-1" style={{ fontFamily: 'var(--font-dancing-script)' }}>Seelensprache</span>
          </a>

          {/* Center nav - Desktop (absolut zentriert) */}
          <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <a href="#angebot" className="text-sm text-earth hover:text-gold transition-colors">
              Angebote
            </a>
            <a href="#ablauf" className="text-sm text-earth hover:text-gold transition-colors">
              Ablauf
            </a>
            <Link href="/ueber-mich" className="text-sm text-earth hover:text-gold transition-colors">
              Über mich
            </Link>
          </div>

          {/* Rechts: CTA + Hamburger */}
          <div className="flex items-center gap-3 ml-auto">
            {/* CTA */}
            <Button
              asChild
              size="sm"
              className="bg-gold text-white hover:bg-gold-light rounded-full px-6 glow-gold-warm"
            >
              <Link href={user ? "/dashboard" : "/login"}>
                {user ? "Dashboard" : "Anmelden"}
              </Link>
            </Button>

            {/* Hamburger - Mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              aria-label="Menü öffnen"
            >
              <span className={`block h-0.5 w-5 bg-earth transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-earth transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-earth transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}>
          <div className="rounded-2xl px-6 py-4 bg-white/90 backdrop-blur-xl border border-rose-light/15 shadow-[0_2px_20px_rgba(196,134,139,0.08)] flex flex-col gap-3">
            <a href="#angebot" onClick={handleNavClick} className="text-sm text-earth hover:text-gold transition-colors py-2">
              Angebote
            </a>
            <a href="#ablauf" onClick={handleNavClick} className="text-sm text-earth hover:text-gold transition-colors py-2">
              Ablauf
            </a>
            <Link href="/ueber-mich" onClick={handleNavClick} className="text-sm text-earth hover:text-gold transition-colors py-2">
              Über mich
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
