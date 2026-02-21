import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

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
