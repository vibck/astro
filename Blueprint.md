# Projekt-Spezifikation: Seelensprache – Astrologie-Plattform



## 1. Vision & Ziel

**Seelensprache** ist eine exklusive, hochperformante Web-App für persönliche Astrologie-Readings.

- **User-Erfahrung:** Der Kunde bestellt ein Reading (ohne Anmeldung), gibt nach der Zahlung seine Geburtsdaten an und erhält das fertige PDF per E-Mail. Optional kann ein Account erstellt werden.
- **Workflow:** Die Berechnungen erfolgen extern (via Astro-Seek durch die Expertin), die Plattform dient als professionelles Verkaufs-, Datenabfrage- und Auslieferungs-Tool.



## 2. Tech-Stack

- **Framework:** Next.js 16 (App Router, JavaScript/JSX – kein TypeScript)
- **Styling:** Tailwind CSS v4 (`@theme inline` CSS-Variablen) + shadcn/ui Komponenten
- **Datenbank & Backend:** Supabase (PostgreSQL)
- **Authentifizierung:** Supabase Auth (E-Mail + Passwort, optionale Account-Erstellung nach Kauf)
- **Datei-Speicher:** Supabase Storage (für den Upload der PDF-Readings)
- **Zahlungen:** Stripe Checkout (Guest Checkout, nur E-Mail bei Stripe)
- **Hosting:** Vercel (Free Tier)



## 3. Produkte / Angebote

| Produkt | ID | Preis | FormType | Beschreibung |
|---|---|---|---|---|
| Seelenspiegel | `seelenspiegel` | 49 € | single | Persönliche Geburtshoroskop-Deutung mit Sonne, Mond, Aszendent und allen Planetenpositionen |
| Seelenkarte | `seelenkarte` | 39 € | single | Einfühlsame Deutung der Geburtskonstellation deines Kindes |
| Seelenkompass | `seelenkompass` | 59 € | partner | Synastrie-Analyse eurer Geburtshoroskope mit Stärken und Herausforderungen |

Zentrale Produkt-Definition in `src/lib/products.js`.



## 4. Daten-Struktur (Supabase Tabellen)

**profiles:**
- `id` (uuid, primary key)
- `email` (text)
- `full_name` (text)
- `is_admin` (boolean)
- `marketing_consent` (boolean)
- `created_at` (timestamp)

**orders:**
- `id` (uuid, primary key)
- `email` (text, nicht-null)
- `product_type` (text, check: seelenspiegel/seelenkarte/seelenkompass)
- `status` (text: pending/paid/processing/completed)
- `stripe_session_id` (text, unique)
- `birth_name` (text)
- `birth_date` (date)
- `birth_time` (time)
- `birth_place` (text)
- `birth_coords` (jsonb – lat/lng)
- `partner_birth_name` (text) – nur Seelenkompass
- `partner_birth_date` (date)
- `partner_birth_time` (time)
- `partner_birth_place` (text)
- `partner_birth_coords` (jsonb)
- `user_id` (uuid, nullable – Gäste haben keinen Account)
- `marketing_consent` (boolean)
- `pdf_url` (text)
- `created_at`, `updated_at` (timestamp)

**RLS-Policies:**
- User sehen/bearbeiten eigene Orders (via `user_id`)
- Admins sehen/bearbeiten alle Orders

**Legacy:** `readings` Tabelle existiert noch für alte Daten.



## 5. Design-Vorgaben ("Rosé-Warm")

- **Farbpalette:** Warmes Rosé-Farbschema mit Creme-, Gold-, Sand- und Rosétönen
  - Cream: `#FFF8F5` (Hintergrund)
  - Gold: `#C4868B` (Primär-Akzent)
  - Rose: `#E8B4B8` (Sekundär-Akzent)
  - Sand: `#E8D5C4`
  - Earth: `#8B6F6F` (Text-Akzent)
  - Foreground: `#4A2E34` (Headlines)
- **Ästhetik:** Elegante Serif-Headlines, Glassmorphism-Effekte (`glass-warm`), weiche Farbverläufe (`text-gradient-warm`), subtile Animationen
- **Hintergrund:** Aquarell-Händebild als Hero-Background mit CSS `mask-image` für nahtlosen Übergang, dynamische Hintergrund-Highlights (Sterne, Shooting Stars, Partikel) über die gesamte Seite
- **UI-Komponenten:** shadcn/ui für Cards, Formulare und Buttons



## 6. Checkout-Flow (Guest Checkout)

```
Landingpage → "Jetzt bestellen" → Stripe (nur E-Mail) → /success → Geburtsdaten + opt. Account → Fertig
```

1. **Landingpage:** Produktkarten mit "Jetzt bestellen" Button
2. **Checkout API** (`/api/checkout`): Erstellt Stripe Session ohne Auth, setzt `metadata.product_type`
3. **Stripe:** Sammelt E-Mail und Zahlungsdaten
4. **Webhook** (`/api/webhook`): Erstellt Order in DB bei `checkout.session.completed`
5. **Success Page** (`/success`): Verifiziert Stripe Session, upserted Order (Race Condition mit Webhook), zeigt Geburtsdaten-Formular
6. **Submit Birth Data** (`/api/submit-birth-data`): Speichert Geburtsdaten, optional Account-Erstellung via `supabase.auth.admin.createUser()`



## 7. Seitenstruktur

### Landingpage (`/`)
- **Navbar:** Sticky, halbtransparent (`bg-white/80 backdrop-blur-xl`), zeigt "Dashboard" wenn eingeloggt, **Hamburger-Menü auf Mobile**
- **Hero:** Vollbild mit Aquarell-Händebild, animierte Overlay-Elemente, CTA-Buttons
- **Angebote:** 3 Produktkarten mit direktem Checkout (kein Login nötig)
- **Features:** Vorteile der Dienstleistung
- **Ablauf:** 3-Schritte-Prozess (Bestellen → Geburtsdaten → PDF per E-Mail)
- **Testimonials:** 3 Kundenstimmen
- **Footer:** Links, Impressum, Social

### Login (`/login`)
- 3 Modi: Anmelden, Registrieren, Passwort vergessen
- Redirect zum Dashboard wenn bereits eingeloggt

### Success Page (`/success`)
- Keine Auth nötig (Guest-Zugriff)
- Stripe Session verifizieren
- Geburtsdaten-Formular (adaptiv: 1 Person oder 2 Personen bei Seelenkompass)
- Optionale Account-Erstellung (Passwort + Marketing-Consent)
- Duplikat-Schutz: "Bereits eingegeben" bei erneutem Laden

### Dashboard (`/dashboard`)
- Zeigt alle Bestellungen des Users mit Status
- Empty-State mit Willkommensnachricht und CTA

### Admin (`/admin`)
- Verwaltung aller Bestellungen
- PDF-Upload für fertige Readings
- Produkttyp-Badge, Partner-Daten bei Seelenkompass

### Geburtsdaten (`/birth-data`)
- Formular für eingeloggte User (Dashboard-Flow)
- Standortsuche via OpenStreetMap Nominatim API



## 8. Authentifizierung

- **Login:** E-Mail + Passwort via `signInWithPassword()`
- **Registrierung:** E-Mail + Passwort via `signUp()` mit Bestätigungs-E-Mail
- **Optionale Account-Erstellung:** Nach Kauf auf Success Page (Passwort eingeben)
- **Passwort vergessen:** `resetPasswordForEmail()` mit Redirect zu `/set-password`
- **Geschützte Routen:** `/dashboard`, `/admin`, `/birth-data`, `/set-password` (via Middleware)
- **Öffentliche Routen:** `/`, `/login`, `/success`, `/api/*`



## 9. Animationen & Effekte

- **CSS Keyframes:** breathe, morph, drift, float, twinkle, spin-slow, shimmer-warm, fade-up, shooting-star, wander, pulse-glow, rise
- **Animation Delays:** Klassen für gestaffelte Animationen (200ms bis 10000ms)
- **Hintergrund-Highlights:** Globale Komponente mit Twinkle-Dots, Sternformen, Shooting Stars, Rising Particles, Mond
- **Gradient-Text Fix:** `padding-bottom: 0.15em` verhindert Abschneiden von Unterlängen (g, p, y)



## 10. Responsive Design

- **Navbar:** Hamburger-Menü auf Mobile (`md:hidden`), animierter Toggle (3 Striche → X), Glassmorphism-Dropdown
- **Grids:** `sm:grid-cols-2 md:grid-cols-3` für Angebote & Testimonials (Tablet-Zwischenschritt)
- **Section-Padding:** `py-16 md:py-28` (weniger Leerraum auf Mobile)
- **Admin-Header:** `flex-col sm:flex-row` für Mobile-Stacking
- **Formulare:** Alle Inputs `w-full`, Cards mit `max-w-md`/`max-w-lg` — von Haus aus mobile-friendly



## 11. Rechtliche Seiten

- **Anbieterin:** Patricia Beck, Sandberg 20, 27612 Loxstedt
- **Kontakt-E-Mail:** kontakt@seelensprache.com (Platzhalter — muss aktualisiert werden)
- **Steuer:** Kleinunternehmerin gemäß § 19 UStG
- **Impressum** (`/impressum`): Angaben gemäß § 5 DDG, Kontakt, USt-Status, EU-Streitschlichtung
- **AGB** (`/agb`): §§ 1–9 (Geltungsbereich, Vertragsgegenstand, Vertragsschluss, Preise, Lieferung, Widerruf, Haftung, Urheberrecht, Schlussbestimmungen)
- **Datenschutz** (`/datenschutz`): DSGVO-konform mit Vercel, Supabase, Stripe, Nominatim als Auftragsverarbeiter
- **Widerruf** (`/widerruf`): Widerrufsbelehrung mit Ausschluss für personalisierte Produkte (§ 312g Abs. 2 Nr. 1 BGB) und digitale Inhalte (§ 356 Abs. 5 BGB)



## 12. Implementierungs-Status

- [x] Phase 1: Projekt-Setup, Supabase-Anbindung, Auth-Flow
- [x] Phase 2: Landingpage mit Hero, Angeboten, Features, Ablauf, Testimonials
- [x] Phase 3: Login/Registrierung mit E-Mail + Passwort
- [x] Phase 4: Dashboard mit Reading-Anzeige und Empty-State
- [x] Phase 5: Stripe Checkout Integration (Guest Checkout)
- [x] Phase 6: Geburtsdaten-Formular mit Standortsuche (Nominatim)
- [x] Phase 7: Admin-Ansicht für PDF-Upload und Bestellverwaltung
- [x] Phase 8: Guest Checkout Umbau (Orders-Tabelle, Success Page, Submit API)
- [x] Phase 9: Rechtliche Seiten (Impressum, AGB, Datenschutz, Widerruf) mit echten Daten
- [x] Phase 10: Responsive Design (Mobile Hamburger-Menü, Tablet-Grids, Section-Padding)
- [ ] Phase 11: Supabase Dashboard konfigurieren (Site URL, Redirect URLs für Produktion)
- [ ] Phase 12: Vercel Deployment & Stripe Live-Keys



## 13. Wichtige Dateien

```
src/
├── app/
│   ├── globals.css              # Tailwind v4 Theme, Animationen, Glassmorphism
│   ├── layout.js                # Root Layout mit BackgroundHighlights
│   ├── page.js                  # Landingpage Komposition
│   ├── login/page.js            # Login/Register/Forgot Password
│   ├── set-password/page.js     # Passwort-Zurücksetzen
│   ├── dashboard/page.js        # User Dashboard (orders Tabelle)
│   ├── admin/page.js            # Admin-Bereich (orders Tabelle)
│   ├── birth-data/
│   │   ├── page.js              # Geburtsdaten für eingeloggte User
│   │   └── actions.js           # Server Action für Geburtsdaten
│   ├── success/page.js          # Guest Success Page nach Stripe
│   ├── impressum/page.js        # Impressum (§ 5 DDG)
│   ├── agb/page.js              # Allgemeine Geschäftsbedingungen
│   ├── datenschutz/page.js      # Datenschutzerklärung (DSGVO)
│   ├── widerruf/page.js         # Widerrufsbelehrung
│   └── api/
│       ├── checkout/route.js    # Stripe Session erstellen (Guest)
│       ├── webhook/route.js     # Stripe Webhook (orders Tabelle)
│       └── submit-birth-data/route.js  # Geburtsdaten speichern (Guest)
├── components/
│   ├── background-highlights.js # Globale Hintergrund-Animationen
│   ├── success-birth-data-form.js  # Adaptives Geburtsdaten-Formular
│   ├── reading-card.js          # Bestellungs-Karte (Dashboard)
│   ├── admin-reading-card.js    # Admin Bestellungs-Karte
│   ├── order-button.js          # "Neues Reading bestellen" Button
│   ├── landing/
│   │   ├── navbar.js            # Sticky Navigation
│   │   ├── hero.js              # Hero mit Händebild
│   │   ├── offerings.js         # 3 Produktkarten (direkter Checkout)
│   │   ├── features.js          # Feature-Übersicht
│   │   ├── services.js          # 3-Schritte-Ablauf
│   │   ├── testimonials.js      # Kundenstimmen
│   │   └── footer.js            # Footer
│   └── ui/                      # shadcn/ui Komponenten
├── lib/
│   ├── products.js              # Zentrale Produkt-Definition
│   ├── stripe.js                # Stripe Client
│   ├── hooks/
│   │   └── use-place-search.js  # Nominatim Orts-Suche Hook
│   └── supabase/
│       ├── client.js            # Browser Supabase Client
│       ├── server.js            # Server Supabase Client
│       └── middleware.js        # Auth Middleware (Route Protection)
public/
└── hands-bg.jpg                 # Aquarell-Händebild für Hero
```
