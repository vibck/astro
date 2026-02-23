import { redirect } from "next/navigation";
import { getStripe } from "@/lib/stripe";
import { getProduct, getProductTypesFromMetadata } from "@/lib/products";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { SuccessMultiForm } from "@/components/success-multi-form";
import { Button } from "@/components/ui/button";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function SuccessPage({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/");
  }

  // Zahlung mit Stripe verifizieren
  const stripe = getStripe();
  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch {
    redirect("/");
  }

  if (session.payment_status !== "paid") {
    redirect("/");
  }

  const email = session.customer_details.email;

  const productTypes = getProductTypesFromMetadata(session.metadata);

  // Alle Produkte validieren
  if (productTypes.some((pt) => !getProduct(pt))) {
    redirect("/");
  }

  const supabaseAdmin = getSupabaseAdmin();

  // Prüfen welche Orders schon existieren (ein Query statt N)
  const { data: existingOrders } = await supabaseAdmin
    .from("orders")
    .select("cart_item_index")
    .eq("stripe_session_id", session_id);

  const existingIndices = new Set((existingOrders || []).map((o) => o.cart_item_index));

  // Fehlende Orders in einem Batch anlegen (falls Webhook noch nicht gefeuert hat)
  const missingOrders = productTypes
    .map((pt, i) => ({ email, product_type: pt, status: "paid", stripe_session_id: session_id, cart_item_index: i }))
    .filter((o) => !existingIndices.has(o.cart_item_index));

  if (missingOrders.length > 0) {
    await supabaseAdmin.from("orders").insert(missingOrders);
  }

  // Alle Orders für diese Session laden
  const { data: orders } = await supabaseAdmin
    .from("orders")
    .select("id, product_type, birth_date, cart_item_index")
    .eq("stripe_session_id", session_id)
    .order("cart_item_index", { ascending: true });

  if (!orders || orders.length === 0) {
    redirect("/");
  }

  // Prüfe ob ALLE Orders bereits Geburtsdaten haben
  const allComplete = orders.every((o) => o.birth_date);

  if (allComplete) {
    const productNames = orders.map((o) => getProduct(o.product_type)?.name).filter(Boolean).join(", ");
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md glass-warm-strong rounded-3xl p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
            <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-serif text-2xl font-bold text-gold mb-2">
            Bereits eingegeben
          </h1>
          <p className="text-earth mb-6">
            Deine Geburtsdaten wurden bereits gespeichert. Wir erstellen dein {productNames} und senden es dir per E-Mail an <strong>{email}</strong>.
          </p>
          <Button
            asChild
            className="bg-gold text-white hover:bg-gold-light rounded-full px-8 glow-gold-warm"
          >
            <a href="/">Zurück zur Startseite</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <SuccessMultiForm
          orders={orders.map((o) => ({ id: o.id, productType: o.product_type, hasBirthData: !!o.birth_date }))}
          email={email}
        />
      </div>
    </div>
  );
}
