import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProduct } from "@/lib/products";

export async function POST(request) {
  const body = await request.json();
  const { product } = body;

  const productData = getProduct(product);
  if (!productData) {
    return NextResponse.json({ error: "Ungültiges Produkt" }, { status: 400 });
  }

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: productData.name,
            description: productData.description,
          },
          unit_amount: productData.price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/`,
    custom_text: {
      submit: {
        message: "Hinweis: Nach der Bezahlung benötigen wir deine genauen Geburtsdaten (Datum, Uhrzeit und Ort). Bitte halte diese Informationen bereit.",
      },
    },
    metadata: {
      product_type: product,
    },
  });

  return NextResponse.json({ url: session.url });
}
