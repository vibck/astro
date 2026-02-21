"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { usePlaceSearch } from "@/lib/hooks/use-place-search";
import { getProduct } from "@/lib/products";

function PlaceSearchField({ label, id, place }) {
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

// Einzelnes Formular — speichert nur lokal, kein API-Call
function BirthDataForm({ order, savedData, isPartner, isFirst, isLast, onSave, onBack }) {
  const [error, setError] = useState(null);
  const product = getProduct(order.productType);

  const place1 = usePlaceSearch(savedData?.birthPlace, savedData?.birthCoords);
  const place2 = usePlaceSearch(savedData?.partnerBirthPlace, savedData?.partnerBirthCoords);

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!place1.selected) {
      setError("Bitte wähle einen Geburtsort aus der Liste.");
      return;
    }
    if (isPartner && !place2.selected) {
      setError("Bitte wähle den Geburtsort der zweiten Person aus der Liste.");
      return;
    }

    const formData = new FormData(e.target);

    const data = {
      birthName: formData.get("birth_name"),
      birthDate: formData.get("birth_date"),
      birthTime: formData.get("birth_time"),
      birthPlace: place1.selected.display_name,
      birthCoords: { lat: place1.selected.lat, lng: place1.selected.lng },
    };

    if (isPartner) {
      data.partnerBirthName = formData.get("partner_birth_name");
      data.partnerBirthDate = formData.get("partner_birth_date");
      data.partnerBirthTime = formData.get("partner_birth_time");
      data.partnerBirthPlace = place2.selected.display_name;
      data.partnerBirthCoords = { lat: place2.selected.lat, lng: place2.selected.lng };
    }

    onSave(data);
  }

  return (
    <Card className="border-border bg-card">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Produkt-Hinweis */}
          <div className="rounded-2xl bg-gold/5 border border-gold/10 px-4 py-3 text-center">
            <p className="font-serif font-semibold text-foreground">{product?.name}</p>
            <p className="text-xs text-earth">{product?.subtitle}</p>
          </div>

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
              defaultValue={savedData?.birthName || ""}
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
              defaultValue={savedData?.birthDate || ""}
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
              defaultValue={savedData?.birthTime || ""}
              required
              className="bg-surface border-border"
            />
          </div>

          <PlaceSearchField label="Geburtsort" id="birth_place" place={place1} />

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
                  defaultValue={savedData?.partnerBirthName || ""}
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
                  defaultValue={savedData?.partnerBirthDate || ""}
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
                  defaultValue={savedData?.partnerBirthTime || ""}
                  required
                  className="bg-surface border-border"
                />
              </div>

              <PlaceSearchField label="Geburtsort" id="partner_birth_place" place={place2} />
            </>
          )}

          <div className="flex gap-3">
            {!isFirst && (
              <Button
                type="button"
                onClick={onBack}
                className="rounded-full border border-gold/30 bg-transparent text-gold hover:bg-gold/5"
              >
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Zurück
              </Button>
            )}
            <Button
              type="submit"
              className="flex-1 bg-gold text-primary-foreground hover:bg-gold-light"
            >
              Weiter
            </Button>
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

// Übersichts-Seite vor dem endgültigen Absenden
function ReviewPage({ orders, formDataMap, email, accountExists, onEdit, onSubmitAll }) {
  const [password, setPassword] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFinalSubmit() {
    setLoading(true);
    setError(null);

    try {
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const data = formDataMap[i];
        const isLast = i === orders.length - 1;

        const payload = {
          orderId: order.id,
          ...data,
        };

        // Account-Erstellung nur beim letzten
        if (isLast) {
          if (password) {
            payload.password = password;
            payload.email = email;
          }
          payload.marketingConsent = marketingConsent;
        }

        const res = await fetch("/api/submit-birth-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (!res.ok) {
          setError(`Fehler bei ${getProduct(order.productType)?.name}: ${result.error}`);
          setLoading(false);
          return;
        }
      }

      onSubmitAll();
    } catch {
      setError("Netzwerkfehler. Bitte versuche es erneut.");
      setLoading(false);
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardContent className="pt-6 space-y-6">
        <div className="text-center">
          <h2 className="font-serif text-xl font-bold text-foreground mb-1">Zusammenfassung</h2>
          <p className="text-sm text-earth">Bitte überprüfe deine Angaben vor dem Absenden.</p>
        </div>

        {orders.map((order, i) => {
          const product = getProduct(order.productType);
          const data = formDataMap[i];
          const isPartner = product?.formType === "partner";

          return (
            <div key={order.id} className="rounded-2xl bg-gold/5 border border-gold/10 p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-serif font-semibold text-foreground">{product?.name}</p>
                  <p className="text-xs text-earth">{product?.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit(i)}
                  className="text-xs text-gold hover:text-gold-light underline underline-offset-2"
                >
                  Bearbeiten
                </button>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <span className="text-earth">Name:</span>
                <span className="text-foreground">{data?.birthName}</span>
                <span className="text-earth">Geburtsdatum:</span>
                <span className="text-foreground">{data?.birthDate}</span>
                <span className="text-earth">Geburtszeit:</span>
                <span className="text-foreground">{data?.birthTime}</span>
                <span className="text-earth">Geburtsort:</span>
                <span className="text-foreground truncate">{data?.birthPlace}</span>
              </div>
              {isPartner && data?.partnerBirthName && (
                <div className="mt-3 pt-3 border-t border-gold/10 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <span className="text-earth">Partner Name:</span>
                  <span className="text-foreground">{data.partnerBirthName}</span>
                  <span className="text-earth">Geburtsdatum:</span>
                  <span className="text-foreground">{data.partnerBirthDate}</span>
                  <span className="text-earth">Geburtszeit:</span>
                  <span className="text-foreground">{data.partnerBirthTime}</span>
                  <span className="text-earth">Geburtsort:</span>
                  <span className="text-foreground truncate">{data.partnerBirthPlace}</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Account-Erstellung */}
        <hr className="border-border" />
        <div className="space-y-3">
          {accountExists ? (
            <p className="text-sm text-earth">
              Du hast bereits einen Account. Deine Bestellungen werden automatisch deinem Konto zugeordnet.
            </p>
          ) : (
            <>
              <p className="text-sm text-earth">
                Optional: Erstelle einen Account, um deine Readings im Dashboard zu verfolgen.
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

        <div className="flex gap-3">
          <Button
            type="button"
            onClick={() => onEdit(orders.length - 1)}
            className="rounded-full border border-gold/30 bg-transparent text-gold hover:bg-gold/5"
          >
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück
          </Button>
          <Button
            onClick={handleFinalSubmit}
            disabled={loading}
            className="flex-1 bg-gold text-primary-foreground hover:bg-gold-light"
          >
            {loading ? "Wird gespeichert..." : "Jetzt absenden"}
          </Button>
        </div>

        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function SuccessMultiForm({ orders, email }) {
  const pendingOrders = orders.filter((o) => !o.hasBirthData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formDataMap, setFormDataMap] = useState({}); // { 0: {...}, 1: {...}, ... }
  const [showReview, setShowReview] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [accountExists, setAccountExists] = useState(null);

  const total = pendingOrders.length;

  // Account-Check einmalig
  useEffect(() => {
    if (!email) return;
    fetch("/api/check-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => setAccountExists(data.exists))
      .catch(() => setAccountExists(false));
  }, [email]);

  if (pendingOrders.length === 0 || allDone) {
    const productNames = orders.map((o) => getProduct(o.productType)?.name).filter(Boolean).join(", ");
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
            Deine Daten wurden gespeichert. Wir erstellen dein {productNames} und senden es dir per E-Mail an <strong>{email}</strong>.
          </p>
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

  function handleSaveForm(index, data) {
    setFormDataMap((prev) => ({ ...prev, [index]: data }));
    if (index < total - 1) {
      setCurrentIndex(index + 1);
    } else {
      setShowReview(true);
    }
  }

  function handleBack() {
    if (showReview) {
      setShowReview(false);
      setCurrentIndex(total - 1);
    } else {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  }

  function handleEditFromReview(index) {
    setShowReview(false);
    setCurrentIndex(index);
  }

  const currentOrder = pendingOrders[currentIndex];
  const product = getProduct(currentOrder?.productType);
  const isPartner = product?.formType === "partner";

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
          Deine Zahlung war erfolgreich – vielen Dank! Jetzt benötigen wir noch deine Geburtsdaten.
        </p>

        {/* Stepper */}
        {total > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {pendingOrders.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  showReview
                    ? "w-2 bg-gold/50"
                    : i === currentIndex
                      ? "w-8 bg-gold"
                      : i < currentIndex
                        ? "w-2 bg-gold/50"
                        : "w-2 bg-gold/20"
                }`}
              />
            ))}
            {/* Übersichts-Punkt */}
            <div className={`h-2 rounded-full transition-all duration-300 ${showReview ? "w-8 bg-gold" : "w-2 bg-gold/20"}`} />
          </div>
        )}

        {/* Aktueller Schritt */}
        {!showReview && total > 1 && (
          <p className="mt-4 text-sm text-earth/70">
            <span className="font-medium text-gold">Formular {currentIndex + 1} von {total}</span>
          </p>
        )}
      </div>

      {showReview ? (
        <ReviewPage
          orders={pendingOrders}
          formDataMap={formDataMap}
          email={email}
          accountExists={accountExists}
          onEdit={handleEditFromReview}
          onSubmitAll={() => setAllDone(true)}
        />
      ) : (
        <BirthDataForm
          key={currentOrder.id + "-" + currentIndex}
          order={currentOrder}
          savedData={formDataMap[currentIndex]}
          isPartner={isPartner}
          isFirst={currentIndex === 0}
          isLast={currentIndex === total - 1}
          onSave={(data) => handleSaveForm(currentIndex, data)}
          onBack={handleBack}
        />
      )}
    </>
  );
}
