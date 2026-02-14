import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <Card className="border-border bg-card">
      <CardContent className="flex items-center justify-between py-5">
        <div>
          <p className="font-medium">Geburtshoroskop Reading</p>
          <p className={`text-sm ${statusColors[reading.status] || "text-muted-foreground"}`}>
            {statusLabels[reading.status] || reading.status}
          </p>
          {reading.birth_date && (
            <p className="text-xs text-muted-foreground mt-1">
              {reading.birth_place} &middot;{" "}
              {new Date(reading.birth_date).toLocaleDateString("de-DE")}
            </p>
          )}
        </div>

        <div>
          {reading.status === "paid" && (
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
