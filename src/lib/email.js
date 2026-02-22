import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Seelensprache <noreply@seelensprache-astro.de>";

// Farben passend zur Website
const colors = {
  cream: "#FFF8F5",
  creamDark: "#F9EDE8",
  sand: "#F0DDD6",
  gold: "#C4868B",
  goldLight: "#D4A0A4",
  rose: "#B87D82",
  roseDeep: "#8B5A60",
  blush: "#E8BFC2",
  earth: "#9B7B80",
  text: "#6B4C52",
  textMuted: "#9B7B80",
};

// Gemeinsames HTML-Layout — warm, persönlich, passend zur Website
function emailLayout(content) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seelensprache-astro.de";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>
<body style="margin:0;padding:0;background-color:${colors.cream};font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.cream};padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 8px 40px rgba(196,134,139,0.15);">
          <!-- Header -->
          <tr>
            <td style="background:${colors.creamDark};padding:48px 40px;text-align:center;">
              <img src="${siteUrl}/email-header.png" alt="Seelensprache" width="240" style="display:block;margin:0 auto;height:auto;" />
            </td>
          </tr>
          <!-- Rosé Trennlinie -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,transparent,${colors.blush},${colors.gold},${colors.blush},transparent);"></td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:40px 44px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:28px 44px;background-color:${colors.creamDark};text-align:center;">
              <p style="margin:0 0 4px;color:${colors.gold};font-size:16px;font-style:italic;">
                Alles Liebe & sternenklare Grüße
              </p>
              <p style="margin:0;color:${colors.earth};font-size:14px;">
                Patricia von Seelensprache
              </p>
              <p style="margin:12px 0 0;font-size:18px;letter-spacing:4px;color:${colors.blush};">&#9734; &#9734; &#9734;</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Benachrichtigt Patricia über eine neue Bestellung mit Geburtsdaten
 */
export async function sendNewOrderNotification(order, productName) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || !process.env.RESEND_API_KEY) return;

  const partnerSection = order.partner_birth_name
    ? `
      <tr>
        <td style="padding:8px 0;border-top:1px solid ${colors.sand};" colspan="2">
          <strong style="color:${colors.rose};">Partner-Daten</strong>
        </td>
      </tr>
      <tr><td style="color:${colors.textMuted};padding:4px 0;">Name:</td><td style="padding:4px 0;">${order.partner_birth_name}</td></tr>
      <tr><td style="color:${colors.textMuted};padding:4px 0;">Geburtsdatum:</td><td style="padding:4px 0;">${order.partner_birth_date} um ${order.partner_birth_time || "—"}</td></tr>
      <tr><td style="color:${colors.textMuted};padding:4px 0;">Geburtsort:</td><td style="padding:4px 0;">${order.partner_birth_place || "—"}</td></tr>`
    : "";

  const html = emailLayout(`
    <h2 style="margin:0 0 20px;color:${colors.rose};font-size:22px;font-weight:normal;">
      &#10024; Neue Bestellung eingegangen
    </h2>
    <table style="width:100%;font-size:15px;color:${colors.text};line-height:1.8;">
      <tr><td style="color:${colors.textMuted};padding:4px 0;width:140px;">Produkt:</td><td style="padding:4px 0;"><strong>${productName}</strong></td></tr>
      <tr><td style="color:${colors.textMuted};padding:4px 0;">E-Mail:</td><td style="padding:4px 0;">${order.email}</td></tr>
      <tr>
        <td style="padding:12px 0 8px;border-top:1px solid ${colors.sand};" colspan="2">
          <strong style="color:${colors.rose};">Geburtsdaten</strong>
        </td>
      </tr>
      <tr><td style="color:${colors.textMuted};padding:4px 0;">Name:</td><td style="padding:4px 0;">${order.birth_name}</td></tr>
      <tr><td style="color:${colors.textMuted};padding:4px 0;">Geburtsdatum:</td><td style="padding:4px 0;">${order.birth_date} um ${order.birth_time}</td></tr>
      <tr><td style="color:${colors.textMuted};padding:4px 0;">Geburtsort:</td><td style="padding:4px 0;">${order.birth_place}</td></tr>
      ${partnerSection}
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
      <tr>
        <td align="center">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://seelensprache-astro.de"}/admin" style="display:inline-block;background:${colors.gold};color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:50px;font-size:15px;letter-spacing:0.5px;">
            Im Admin-Dashboard öffnen
          </a>
        </td>
      </tr>
    </table>
  `);

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: adminEmail,
      subject: `Neue Bestellung: ${productName} — ${order.birth_name}`,
      html,
    });
  } catch (err) {
    console.error("Admin-E-Mail konnte nicht gesendet werden:", err.message);
  }
}

/**
 * Informiert den Kunden, dass sein Reading fertig ist
 */
export async function sendReadingCompleteEmail(email, productName, pdfUrl) {
  if (!process.env.RESEND_API_KEY) return;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seelensprache-astro.de";

  const html = emailLayout(`
    <p style="color:${colors.goldLight};font-size:14px;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;text-align:center;">
      &#10025; Wundervolle Neuigkeiten &#10025;
    </p>
    <h2 style="margin:0 0 24px;color:${colors.roseDeep};font-size:24px;font-weight:normal;text-align:center;">
      Dein <em>${productName}</em> ist bereit
    </h2>
    <div style="background:linear-gradient(135deg,${colors.cream},${colors.creamDark});border-radius:16px;padding:28px;margin:0 0 28px;border:1px solid ${colors.sand};">
      <p style="color:${colors.text};font-size:16px;line-height:1.9;margin:0;text-align:center;">
        Dein persönliches Reading wurde mit viel Hingabe und kosmischer Inspiration für dich erstellt.
        Die Sterne haben so einiges zu erzählen!
      </p>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <a href="${pdfUrl}" style="display:inline-block;background:${colors.gold};color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:50px;font-size:17px;letter-spacing:1px;box-shadow:0 4px 20px rgba(184,125,130,0.3);">
            &#10024;&ensp;Dein Reading herunterladen
          </a>
        </td>
      </tr>
    </table>
    <p style="color:${colors.textMuted};font-size:13px;margin:28px 0 0;text-align:center;line-height:1.7;">
      Du kannst dein Reading auch jederzeit in deinem
      <a href="${siteUrl}/dashboard" style="color:${colors.rose};text-decoration:underline;">persönlichen Bereich</a>
      herunterladen.
    </p>
  `);

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Dein ${productName} ist bereit — Seelensprache`,
      html,
    });
  } catch (err) {
    console.error("Kunden-E-Mail konnte nicht gesendet werden:", err.message);
  }
}
