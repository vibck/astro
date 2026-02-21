"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { usePlaceSearch } from "@/lib/hooks/use-place-search";
import { getProduct } from "@/lib/products";

function PlaceSearchField({ label, id, place, onQueryChange }) {
  return (
    <div className="relative space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="text"
        placeholder="z.B. Berlin, Deutschland"
        value={place.query}
        onChange={(e) => {
          place.setQuery(e.target.value);
          place.setSelected(null);
          if (onQueryChange) onQueryChange();
        }}
        onFocus={() => place.suggestions.length > 0 && place.setShowSuggestions(true)}
        required
        className="bg-surface border-border"
        autoComplete="off"
      />
      {place.showSuggestions && place.suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full rounded-md border border-border bg-card shadow-lg max-h-48 overflow-y-auto">
          {place.suggestions.map((s) => (
            <li key={s.place_id}>
              <button
                type="button"
                onClick={() => place.selectPlace(s)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors"
              >
                {s.display_name}
              </button>
            </li>
          ))}
        </ul>
      )}
      {place.selected && (
        <p className="text-xs text-muted-foreground">
          Koordinaten: {place.selected.lat.toFixed(4)}, {place.selected.lng.toFixed(4)}
        </p>
      )}
    </div>
  );
}

export function SuccessBirthDataForm({ orderId, productType, email }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [accountExists, setAccountExists] = useState(null);

  const product = getProduct(productType);
  const isPartner = product?.formType === "partner";

  const place1 = usePlaceSearch();
  const place2 = usePlaceSearch();

  // Prüfe ob schon ein Account mit dieser E-Mail existiert
  useEffect(() => {
    fetch("/api/check-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => setAccountExists(data.exists))
      .catch(() => setAccountExists(false));
  }, [email]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!place1.selected) {
      setError("Bitte wähle einen Geburtsort aus der Liste.");
      setLoading(false);
      return;
    }

    if (isPartner && !place2.selected) {
      setError("Bitte wähle den Geburtsort der zweiten Person aus der Liste.");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.target);

    const payload = {
      orderId,
      birthName: formData.get("birth_name"),
      birthDate: formData.get("birth_date"),
      birthTime: formData.get("birth_time"),
      birthPlace: place1.selected.display_name,
      birthCoords: { lat: place1.selected.lat, lng: place1.selected.lng },
    };

    if (isPartner) {
      payload.partnerBirthName = formData.get("partner_birth_name");
      payload.partnerBirthDate = formData.get("partner_birth_date");
      payload.partnerBirthTime = formData.get("partner_birth_time");
      payload.partnerBirthPlace = place2.selected.display_name;
      payload.partnerBirthCoords = { lat: place2.selected.lat, lng: place2.selected.lng };
    }

    if (password) {
      payload.password = password;
      payload.email = email;
    }

    payload.marketingConsent = marketingConsent;

    try {
      const res = await fetch("/api/submit-birth-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Fehler beim Speichern.");
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError("Netzwerkfehler. Bitte versuche es erneut.");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="pt-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
            <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl font-bold text-gold mb-2">
            Vielen Dank!
          </h2>
          <p className="text-earth mb-4">
            Deine Daten wurden gespeichert. Wir erstellen dein <strong>{product.name}</strong> und senden es dir per E-Mail an <strong>{email}</strong>.
          </p>
          {password && (
            <p className="text-sm text-muted-foreground mb-4">
              Dein Account wurde erstellt. Du kannst dich jetzt mit deiner E-Mail und deinem Passwort einloggen.
            </p>
          )}
          <Button
            asChild
            className="bg-gold text-white hover:bg-gold-light rounded-full px-8 glow-gold-warm"
          >
            <a href="/">Zurück zur Startseite</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="text-center mb-8">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
          <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-serif text-3xl font-bold text-gold">
          Nur noch ein Schritt!
        </h1>
        <p className="text-earth mt-2">
          Deine Zahlung war erfolgreich – vielen Dank! Jetzt benötigen wir noch deine Geburtsdaten für dein <strong>{product.name}</strong>.
        </p>
      </div>
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
          {/* Person 1 */}
          {isPartner && (
            <p className="text-sm font-semibold text-gold uppercase tracking-wide">Person 1</p>
          )}

          <div className="space-y-2">
            <Label htmlFor="birth_name">Name</Label>
            <Input
              id="birth_name"
              name="birth_name"
              type="text"
              placeholder="Vorname"
              required
              className="bg-surface border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birth_date">Geburtsdatum</Label>
            <Input
              id="birth_date"
              name="birth_date"
              type="date"
              required
              className="bg-surface border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birth_time">Geburtszeit (so genau wie möglich)</Label>
            <Input
              id="birth_time"
              name="birth_time"
              type="time"
              required
              className="bg-surface border-border"
            />
          </div>

          <PlaceSearchField
            label="Geburtsort"
            id="birth_place"
            place={place1}
          />

          {/* Person 2 (Seelenkompass) */}
          {isPartner && (
            <>
              <hr className="border-border my-2" />
              <p className="text-sm font-semibold text-gold uppercase tracking-wide">Person 2</p>

              <div className="space-y-2">
                <Label htmlFor="partner_birth_name">Name</Label>
                <Input
                  id="partner_birth_name"
                  name="partner_birth_name"
                  type="text"
                  placeholder="Vorname"
                  required
                  className="bg-surface border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="partner_birth_date">Geburtsdatum</Label>
                <Input
                  id="partner_birth_date"
                  name="partner_birth_date"
                  type="date"
                  required
                  className="bg-surface border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="partner_birth_time">Geburtszeit (so genau wie möglich)</Label>
                <Input
                  id="partner_birth_time"
                  name="partner_birth_time"
                  type="time"
                  required
                  className="bg-surface border-border"
                />
              </div>

              <PlaceSearchField
                label="Geburtsort"
                id="partner_birth_place"
                place={place2}
              />
            </>
          )}

          {/* Optional: Account-Erstellung */}
          <hr className="border-border my-2" />
          <div className="space-y-3">
            {accountExists ? (
              <p className="text-sm text-earth">
                Du hast bereits einen Account. Deine Bestellung wird automatisch deinem Konto zugeordnet.
              </p>
            ) : (
              <>
                <p className="text-sm text-earth">
                  Optional: Erstelle einen Account, um dein Reading im Dashboard zu verfolgen.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="password">Passwort (optional)</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mindestens 6 Zeichen"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={password ? 6 : undefined}
                    className="bg-surface border-border"
                  />
                </div>
              </>
            )}

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="mt-1 rounded border-border"
              />
              <span className="text-sm text-earth">
                Ich möchte per E-Mail über neue Angebote informiert werden.
              </span>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-gold text-primary-foreground hover:bg-gold-light"
            disabled={loading}
          >
            {loading ? "Wird gespeichert..." : "Daten speichern"}
          </Button>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
        </form>
      </CardContent>
    </Card>
    </>
  );
}
