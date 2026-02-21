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
      <CardContent className="flex items-center justify-between py-5">
        <div>
          <p className="font-medium">{productName}</p>
          <p className={`text-sm ${statusColors[displayStatus] || "text-muted-foreground"}`}>
            {statusLabels[displayStatus] || displayStatus}
          </p>
          {hasBirthData && (
            <>
              <p className="text-xs text-muted-foreground mt-1">
                {reading.birth_name && <>{reading.birth_name} &middot; </>}
                {reading.birth_place} &middot;{" "}
                {new Date(reading.birth_date).toLocaleDateString("de-DE")}
                {reading.birth_time && <> &middot; {reading.birth_time} Uhr</>}
              </p>
              {reading.partner_birth_name && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {reading.partner_birth_name} &middot;{" "}
                  {reading.partner_birth_place} &middot;{" "}
                  {new Date(reading.partner_birth_date).toLocaleDateString("de-DE")}
                  {reading.partner_birth_time && <> &middot; {reading.partner_birth_time} Uhr</>}
                </p>
              )}
            </>
          )}
        </div>

        <div>
          {needsBirthData && (
            <Button
              asChild
              size="sm"
              className="bg-gold text-primary-foreground hover:bg-gold-light"
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
              className="bg-gold text-primary-foreground hover:bg-gold-light"
            >
              <a href={reading.pdf_url} target="_blank" rel="noopener noreferrer">
                PDF herunterladen
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
