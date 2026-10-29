import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request) {
  const { orderId } = await request.json();

  // Nur mit gültiger Bestell-ID prüfbar, damit niemand beliebige E-Mails abfragen kann
  if (!orderId || !uuidRegex.test(orderId)) {
    return NextResponse.json({ exists: false });
  }

  const supabaseAdmin = getSupabaseAdmin();

  const { data: order } = await supabaseAdmin
    .from("orders")
    .select("email")
    .eq("id", orderId)
    .single();

  if (!order?.email) {
    return NextResponse.json({ exists: false });
  }

  // Suche nach User mit exakt dieser E-Mail
  // listUsers filter matcht teilweise fuzzy, daher zusätzlich exakten Vergleich
  const { data } = await supabaseAdmin.auth.admin.listUsers({
    filter: `email.eq.${order.email}`,
    page: 1,
    perPage: 10,
  });

  const exists = data?.users?.some((u) => u.email === order.email) ?? false;
  return NextResponse.json({ exists });
}
