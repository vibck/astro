import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BirthDataForm } from "@/components/birth-data-form";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function BirthDataPage({ searchParams }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { reading_id } = await searchParams;

  if (!reading_id) {
    redirect("/dashboard");
  }

  // Verify the order belongs to the user
  const { data: reading } = await supabase
    .from("orders")
    .select("id, birth_date")
    .eq("id", reading_id)
    .eq("user_id", user.id)
    .single();

  if (!reading) {
    redirect("/dashboard");
  }

  if (reading.birth_date) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-gold">
            Deine Geburtsdaten
          </h1>
          <p className="text-muted-foreground mt-2">
            Für die Erstellung deines persönlichen Readings benötigen wir
            folgende Angaben.
          </p>
        </div>
        <BirthDataForm readingId={reading_id} />
      </div>
    </div>
  );
}
