import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  const stripe = getStripe();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const supabaseAdmin = getSupabaseAdmin();
    const email = session.customer_details.email;

    // Produkt-Typen auslesen: neues Format (JSON Array) oder altes Format (einzelner String)
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

    // Eine Order pro Produkt erstellen
    for (let i = 0; i < productTypes.length; i++) {
      const { error } = await supabaseAdmin
        .from("orders")
        .insert({
          email,
          product_type: productTypes[i],
          status: "paid",
          stripe_session_id: session.id,
          cart_item_index: i,
        });

      if (error) {
        // Falls die Order schon existiert (z.B. durch Success Page upsert), ignorieren
        if (error.code === "23505") {
          console.log(`Order already exists for session ${session.id} index ${i}`);
        } else {
          console.error(`Failed to insert order ${i}:`, error);
          return NextResponse.json(
            { error: "Database error" },
            { status: 500 }
          );
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
