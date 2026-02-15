import { redirect } from "next/navigation";
import { getStripe } from "@/lib/stripe";
import { getProduct } from "@/lib/products";
import { createClient } from "@supabase/supabase-js";
import { SuccessBirthDataForm } from "@/components/success-birth-data-form";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export default async function SuccessPage({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/");
  }

  // Verify payment with Stripe
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
  const productType = session.metadata.product_type;
  const product = getProduct(productType);

  if (!product) {
    redirect("/");
  }

  const supabaseAdmin = getSupabaseAdmin();

  // Upsert order (in case webhook hasn't fired yet)
  const { data: order } = await supabaseAdmin
    .from("orders")
    .upsert(
      {
        email,
        product_type: productType,
        status: "paid",
        stripe_session_id: session_id,
      },
      { onConflict: "stripe_session_id" }
    )
    .select("id, birth_date")
    .single();

  if (!order) {
    redirect("/");
  }

  // If birth data already filled, show confirmation
  if (order.birth_date) {
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
          <p className="text-earth">
            Deine Geburtsdaten wurden bereits gespeichert. Wir erstellen dein {product.name} und senden es dir per E-Mail an <strong>{email}</strong>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
            <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl font-bold text-gold">
            Zahlung erfolgreich!
          </h1>
          <p className="text-earth mt-2">
            Vielen Dank für deine Bestellung. Jetzt benötigen wir noch deine Geburtsdaten für dein <strong>{product.name}</strong>.
          </p>
        </div>

        <SuccessBirthDataForm
          orderId={order.id}
          productType={productType}
          email={email}
        />
      </div>
    </div>
  );
}
