import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ exists: false });
  }

  const supabaseAdmin = getSupabaseAdmin();

  // Suche gezielt nach User mit dieser E-Mail (max 1 Ergebnis)
  const { data } = await supabaseAdmin.auth.admin.listUsers({
    filter: `email.eq.${email}`,
    page: 1,
    perPage: 1,
  });

  const exists = data?.users?.length > 0;
  return NextResponse.json({ exists });
}
