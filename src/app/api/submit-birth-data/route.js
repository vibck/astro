import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getProduct } from "@/lib/products";
import { sendNewOrderNotification } from "@/lib/email";

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

  // Validate UUID format for orderId
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(orderId)) {
    return NextResponse.json({ error: "Ungültige Bestell-ID." }, { status: 400 });
  }

  // Validate coordinate ranges
  if (
    typeof birthCoords.lat !== "number" || typeof birthCoords.lng !== "number" ||
    birthCoords.lat < -90 || birthCoords.lat > 90 ||
    birthCoords.lng < -180 || birthCoords.lng > 180
  ) {
    return NextResponse.json({ error: "Ungültige Koordinaten." }, { status: 400 });
  }

  // Validate date format (YYYY-MM-DD)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate) || isNaN(Date.parse(birthDate))) {
    return NextResponse.json({ error: "Ungültiges Datumsformat." }, { status: 400 });
  }

  // Validate time format (HH:MM)
  if (!/^\d{2}:\d{2}$/.test(birthTime)) {
    return NextResponse.json({ error: "Ungültiges Zeitformat." }, { status: 400 });
  }

  // Sanitize string inputs (limit length)
  if (birthName.length > 100 || birthPlace.length > 300) {
    return NextResponse.json({ error: "Eingabe zu lang." }, { status: 400 });
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
    // Validate partner data
    if (!partnerBirthDate || !partnerBirthTime || !partnerBirthPlace || !partnerBirthCoords) {
      return NextResponse.json({ error: "Fehlende Partner-Pflichtfelder." }, { status: 400 });
    }
    if (
      typeof partnerBirthCoords.lat !== "number" || typeof partnerBirthCoords.lng !== "number" ||
      partnerBirthCoords.lat < -90 || partnerBirthCoords.lat > 90 ||
      partnerBirthCoords.lng < -180 || partnerBirthCoords.lng > 180
    ) {
      return NextResponse.json({ error: "Ungültige Partner-Koordinaten." }, { status: 400 });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(partnerBirthDate) || isNaN(Date.parse(partnerBirthDate))) {
      return NextResponse.json({ error: "Ungültiges Partner-Datumsformat." }, { status: 400 });
    }
    if (!/^\d{2}:\d{2}$/.test(partnerBirthTime)) {
      return NextResponse.json({ error: "Ungültiges Partner-Zeitformat." }, { status: 400 });
    }
    if (partnerBirthName.length > 100 || partnerBirthPlace.length > 300) {
      return NextResponse.json({ error: "Partner-Eingabe zu lang." }, { status: 400 });
    }

    updateData.partner_birth_name = partnerBirthName;
    updateData.partner_birth_date = partnerBirthDate;
    updateData.partner_birth_time = partnerBirthTime;
    updateData.partner_birth_place = partnerBirthPlace;
    updateData.partner_birth_coords = partnerBirthCoords;
  }

  // Prüfe ob schon ein Account mit dieser E-Mail existiert
  const orderEmail = email || existingOrder.email;
  let userId = null;

  // listUsers filter matcht teilweise fuzzy, daher exakten Vergleich
  const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers({
    filter: `email.eq.${orderEmail}`,
    page: 1,
    perPage: 10,
  });
  const existingUser = existingUsers?.users?.find((u) => u.email === orderEmail);

  if (existingUser) {
    // Account existiert schon → Order diesem User zuordnen
    userId = existingUser.id;
  } else if (password && orderEmail) {
    // Neuen Account erstellen (nur wenn noch keiner existiert)
    const { data: userData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: orderEmail,
      password,
      email_confirm: true,
    });

    if (authError) {
      console.error("Account creation failed:", authError.message);
      return NextResponse.json(
        { error: "Account konnte nicht erstellt werden. Bitte versuche es erneut." },
        { status: 400 }
      );
    } else if (userData?.user) {
      userId = userData.user.id;
    }
  }

  if (userId) {
    updateData.user_id = userId;

    // Marketing consent im Profil speichern
    if (marketingConsent) {
      await supabaseAdmin
        .from("profiles")
        .update({ marketing_consent: true })
        .eq("id", userId);
    }
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

  // Admin per E-Mail über neue Bestellung benachrichtigen
  const { data: updatedOrder } = await supabaseAdmin
    .from("orders")
    .select("email, product_type, birth_name, birth_date, birth_time, birth_place, partner_birth_name, partner_birth_date, partner_birth_time, partner_birth_place")
    .eq("id", orderId)
    .single();

  if (updatedOrder) {
    const product = getProduct(updatedOrder.product_type);
    const productName = product?.name || "Reading";
    // Fire-and-forget — Fehler werden geloggt aber blockieren nicht die Response
    sendNewOrderNotification(updatedOrder, productName);
  }

  return NextResponse.json({ success: true });
}
