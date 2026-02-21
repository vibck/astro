# Seelensprache – Projektkontext

## Übersicht
Astrologie-Plattform von Patricia Beck. Kunden kaufen Readings via Guest Checkout (Stripe), geben Geburtsdaten ein, erhalten PDF per E-Mail. Detaillierte Spezifikation in `blueprint.md`.

## Tech-Stack
- **Next.js 16** (App Router, JavaScript/JSX – KEIN TypeScript)
- **Tailwind CSS v4** (`@theme inline` CSS-Variablen) + **shadcn/ui**
- **Supabase** (PostgreSQL, Auth, Storage)
- **Stripe** (Guest Checkout)
- **Vercel** (Hosting)

## Wichtige Konventionen
- Sprache im Code: Englisch (Variablen, Funktionen), Deutsch (UI-Texte, Kommentare)
- Design: "Rosé-Warm" Farbschema – Cream, Gold, Rose, Sand, Earth Töne
- Glassmorphism-Effekte: `glass-warm`, `glass-warm-strong`
- Gradient-Text: `text-gradient-warm`
- **Markenname "Seelensprache"**: Immer mit Dancing Script Font (`--font-dancing-script`) + `text-gradient-warm`
- **Logo**: `public/logo.png` (transparent PNG, aus logo.jpeg generiert). Navbar: h-28 -my-9, Footer: h-20 -my-5
- Alle rechtlichen Seiten folgen dem gleichen Layout-Pattern (Logo+Navbar + glass-warm-strong Card)
- Produkt-Definitionen zentral in `src/lib/products.js`
- Middleware deprecated-Warnung in Next.js 16 ist bekannt – Migration auf `proxy` erst wenn Supabase SSR es unterstützt

## Aktuelle Preise
- Seelenkarte: 79€ (Kinder-Horoskop)
- Seelenspiegel: 99€ (Geburtshoroskop)
- Seelenkompass: 129€ (Partner-Synastrie)

## Checkout-Flow
1. Kunde wählt Produkt → Stripe Checkout (mit Hinweis zu Geburtsdaten)
2. Nach Zahlung → `/success?session_id=...` → "Nur noch ein Schritt!" + Geburtsdaten-Formular
3. Wenn Account mit E-Mail existiert → wird automatisch zugeordnet, kein Passwort-Feld
4. Wenn neuer Kunde → optional Passwort für Account-Erstellung
5. Nach Submit → "Vielen Dank!" Bestätigung

## Offene Aufgaben
- **Über-mich-Seite:** Profilbild eingebaut, Platzhalter-Texte müssen noch durch Patricias echte Texte ersetzt werden
- **Phase 11:** Supabase Dashboard konfigurieren (Site URL, Redirect URLs für Produktion)
- **Phase 12:** Vercel Deployment & Stripe Live-Keys

## MCP-Server (global konfiguriert)
Supabase, Stripe, Playwright, Next.js Devtools, Context7, GitHub

## Dev-Server
```bash
npm run dev  # http://localhost:3000
```

## Git
- Branch: `feature/redesign-v2`
- Main-Branch: `master`
- Remote: `vibck/astro` auf GitHub
