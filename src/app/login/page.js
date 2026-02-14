"use client";

import { useState } from "react";
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
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Ein Magic Link wurde an deine E-Mail gesendet. Prüfe deinen Posteingang!");
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 relative">
      {/* Background blobs */}
      <div className="pointer-events-none absolute top-[20%] right-[10%] h-[300px] w-[300px] bg-gold/[0.04] rounded-full blur-[100px] animate-breathe" />
      <div className="pointer-events-none absolute bottom-[20%] left-[10%] h-[250px] w-[250px] bg-rose/[0.05] rounded-full blur-[80px] animate-breathe animation-delay-2000" />

      <div className="w-full max-w-md relative">
        <Link href="/" className="block text-center mb-8">
          <span className="font-serif text-2xl font-bold text-gradient-warm">
            Seelensprache
          </span>
        </Link>

        <Card className="glass-warm-strong rounded-2xl glow-warm border-sand">
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-3xl text-foreground">
              Willkommen
            </CardTitle>
            <CardDescription className="text-earth">
              Melde dich mit deiner E-Mail an — wir senden dir einen Magic Link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="deine@email.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/50 border-sand rounded-xl focus:border-gold"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gold text-white hover:bg-gold-light rounded-full glow-gold-warm"
                disabled={loading}
              >
                {loading ? "Wird gesendet..." : "Magic Link senden"}
              </Button>

              {message && (
                <p className="text-sm text-green-700 text-center">{message}</p>
              )}
              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
