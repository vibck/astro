import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/logout-button";
import { OrderButton } from "@/components/order-button";
import { ReadingCard } from "@/components/reading-card";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: readings } = await supabase
    .from("readings")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-gold">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">{user.email}</p>
          </div>
          <div className="flex gap-3">
            <OrderButton />
            <LogoutButton />
          </div>
        </div>

        {readings && readings.length > 0 ? (
          <div className="space-y-4">
            {readings.map((reading) => (
              <ReadingCard key={reading.id} reading={reading} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground mb-4">
              Du hast noch keine Readings. Bestelle jetzt dein erstes!
            </p>
            <OrderButton />
          </div>
        )}
      </div>
    </div>
  );
}
