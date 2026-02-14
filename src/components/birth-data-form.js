"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { saveBirthData } from "@/app/birth-data/actions";

export function BirthDataForm({ readingId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Place search
  const [placeQuery, setPlaceQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (placeQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeQuery)}&format=json&limit=5&addressdetails=1`,
          { headers: { "Accept-Language": "de" } }
        );
        const data = await res.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [placeQuery]);

  function selectPlace(place) {
    setSelectedPlace({
      display_name: place.display_name,
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
    });
    setPlaceQuery(place.display_name);
    setShowSuggestions(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!selectedPlace) {
      setError("Bitte wähle einen Geburtsort aus der Liste.");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.target);

    const result = await saveBirthData({
      readingId,
      birthDate: formData.get("birth_date"),
      birthTime: formData.get("birth_time"),
      birthPlace: selectedPlace.display_name,
      birthCoords: { lat: selectedPlace.lat, lng: selectedPlace.lng },
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
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

          <div className="relative space-y-2">
            <Label htmlFor="birth_place">Geburtsort</Label>
            <Input
              id="birth_place"
              type="text"
              placeholder="z.B. Berlin, Deutschland"
              value={placeQuery}
              onChange={(e) => {
                setPlaceQuery(e.target.value);
                setSelectedPlace(null);
              }}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              required
              className="bg-surface border-border"
              autoComplete="off"
            />

            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-50 mt-1 w-full rounded-md border border-border bg-card shadow-lg max-h-48 overflow-y-auto">
                {suggestions.map((place) => (
                  <li key={place.place_id}>
                    <button
                      type="button"
                      onClick={() => selectPlace(place)}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors"
                    >
                      {place.display_name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedPlace && (
            <p className="text-xs text-muted-foreground">
              Koordinaten: {selectedPlace.lat.toFixed(4)}, {selectedPlace.lng.toFixed(4)}
            </p>
          )}

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
  );
}
