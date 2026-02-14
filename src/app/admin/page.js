import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminReadingCard } from "@/components/admin-reading-card";
import { LogoutButton } from "@/components/logout-button";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check admin status
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    redirect("/dashboard");
  }

  // Get all readings with user info
  const { data: readings } = await supabase
    .from("readings")
    .select("*, profiles(email, full_name)")
    .order("created_at", { ascending: false });

  const statusOrder = { paid: 0, processing: 1, completed: 2, pending: 3 };
  const sorted = readings?.sort(
    (a, b) => (statusOrder[a.status] ?? 4) - (statusOrder[b.status] ?? 4)
  );

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-gold">
              Admin-Bereich
            </h1>
            <p className="text-muted-foreground mt-1">
              {readings?.length || 0} Bestellungen
            </p>
          </div>
          <LogoutButton />
        </div>

        {sorted && sorted.length > 0 ? (
          <div className="space-y-4">
            {sorted.map((reading) => (
              <AdminReadingCard key={reading.id} reading={reading} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              Noch keine Bestellungen eingegangen.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
