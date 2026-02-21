"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("login"); // "login" | "register" | "forgot"
  const router = useRouter();
  const searchParams = useSearchParams();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.replace("/dashboard");
      }
    });
  }, [router]);

  // Check for error param from auth callback
  useEffect(() => {
    if (searchParams.get("error") === "auth_failed") {
      setError("Anmeldung fehlgeschlagen. Bitte versuche es erneut.");
    }
  }, [searchParams]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("E-Mail oder Passwort ist falsch.");
    } else {
      router.push("/dashboard");
    }

    setLoading(false);
  }

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    if (password.length < 6) {
      setError("Das Passwort muss mindestens 6 Zeichen haben.");
      setLoading(false);
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Wir haben dir eine Bestätigungs-E-Mail gesendet. Bitte prüfe deinen Posteingang!");
    }

    setLoading(false);
  }

  async function handleForgotPassword(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/set-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Wir haben dir einen Link zum Zurücksetzen deines Passworts gesendet.");
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 relative overflow-hidden">
      {/* Animated star field background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Scattered twinkling stars */}
        <div className="absolute top-[5%] left-[10%] h-1 w-1 rounded-full bg-gold/30 animate-twinkle" />
        <div className="absolute top-[8%] left-[45%] h-1.5 w-1.5 rounded-full bg-rose/25 animate-twinkle animation-delay-1000" />
        <div className="absolute top-[3%] right-[15%] h-1 w-1 rounded-full bg-gold-light/35 animate-twinkle animation-delay-2000" />
        <div className="absolute top-[12%] left-[70%] h-0.5 w-0.5 rounded-full bg-blush/40 animate-twinkle animation-delay-600" />
        <div className="absolute top-[15%] left-[25%] h-1 w-1 rounded-full bg-rose-light/30 animate-twinkle animation-delay-3000" />
        <div className="absolute top-[10%] right-[30%] h-1.5 w-1.5 rounded-full bg-gold/20 animate-twinkle animation-delay-4000" />
        <div className="absolute top-[20%] left-[5%] h-0.5 w-0.5 rounded-full bg-gold/35 animate-twinkle animation-delay-5000" />
        <div className="absolute top-[18%] right-[8%] h-1 w-1 rounded-full bg-rose/25 animate-twinkle animation-delay-7000" />
        <div className="absolute top-[25%] left-[55%] h-0.5 w-0.5 rounded-full bg-blush/30 animate-twinkle animation-delay-2000" />
        <div className="absolute top-[22%] right-[45%] h-1 w-1 rounded-full bg-gold-light/25 animate-twinkle animation-delay-1000" />

        <div className="absolute top-[35%] left-[3%] h-1 w-1 rounded-full bg-gold/25 animate-twinkle animation-delay-3000" />
        <div className="absolute top-[40%] right-[5%] h-1.5 w-1.5 rounded-full bg-rose/20 animate-twinkle animation-delay-600" />
        <div className="absolute top-[45%] left-[15%] h-0.5 w-0.5 rounded-full bg-blush/35 animate-twinkle animation-delay-4000" />
        <div className="absolute top-[50%] right-[18%] h-1 w-1 rounded-full bg-gold/30 animate-twinkle animation-delay-5000" />
        <div className="absolute top-[55%] left-[8%] h-1 w-1 rounded-full bg-rose-light/25 animate-twinkle animation-delay-7000" />
        <div className="absolute top-[48%] right-[12%] h-0.5 w-0.5 rounded-full bg-gold-light/30 animate-twinkle animation-delay-2000" />

        <div className="absolute bottom-[30%] left-[12%] h-1.5 w-1.5 rounded-full bg-gold/20 animate-twinkle animation-delay-1000" />
        <div className="absolute bottom-[25%] right-[22%] h-1 w-1 rounded-full bg-rose/30 animate-twinkle animation-delay-3000" />
        <div className="absolute bottom-[20%] left-[40%] h-0.5 w-0.5 rounded-full bg-blush/35 animate-twinkle animation-delay-5000" />
        <div className="absolute bottom-[15%] right-[35%] h-1 w-1 rounded-full bg-gold-light/25 animate-twinkle animation-delay-4000" />
        <div className="absolute bottom-[10%] left-[60%] h-1 w-1 rounded-full bg-rose/20 animate-twinkle animation-delay-7000" />
        <div className="absolute bottom-[8%] left-[20%] h-0.5 w-0.5 rounded-full bg-gold/30 animate-twinkle animation-delay-600" />
        <div className="absolute bottom-[5%] right-[10%] h-1.5 w-1.5 rounded-full bg-blush/25 animate-twinkle animation-delay-2000" />
        <div className="absolute bottom-[12%] right-[50%] h-1 w-1 rounded-full bg-rose-light/30 animate-twinkle animation-delay-1000" />

        {/* Floating 4-point star shapes */}
        <svg className="absolute top-[8%] right-[20%] h-5 w-5 text-gold/15 animate-float-slow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2 L13.5,9 L20,9 L14.5,13 L16.5,20 L12,15.5 L7.5,20 L9.5,13 L4,9 L10.5,9 Z" />
        </svg>
        <svg className="absolute bottom-[18%] left-[12%] h-4 w-4 text-rose/12 animate-float animation-delay-2000" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2 L13.5,9 L20,9 L14.5,13 L16.5,20 L12,15.5 L7.5,20 L9.5,13 L4,9 L10.5,9 Z" />
        </svg>
        <svg className="absolute top-[30%] left-[5%] h-3 w-3 text-gold-light/10 animate-float-slow animation-delay-4000" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2 L13.5,9 L20,9 L14.5,13 L16.5,20 L12,15.5 L7.5,20 L9.5,13 L4,9 L10.5,9 Z" />
        </svg>
        <svg className="absolute bottom-[30%] right-[8%] h-3.5 w-3.5 text-blush/12 animate-float animation-delay-5000" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2 L13.5,9 L20,9 L14.5,13 L16.5,20 L12,15.5 L7.5,20 L9.5,13 L4,9 L10.5,9 Z" />
        </svg>
        <svg className="absolute top-[60%] left-[80%] h-4 w-4 text-gold/10 animate-float-slow animation-delay-3000" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2 L13.5,9 L20,9 L14.5,13 L16.5,20 L12,15.5 L7.5,20 L9.5,13 L4,9 L10.5,9 Z" />
        </svg>

        {/* Cross sparkle shapes */}
        <svg className="absolute top-[15%] left-[60%] h-3 w-3 text-gold/20 animate-twinkle animation-delay-1000" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8,0 L9,6 L16,8 L9,10 L8,16 L7,10 L0,8 L7,6 Z" />
        </svg>
        <svg className="absolute bottom-[22%] left-[30%] h-2.5 w-2.5 text-rose/18 animate-twinkle animation-delay-3000" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8,0 L9,6 L16,8 L9,10 L8,16 L7,10 L0,8 L7,6 Z" />
        </svg>
        <svg className="absolute top-[42%] right-[25%] h-2 w-2 text-gold-light/20 animate-twinkle animation-delay-5000" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8,0 L9,6 L16,8 L9,10 L8,16 L7,10 L0,8 L7,6 Z" />
        </svg>
        <svg className="absolute top-[70%] left-[18%] h-2.5 w-2.5 text-blush/15 animate-twinkle animation-delay-7000" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8,0 L9,6 L16,8 L9,10 L8,16 L7,10 L0,8 L7,6 Z" />
        </svg>

        {/* Shooting stars */}
        <div className="absolute top-[12%] left-[30%] animate-shooting-star">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold/35 to-transparent rounded-full" />
        </div>
        <div className="absolute top-[45%] left-[60%] animate-shooting-star animation-delay-4000">
          <div className="h-px w-14 bg-gradient-to-r from-transparent via-rose/30 to-transparent rounded-full" />
        </div>
        <div className="absolute bottom-[35%] left-[15%] animate-shooting-star animation-delay-7000">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold-light/25 to-transparent rounded-full" />
        </div>

        {/* Constellation lines */}
        <svg className="absolute top-[5%] left-[5%] w-48 h-48 opacity-[0.05]" viewBox="0 0 200 200" fill="none">
          <line x1="30" y1="40" x2="90" y2="60" strokeWidth="0.5" stroke="#C4868B" />
          <line x1="90" y1="60" x2="150" y2="30" strokeWidth="0.5" stroke="#C4868B" />
          <line x1="90" y1="60" x2="70" y2="130" strokeWidth="0.5" stroke="#C4868B" />
          <line x1="70" y1="130" x2="160" y2="150" strokeWidth="0.5" stroke="#C4868B" />
          <line x1="150" y1="30" x2="180" y2="100" strokeWidth="0.5" stroke="#C4868B" />
          <circle cx="30" cy="40" r="2.5" fill="#C4868B" />
          <circle cx="90" cy="60" r="3" fill="#C4868B" />
          <circle cx="150" cy="30" r="2" fill="#C4868B" />
          <circle cx="70" cy="130" r="2.5" fill="#C4868B" />
          <circle cx="160" cy="150" r="2" fill="#C4868B" />
          <circle cx="180" cy="100" r="1.5" fill="#C4868B" />
        </svg>

        <svg className="absolute bottom-[5%] right-[5%] w-44 h-44 opacity-[0.05]" viewBox="0 0 180 180" fill="none">
          <line x1="20" y1="80" x2="70" y2="30" strokeWidth="0.5" stroke="#D4A0A4" />
          <line x1="70" y1="30" x2="140" y2="50" strokeWidth="0.5" stroke="#D4A0A4" />
          <line x1="140" y1="50" x2="120" y2="140" strokeWidth="0.5" stroke="#D4A0A4" />
          <line x1="70" y1="30" x2="50" y2="120" strokeWidth="0.5" stroke="#D4A0A4" />
          <line x1="50" y1="120" x2="120" y2="140" strokeWidth="0.5" stroke="#D4A0A4" />
          <circle cx="20" cy="80" r="2" fill="#D4A0A4" />
          <circle cx="70" cy="30" r="3" fill="#D4A0A4" />
          <circle cx="140" cy="50" r="2.5" fill="#D4A0A4" />
          <circle cx="120" cy="140" r="2" fill="#D4A0A4" />
          <circle cx="50" cy="120" r="2" fill="#D4A0A4" />
        </svg>

        {/* Moon crescent */}
        <svg className="absolute top-[6%] right-[10%] w-10 h-10 text-gold/12 animate-float-slow" viewBox="0 0 32 32" fill="currentColor">
          <path d="M20,4 A14,14 0 1,1 20,28 A10,10 0 1,0 20,4" />
        </svg>
      </div>

      {/* Rotating orbital rings */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] animate-spin-slow opacity-[0.06]">
        <div className="absolute inset-0 rounded-full border border-gold/40" />
        <div className="absolute inset-10 rounded-full border border-dashed border-rose/25" />
        <div className="absolute inset-20 rounded-full border border-dotted border-gold-light/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-gold/60" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-rose/50" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-blush/40" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 h-2 w-2 rounded-full bg-gold-light/50" />
      </div>

      {/* Second ring, counter-rotating */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] opacity-[0.04]" style={{ animation: "spin-slow 45s linear infinite reverse" }}>
        <div className="absolute inset-0 rounded-full border border-rose-light/40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-rose/60" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-gold/50" />
      </div>

      {/* Breathing glow blobs */}
      <div className="pointer-events-none absolute top-[15%] right-[5%] h-[350px] w-[350px] bg-gold/[0.04] rounded-full blur-[130px] animate-breathe" />
      <div className="pointer-events-none absolute bottom-[15%] left-[5%] h-[300px] w-[300px] bg-rose/[0.05] rounded-full blur-[110px] animate-breathe animation-delay-2000" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Title - schwebt über der Card ohne Platz einzunehmen */}
        <div className="text-center relative">
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-full pb-4">
            <Link href="/" className="inline-block">
              <img src="/logo.png" alt="Seelensprache Logo" className="h-72 w-72 mx-auto -mb-18" />
              <span className="block -mt-8 text-6xl md:text-7xl text-gradient-warm pl-2" style={{ fontFamily: 'var(--font-dancing-script)' }}>
                Seelensprache
              </span>
            </Link>
            <p className="text-earth text-sm tracking-wide mt-3">
              Dein Weg zu den Sternen beginnt hier
            </p>
          </div>
        </div>

        <Card className="glass-warm-strong rounded-3xl border-sand shadow-[0_8px_50px_rgba(196,134,139,0.12)]">
          <CardHeader className="text-center pb-2">
            <CardTitle className="font-serif text-2xl text-foreground">
              {mode === "login" && "Willkommen zurück"}
              {mode === "register" && "Konto erstellen"}
              {mode === "forgot" && "Passwort vergessen"}
            </CardTitle>
            <CardDescription className="text-earth">
              {mode === "login" && "Melde dich mit deiner E-Mail und deinem Passwort an."}
              {mode === "register" && "Erstelle ein Konto mit deiner E-Mail und einem Passwort."}
              {mode === "forgot" && "Gib deine E-Mail ein und wir senden dir einen Reset-Link."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Login Form */}
            {mode === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground text-sm font-medium">E-Mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="deine@email.de"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/60 border-sand rounded-xl focus:border-gold h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground text-sm font-medium">Passwort</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Dein Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/60 border-sand rounded-xl focus:border-gold h-11"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gold text-white hover:bg-gold-light rounded-full h-11 glow-gold-warm text-sm font-semibold"
                  disabled={loading}
                >
                  {loading ? "Wird angemeldet..." : "Anmelden"}
                </Button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => { setMode("forgot"); setError(null); setMessage(null); }}
                    className="text-xs text-earth/60 hover:text-gold transition-colors"
                  >
                    Passwort vergessen?
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMode("register"); setError(null); setMessage(null); }}
                    className="text-xs text-gold hover:text-gold-dark transition-colors font-medium"
                  >
                    Konto erstellen
                  </button>
                </div>
              </form>
            )}

            {/* Register Form */}
            {mode === "register" && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-email" className="text-foreground text-sm font-medium">E-Mail</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="deine@email.de"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/60 border-sand rounded-xl focus:border-gold h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password" className="text-foreground text-sm font-medium">Passwort</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="Mindestens 6 Zeichen"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="bg-white/60 border-sand rounded-xl focus:border-gold h-11"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gold text-white hover:bg-gold-light rounded-full h-11 glow-gold-warm text-sm font-semibold"
                  disabled={loading}
                >
                  {loading ? "Wird erstellt..." : "Registrieren"}
                </Button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => { setMode("login"); setError(null); setMessage(null); }}
                    className="text-xs text-earth/60 hover:text-gold transition-colors"
                  >
                    Schon ein Konto? <span className="text-gold font-medium">Anmelden</span>
                  </button>
                </div>
              </form>
            )}

            {/* Forgot Password Form */}
            {mode === "forgot" && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email" className="text-foreground text-sm font-medium">E-Mail</Label>
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="deine@email.de"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/60 border-sand rounded-xl focus:border-gold h-11"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gold text-white hover:bg-gold-light rounded-full h-11 glow-gold-warm text-sm font-semibold"
                  disabled={loading}
                >
                  {loading ? "Wird gesendet..." : "Reset-Link senden"}
                </Button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => { setMode("login"); setError(null); setMessage(null); }}
                    className="text-xs text-earth/60 hover:text-gold transition-colors"
                  >
                    Zurück zur <span className="text-gold font-medium">Anmeldung</span>
                  </button>
                </div>
              </form>
            )}

            {/* Messages */}
            {message && (
              <div className="flex items-center gap-2 justify-center bg-green-50/80 rounded-xl px-4 py-3 mt-4">
                <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-green-700">{message}</p>
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2 justify-center bg-red-50/80 rounded-xl px-4 py-3 mt-4">
                <svg className="h-4 w-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link href="/" className="text-xs text-earth/60 hover:text-gold transition-colors">
                Zurück zur Startseite
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
