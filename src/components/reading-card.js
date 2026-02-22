import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProduct } from "@/lib/products";

const statusLabels = {
  pending: "Ausstehend",
  paid: "Bezahlt — Geburtsdaten fehlen",
  processing: "In Bearbeitung",
  completed: "Fertig",
};

const statusColors = {
  pending: "text-muted-foreground",
  paid: "text-gold",
  processing: "text-gold-light",
  completed: "text-green-400",
};

export function ReadingCard({ reading }) {
  const product = getProduct(reading.product_type);
  const productName = product?.name || "Reading";

  // Wenn Geburtsdaten vorhanden aber Status noch "paid", zeige korrekten Status
  const hasBirthData = !!reading.birth_date;
  const displayStatus = reading.status === "paid" && hasBirthData ? "processing" : reading.status;
  const needsBirthData = reading.status === "paid" && !hasBirthData;

  return (
    <Card className="border-border bg-card">
      <CardContent className="py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="min-w-0">
            <p className="font-medium">{productName}</p>
            <p className={`text-sm ${statusColors[displayStatus] || "text-muted-foreground"}`}>
              {statusLabels[displayStatus] || displayStatus}
            </p>
            {hasBirthData && (
              <>
                <p className="text-xs text-muted-foreground mt-1">
                  {reading.birth_name && <><span className="font-semibold text-foreground/80">{reading.birth_name}</span> &middot; </>}
                  {reading.birth_place} &middot;{" "}
                  {new Date(reading.birth_date).toLocaleDateString("de-DE")}
                  {reading.birth_time && <> &middot; {reading.birth_time} Uhr</>}
                </p>
                {reading.partner_birth_name && (
                  <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border/50">
                    <span className="font-semibold text-foreground/80">{reading.partner_birth_name}</span> &middot;{" "}
                    {reading.partner_birth_place} &middot;{" "}
                    {new Date(reading.partner_birth_date).toLocaleDateString("de-DE")}
                    {reading.partner_birth_time && <> &middot; {reading.partner_birth_time} Uhr</>}
                  </p>
                )}
              </>
            )}
          </div>

          <div className="shrink-0">
            {needsBirthData && (
              <Button
                asChild
                size="sm"
                className="bg-gold text-primary-foreground hover:bg-gold-light w-full sm:w-auto"
              >
                <Link href={`/birth-data?reading_id=${reading.id}`}>
                  Daten eingeben
                </Link>
              </Button>
            )}
            {reading.status === "completed" && reading.pdf_url && (
              <Button
                asChild
                size="sm"
                className="bg-gold text-primary-foreground hover:bg-gold-light w-full sm:w-auto"
              >
                <a href={reading.pdf_url} target="_blank" rel="noopener noreferrer">
                  PDF herunterladen
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
