"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <nav className="flex items-center justify-between rounded-full px-6 py-3 bg-white/80 backdrop-blur-xl border border-rose-light/15 shadow-[0_2px_20px_rgba(196,134,139,0.08)]">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="font-serif text-xl font-bold text-gold cursor-pointer">
            Seelensprache
          </a>

          {/* Center nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#angebot" className="text-sm text-earth hover:text-gold transition-colors">
              Angebote
            </a>
            <a href="#ablauf" className="text-sm text-earth hover:text-gold transition-colors">
              Ablauf
            </a>
          </div>

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
        </nav>
      </div>
    </header>
  );
}
