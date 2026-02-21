"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProduct } from "@/lib/products";

const statusLabels = {
  pending: "Ausstehend",
  paid: "Bezahlt",
  processing: "In Bearbeitung",
  completed: "Fertig",
};

const statusColors = {
  pending: "bg-muted-foreground",
  paid: "bg-gold",
  processing: "bg-gold-light",
  completed: "bg-green-400",
};

export function AdminReadingCard({ reading }) {
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(reading.status === "completed");

  const product = getProduct(reading.product_type);
  const productName = product?.name || "Reading";

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const supabase = createClient();

    const folder = reading.user_id || "guests";
    // Schöner Dateiname: "Seelensprache - Seelenspiegel - Max Mustermann.pdf"
    const safeName = (reading.birth_name || "Reading").replace(/[^a-zA-ZäöüÄÖÜß\s-]/g, "").trim();
    const fileName = `Seelensprache - ${productName} - ${safeName}.pdf`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("readings")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      alert("Upload fehlgeschlagen: " + uploadError.message);
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("readings").getPublicUrl(filePath);

    // Use signed URL instead for private bucket
    const { data: signedData } = await supabase.storage
      .from("readings")
      .createSignedUrl(filePath, 60 * 60 * 24 * 365); // 1 year

    const pdfUrl = signedData?.signedUrl || publicUrl;

    // API-Route nutzen, damit serverseitig die Kunden-E-Mail versendet wird
    const res = await fetch("/api/admin/complete-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: reading.id, pdfUrl }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert("Status-Update fehlgeschlagen: " + (data.error || "Unbekannter Fehler"));
    } else {
      setDone(true);
    }

    setUploading(false);
  }

  return (
    <Card className="border-border bg-card">
      <CardContent className="py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-block h-2 w-2 rounded-full ${statusColors[reading.status]}`}
              />
              <span className="text-sm font-medium">
                {statusLabels[reading.status]}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold font-medium">
                {productName}
              </span>
              <span className="text-xs text-muted-foreground">
                {reading.email}
              </span>
            </div>

            {reading.birth_date && (
              <div className="text-sm text-muted-foreground space-y-0.5">
                <p>
                  {reading.birth_name && <strong>{reading.birth_name}: </strong>}
                  {new Date(reading.birth_date).toLocaleDateString("de-DE")}
                  {reading.birth_time && ` um ${reading.birth_time}`}
                  {reading.birth_place && ` — ${reading.birth_place}`}
                </p>
                {reading.birth_coords && (
                  <p className="text-xs">
                    Koordinaten: {reading.birth_coords.lat?.toFixed(4)},{" "}
                    {reading.birth_coords.lng?.toFixed(4)}
                  </p>
                )}

                {/* Partner data for Seelenkompass */}
                {reading.partner_birth_name && (
                  <>
                    <p className="mt-1">
                      <strong>{reading.partner_birth_name}: </strong>
                      {new Date(reading.partner_birth_date).toLocaleDateString("de-DE")}
                      {reading.partner_birth_time && ` um ${reading.partner_birth_time}`}
                      {reading.partner_birth_place && ` — ${reading.partner_birth_place}`}
                    </p>
                    {reading.partner_birth_coords && (
                      <p className="text-xs">
                        Koordinaten: {reading.partner_birth_coords.lat?.toFixed(4)},{" "}
                        {reading.partner_birth_coords.lng?.toFixed(4)}
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="shrink-0">
            {!done && reading.birth_date && (
              <label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleUpload}
                  className="hidden"
                  disabled={uploading}
                />
                <Button
                  asChild
                  size="sm"
                  className="bg-gold text-primary-foreground hover:bg-gold-light cursor-pointer"
                  disabled={uploading}
                >
                  <span>{uploading ? "Wird hochgeladen..." : "PDF hochladen"}</span>
                </Button>
              </label>
            )}
            {done && (
              <span className="text-sm text-green-400">Abgeschlossen</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
