import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ exists: false });
  }

  const supabaseAdmin = getSupabaseAdmin();

  // Suche nach User mit exakt dieser E-Mail
  // listUsers filter matcht teilweise fuzzy, daher zusätzlich exakten Vergleich
  const { data } = await supabaseAdmin.auth.admin.listUsers({
    filter: `email.eq.${email}`,
    page: 1,
    perPage: 10,
  });

  const exists = data?.users?.some((u) => u.email === email) ?? false;
  return NextResponse.json({ exists });
}
