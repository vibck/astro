"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function OrderButton() {
  const [loading, setLoading] = useState(false);

  async function handleOrder() {
    setLoading(true);

    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleOrder}
      disabled={loading}
      className="bg-gold text-primary-foreground hover:bg-gold-light"
    >
      {loading ? "Wird geladen..." : "Reading bestellen"}
    </Button>
  );
}
