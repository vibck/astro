import { redirect } from "next/navigation";
import { getStripe } from "@/lib/stripe";
import { getProduct } from "@/lib/products";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { SuccessMultiForm } from "@/components/success-multi-form";
import { Button } from "@/components/ui/button";

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

  // Produkt-Typen aus Metadata lesen
  let productTypes;
  if (session.metadata.product_types) {
    try {
      productTypes = JSON.parse(session.metadata.product_types);
    } catch {
      productTypes = [session.metadata.product_type];
    }
  } else {
    productTypes = [session.metadata.product_type];
  }

  // Alle Produkte validieren
  if (productTypes.some((pt) => !getProduct(pt))) {
    redirect("/");
  }

  const supabaseAdmin = getSupabaseAdmin();

  // Orders für diese Session anlegen (falls Webhook noch nicht gefeuert hat)
  for (let i = 0; i < productTypes.length; i++) {
    // Erst prüfen ob Order schon existiert
    const { data: existing } = await supabaseAdmin
      .from("orders")
      .select("id")
      .eq("stripe_session_id", session_id)
      .eq("cart_item_index", i)
      .maybeSingle();

    if (!existing) {
      await supabaseAdmin
        .from("orders")
        .insert({
          email,
          product_type: productTypes[i],
          status: "paid",
          stripe_session_id: session_id,
          cart_item_index: i,
        });
    }
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
