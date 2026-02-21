"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleSetPassword(e) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Das Passwort muss mindestens 6 Zeichen haben.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Die Passwörter stimmen nicht überein.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 relative overflow-hidden">
      <div className="pointer-events-none absolute top-[15%] right-[5%] h-[350px] w-[350px] bg-gold/[0.04] rounded-full blur-[130px] animate-breathe" />
      <div className="pointer-events-none absolute bottom-[15%] left-[5%] h-[300px] w-[300px] bg-rose/[0.05] rounded-full blur-[110px] animate-breathe animation-delay-2000" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Title - schwebt über der Card */}
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
              Neues Passwort setzen
            </CardTitle>
            <CardDescription className="text-earth">
              Wähle ein neues Passwort für dein Konto.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground text-sm font-medium">Neues Passwort</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mindestens 6 Zeichen"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="bg-white/60 border-sand rounded-xl focus:border-gold h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm" className="text-foreground text-sm font-medium">Passwort bestätigen</Label>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="Passwort wiederholen"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? "Wird gespeichert..." : "Passwort speichern"}
              </Button>

              {error && (
                <div className="flex items-center gap-2 justify-center bg-red-50/80 rounded-xl px-4 py-3">
                  <svg className="h-4 w-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
