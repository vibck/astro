import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/logout-button";
import { OrderButton } from "@/components/order-button";
import { ReadingCard } from "@/components/reading-card";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen px-6 py-12 relative">
      <div className="mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <Link href="/" className="font-serif text-2xl font-bold text-gradient-warm">
              Seelensprache
            </Link>
            <p className="text-earth text-sm mt-1">{user.email}</p>
          </div>
          <div className="flex gap-3">
            <OrderButton />
            <LogoutButton />
          </div>
        </div>

        {/* Content */}
        {orders && orders.length > 0 ? (
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              Deine Bestellungen
            </h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <ReadingCard key={order.id} reading={order} />
              ))}
            </div>
          </div>
        ) : (
          <div className="glass-warm-strong rounded-3xl p-12 text-center shadow-[0_8px_50px_rgba(196,134,139,0.12)]">
            {/* Decorative icon */}
            <div className="mx-auto mb-6">
              <svg className="h-16 w-16 mx-auto text-gold/40" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.6" />
                <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
                <circle cx="44" cy="18" r="2.5" fill="currentColor" opacity="0.4">
                  <animate attributeName="opacity" values="0.4;0.15;0.4" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="18" cy="40" r="2" fill="currentColor" opacity="0.3">
                  <animate attributeName="opacity" values="0.3;0.1;0.3" dur="5s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>

            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
              Willkommen bei Seelensprache
            </h2>
            <p className="text-earth mb-8 max-w-md mx-auto leading-relaxed">
              Du hast noch keine Bestellungen. Bestelle jetzt dein erstes persönliches
              Astrologie-Reading und entdecke, was die Sterne für dich bereithalten.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <OrderButton />
              <Link
                href="/#angebot"
                className="inline-flex items-center justify-center h-10 px-6 rounded-full border border-gold/30 text-gold text-sm hover:bg-gold/5 transition-colors"
              >
                Angebote ansehen
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
