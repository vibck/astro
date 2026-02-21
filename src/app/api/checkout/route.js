import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProduct } from "@/lib/products";

export async function POST(request) {
  const body = await request.json();

  // Rückwärtskompatibel: einzelnes Produkt oder Array
  let productIds;
  if (body.items && Array.isArray(body.items)) {
    productIds = body.items;
  } else if (body.product) {
    productIds = [body.product];
  } else {
    return NextResponse.json({ error: "Kein Produkt angegeben" }, { status: 400 });
  }

  // Alle Produkte validieren
  const validProducts = productIds.map((id) => getProduct(id));
  if (validProducts.some((p) => !p)) {
    return NextResponse.json({ error: "Ungültiges Produkt" }, { status: 400 });
  }

  // Maximale Warenkorbgröße begrenzen
  if (productIds.length > 10) {
    return NextResponse.json({ error: "Maximal 10 Produkte pro Bestellung" }, { status: 400 });
  }

  // line_items für Stripe erstellen
  const line_items = validProducts.map((product) => ({
    price_data: {
      currency: "eur",
      product_data: {
        name: product.name,
        description: product.description,
      },
      unit_amount: product.price,
    },
    quantity: 1,
  }));

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/`,
    custom_text: {
      submit: {
        message: "Hinweis: Nach der Bezahlung benötigen wir deine genauen Geburtsdaten (Datum, Uhrzeit und Ort). Bitte halte diese Informationen bereit.",
      },
    },
    metadata: {
      // Einzelprodukt für Rückwärtskompatibilität
      product_type: productIds[0],
      // Alle Produkte als JSON Array
      product_types: JSON.stringify(productIds),
    },
  });

  return NextResponse.json({ url: session.url });
}
