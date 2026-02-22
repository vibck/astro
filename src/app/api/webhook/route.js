import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getProductTypesFromMetadata } from "@/lib/products";

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

    const productTypes = getProductTypesFromMetadata(session.metadata);

    // Alle Orders in einem Batch erstellen
    const orderRows = productTypes.map((pt, i) => ({
      email,
      product_type: pt,
      status: "paid",
      stripe_session_id: session.id,
      cart_item_index: i,
    }));

    const { error } = await supabaseAdmin.from("orders").insert(orderRows);

    if (error) {
      // Falls Orders schon existieren (z.B. durch Success Page), ignorieren
      if (error.code === "23505") {
        console.log(`Orders already exist for session ${session.id}`);
      } else {
        console.error("Failed to insert orders:", error);
        return NextResponse.json(
          { error: "Database error" },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
