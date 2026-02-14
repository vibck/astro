import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function CheckoutSuccess({ searchParams }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { session_id } = await searchParams;

  // Check if birth data already submitted for this reading
  const { data: reading } = await supabase
    .from("readings")
    .select("id, birth_date")
    .eq("stripe_session_id", session_id)
    .single();

  // If birth data already filled, go to dashboard
  if (reading?.birth_date) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <Card className="w-full max-w-md border-gold/20 bg-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
            <svg
              className="h-8 w-8 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <CardTitle className="font-serif text-2xl text-gold">
            Zahlung erfolgreich!
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Vielen Dank für deine Bestellung. Im nächsten Schritt benötigen wir
            deine Geburtsdaten.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            asChild
            className="w-full bg-gold text-primary-foreground hover:bg-gold-light"
          >
            <Link
              href={
                reading
                  ? `/birth-data?reading_id=${reading.id}`
                  : "/dashboard"
              }
            >
              Geburtsdaten eingeben
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
