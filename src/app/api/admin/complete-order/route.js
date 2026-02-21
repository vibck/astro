import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getProduct } from "@/lib/products";
import { sendReadingCompleteEmail } from "@/lib/email";

export async function POST(request) {
  // Auth-Check: nur Admins
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  // Admin-Check
  const supabaseAdmin = getSupabaseAdmin();
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    return NextResponse.json({ error: "Keine Admin-Berechtigung." }, { status: 403 });
  }

  const { orderId, pdfUrl } = await request.json();

  if (!orderId || !pdfUrl) {
    return NextResponse.json({ error: "Fehlende Parameter." }, { status: 400 });
  }

  // Order laden
  const { data: order, error: fetchError } = await supabaseAdmin
    .from("orders")
    .select("id, email, product_type, status")
    .eq("id", orderId)
    .single();

  if (fetchError || !order) {
    return NextResponse.json({ error: "Bestellung nicht gefunden." }, { status: 404 });
  }

  // Status auf completed setzen
  const { error: updateError } = await supabaseAdmin
    .from("orders")
    .update({
      pdf_url: pdfUrl,
      status: "completed",
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId);

  if (updateError) {
    return NextResponse.json({ error: "Status-Update fehlgeschlagen." }, { status: 500 });
  }

  // Kunden-E-Mail senden
  const product = getProduct(order.product_type);
  const productName = product?.name || "Reading";
  await sendReadingCompleteEmail(order.email, productName, pdfUrl);

  return NextResponse.json({ success: true });
}
