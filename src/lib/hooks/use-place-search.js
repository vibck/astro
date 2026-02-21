"use client";

import { useState, useEffect, useRef } from "react";

export function usePlaceSearch(initialPlace, initialCoords) {
  const [query, setQuery] = useState(initialPlace || "");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(
    initialPlace && initialCoords
      ? { display_name: initialPlace, lat: initialCoords.lat, lng: initialCoords.lng }
      : null
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef(null);
  const skipSearchRef = useRef(!!initialPlace);

  useEffect(() => {
    // Keine Suche wenn bereits ein Ort ausgewählt ist oder initial gesetzt
    if (selected || skipSearchRef.current) {
      skipSearchRef.current = false;
      return;
    }

    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1`,
          { headers: { "Accept-Language": "de", "User-Agent": "Seelensprache/1.0" } }
        );
        const data = await res.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query, selected]);

  function selectPlace(place) {
    setSelected({
      display_name: place.display_name,
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
    });
    setQuery(place.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
  }

  function reset() {
    setQuery("");
    setSuggestions([]);
    setSelected(null);
    setShowSuggestions(false);
  }

  return {
    query,
    setQuery,
    suggestions,
    selected,
    setSelected,
    showSuggestions,
    setShowSuggestions,
    selectPlace,
    reset,
  };
}
