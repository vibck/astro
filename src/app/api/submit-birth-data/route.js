import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function POST(request) {
  const body = await request.json();
  const {
    orderId,
    birthName,
    birthDate,
    birthTime,
    birthPlace,
    birthCoords,
    partnerBirthName,
    partnerBirthDate,
    partnerBirthTime,
    partnerBirthPlace,
    partnerBirthCoords,
    password,
    email,
    marketingConsent,
  } = body;

  if (!orderId || !birthName || !birthDate || !birthTime || !birthPlace || !birthCoords) {
    return NextResponse.json({ error: "Fehlende Pflichtfelder." }, { status: 400 });
  }

  const supabaseAdmin = getSupabaseAdmin();

  // Verify order exists and birth_date is not yet set
  const { data: existingOrder } = await supabaseAdmin
    .from("orders")
    .select("id, birth_date, email")
    .eq("id", orderId)
    .single();

  if (!existingOrder) {
    return NextResponse.json({ error: "Bestellung nicht gefunden." }, { status: 404 });
  }

  if (existingOrder.birth_date) {
    return NextResponse.json({ error: "Geburtsdaten wurden bereits eingegeben." }, { status: 400 });
  }

  // Build update payload
  const updateData = {
    birth_name: birthName,
    birth_date: birthDate,
    birth_time: birthTime,
    birth_place: birthPlace,
    birth_coords: birthCoords,
    marketing_consent: marketingConsent || false,
    status: "processing",
    updated_at: new Date().toISOString(),
  };

  // Partner data (Seelenkompass)
  if (partnerBirthName) {
    updateData.partner_birth_name = partnerBirthName;
    updateData.partner_birth_date = partnerBirthDate;
    updateData.partner_birth_time = partnerBirthTime;
    updateData.partner_birth_place = partnerBirthPlace;
    updateData.partner_birth_coords = partnerBirthCoords;
  }

  // Optional: create user account
  let userId = null;
  if (password && email) {
    const { data: userData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) {
      // User may already exist — that's OK, just skip account creation
      if (!authError.message.includes("already")) {
        return NextResponse.json(
          { error: "Account konnte nicht erstellt werden: " + authError.message },
          { status: 400 }
        );
      }
    } else if (userData?.user) {
      userId = userData.user.id;

      // Update marketing consent in profile
      if (marketingConsent) {
        await supabaseAdmin
          .from("profiles")
          .update({ marketing_consent: true })
          .eq("id", userId);
      }
    }
  }

  if (userId) {
    updateData.user_id = userId;
  }

  const { error: updateError } = await supabaseAdmin
    .from("orders")
    .update(updateData)
    .eq("id", orderId);

  if (updateError) {
    return NextResponse.json(
      { error: "Fehler beim Speichern. Bitte versuche es erneut." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
