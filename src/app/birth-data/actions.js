"use server";

import { createClient } from "@/lib/supabase/server";

export async function saveBirthData({
  readingId,
  birthDate,
  birthTime,
  birthPlace,
  birthCoords,
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Nicht angemeldet." };
  }

  const { error } = await supabase
    .from("readings")
    .update({
      birth_date: birthDate,
      birth_time: birthTime,
      birth_place: birthPlace,
      birth_coords: birthCoords,
      status: "processing",
      updated_at: new Date().toISOString(),
    })
    .eq("id", readingId)
    .eq("user_id", user.id);

  if (error) {
    return { error: "Fehler beim Speichern. Bitte versuche es erneut." };
  }

  return { success: true };
}
