"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/lib/cart-context";

export function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, setIsOpen: setCartOpen } = useCart();

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
      <div className="mx-auto max-w-6xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4">
        <nav className="relative flex items-center rounded-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-white/80 backdrop-blur-xl border border-rose-light/15 shadow-[0_2px_20px_rgba(196,134,139,0.08)]">
          {/* Logo - links */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-1 cursor-pointer shrink-0 min-w-0">
            <img src="/logo.png" alt="Seelensprache Logo" className="h-12 w-12 -my-3 -ml-2 sm:h-16 sm:w-16 sm:-my-4 sm:-ml-4 md:h-20 md:w-20 md:-my-6 md:-ml-6 lg:h-28 lg:w-28 lg:-my-9 lg:-ml-8" />
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gradient-warm -ml-2 sm:-ml-3 md:-ml-5 lg:-ml-7 pl-1 pr-1" style={{ fontFamily: 'var(--font-dancing-script)' }}>Seelensprache</span>
          </a>

          {/* Center nav - Desktop (absolut zentriert, ab md) */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 absolute left-1/2 -translate-x-1/2">
            <a href="#angebot" className="text-xs lg:text-sm text-earth hover:text-gold transition-colors">
              Angebote
            </a>
            <a href="#ablauf" className="text-xs lg:text-sm text-earth hover:text-gold transition-colors">
              Ablauf
            </a>
            <Link href="/ueber-mich" className="text-xs lg:text-sm text-earth hover:text-gold transition-colors">
              Über mich
            </Link>
            <Link href="/wissen" className="text-xs lg:text-sm text-earth hover:text-gold transition-colors">
              Wissen
            </Link>
          </div>

          {/* Rechts: Cart + CTA + Hamburger */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 ml-auto shrink-0">
            {/* Warenkorb-Icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-8 w-8 items-center justify-center rounded-full hover:bg-rose-light/10 transition-colors"
              aria-label="Warenkorb öffnen"
            >
              <svg className="h-[18px] w-[18px] sm:h-5 sm:w-5 text-earth" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>

            {/* CTA */}
            <Button
              asChild
              size="sm"
              className="bg-gold text-white hover:bg-gold-light rounded-full px-3 sm:px-4 lg:px-6 text-xs sm:text-sm glow-gold-warm h-8 sm:h-9"
            >
              <Link href={user ? "/dashboard" : "/login"}>
                <span className="md:hidden">{user ? "Dashboard" : "Login"}</span>
                <span className="hidden md:inline">{user ? "Dashboard" : "Anmelden"}</span>
              </Link>
            </Button>

            {/* Hamburger - bis md */}
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

        {/* Mobile dropdown - bis md */}
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
            <Link href="/wissen" onClick={handleNavClick} className="text-sm text-earth hover:text-gold transition-colors py-2">
              Wissen
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
