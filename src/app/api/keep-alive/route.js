import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

async function sendAlert(subject, message) {
  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) {
    console.error("Cannot send alert: missing RESEND_API_KEY or ADMIN_EMAIL");
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Seelensprache Alert <noreply@seelensprache-astro.de>",
      to: process.env.ADMIN_EMAIL,
      subject: `[Seelensprache] ${subject}`,
      text: `${message}\n\nZeitpunkt: ${new Date().toISOString()}\n\nBitte umgehend prüfen.`,
    });
  } catch (err) {
    console.error("Alert email failed:", err);
  }
}

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { count, error } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true });

    if (error) {
      await sendAlert(
        "Keep-Alive: Supabase Fehler",
        `Der tägliche Keep-Alive-Check hat einen Datenbank-Fehler ergeben:\n\n${error.message}\n\nDie Supabase-Datenbank könnte pausiert sein. Bitte sofort im Dashboard prüfen: https://supabase.com/dashboard`,
      );
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, count, timestamp: new Date().toISOString() });
  } catch (err) {
    await sendAlert(
      "Keep-Alive: Unerwarteter Fehler",
      `Der Keep-Alive-Endpoint hat eine Exception geworfen:\n\n${err?.message || String(err)}`,
    );
    return NextResponse.json({ ok: false, error: err?.message || "unknown" }, { status: 500 });
  }
}
