# Projekt-Spezifikation: Seelensprache – Astrologie-Plattform



## 1. Vision & Ziel

**Seelensprache** ist eine exklusive, hochperformante Web-App für persönliche Astrologie-Readings.

- **User-Erfahrung:** Der Kunde kauft ein Reading, gibt seine Geburtsdaten an und erhält später ein professionelles PDF-Reading in seinem persönlichen Dashboard.
- **Workflow:** Die Berechnungen erfolgen extern (via Astro-Seek durch die Expertin), die Plattform dient als professionelles Verkaufs-, Datenabfrage- und Auslieferungs-Tool.



## 2. Tech-Stack

- **Framework:** Next.js 16 (App Router, JavaScript/JSX – kein TypeScript)
- **Styling:** Tailwind CSS v4 (`@theme inline` CSS-Variablen) + shadcn/ui Komponenten
- **Datenbank & Backend:** Supabase (PostgreSQL)
- **Authentifizierung:** Supabase Auth (E-Mail + Passwort, Registrierung mit Bestätigungs-E-Mail, Passwort-Zurücksetzen-Flow)
- **Datei-Speicher:** Supabase Storage (für den Upload der PDF-Readings)
- **Zahlungen:** Stripe Checkout (Pay-as-you-go)
- **Hosting:** Vercel (Free Tier)



## 3. Produkte / Angebote

| Produkt | Preis | Beschreibung |
|---|---|---|
| Geburtshoroskop | 49 € | Persönliche Geburtshoroskop-Deutung mit Sonne, Mond, Aszendent und allen Planetenpositionen |
| Seelenkarte für Kinder | 39 € | Einfühlsame Deutung der Geburtskonstellation deines Kindes |
| Partnerschafts-Reading | 59 € | Synastrie-Analyse eurer Geburtshoroskope mit Stärken und Herausforderungen |



## 4. Daten-Struktur (Supabase Tabellen)

**profiles:**
- `id` (uuid, primary key)
- `email` (text)
- `full_name` (text)
- `created_at` (timestamp)

**readings:**
- `id` (uuid)
- `user_id` (references profiles.id)
- `status` (enum: 'pending', 'paid', 'processing', 'completed')
- `birth_date` (date)
- `birth_time` (time)
- `birth_place` (text)
- `birth_coords` (jsonb – für lat/lng)
- `stripe_session_id` (text)
- `pdf_url` (text – Link zum fertigen Reading im Storage)
- `updated_at` (timestamp)



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



## 6. Seitenstruktur

### Landingpage (`/`)
- **Navbar:** Sticky, halbtransparent (`bg-white/80 backdrop-blur-xl`), zeigt "Dashboard" wenn eingeloggt
- **Hero:** Vollbild mit Aquarell-Händebild, animierte Overlay-Elemente (Morph-Blobs, Sparkle-Dots, Orbital-Ring), CTA-Buttons
- **Angebote:** 3 symmetrische Produktkarten mit Schatten und SVG-Icons
- **Features:** Vorteile der Dienstleistung
- **Ablauf:** 3-Schritte-Prozess (Bestellen → Geburtsdaten → Reading erhalten)
- **Testimonials:** 3 Kundenstimmen
- **Footer:** Links, Impressum, Social

### Login (`/login`)
- 3 Modi: Anmelden (E-Mail + Passwort), Registrieren (E-Mail + Passwort + Bestätigungs-E-Mail), Passwort vergessen
- Redirect zum Dashboard wenn bereits eingeloggt
- Animierter Sternenhintergrund mit Orbital-Ringen

### Passwort setzen (`/set-password`)
- Für Passwort-Zurücksetzen-Flow
- Neues Passwort + Bestätigung

### Dashboard (`/dashboard`)
- Zeigt alle Readings des Users mit Status
- Empty-State mit Willkommensnachricht und CTA
- Logout-Button, Bestell-Button

### Admin (`/admin`)
- Verwaltung aller Bestellungen
- PDF-Upload für fertige Readings

### Geburtsdaten (`/birth-data`)
- Formular für Geburtsdatum, -zeit und -ort
- Standortsuche via OpenStreetMap Nominatim API

### Checkout (`/checkout/success`)
- Bestätigung nach erfolgreicher Stripe-Zahlung



## 7. Authentifizierung

- **Login:** E-Mail + Passwort via `signInWithPassword()`
- **Registrierung:** E-Mail + Passwort via `signUp()` mit Bestätigungs-E-Mail
- **Passwort vergessen:** `resetPasswordForEmail()` mit Redirect zu `/set-password`
- **Passwort setzen:** `updateUser({ password })` auf `/set-password`
- **Geschützte Routen:** `/dashboard`, `/admin`, `/birth-data`, `/checkout/success`, `/set-password` (via Middleware)



## 8. Animationen & Effekte

- **CSS Keyframes:** breathe, morph, drift, float, twinkle, spin-slow, shimmer-warm, fade-up, shooting-star, wander, pulse-glow, rise
- **Animation Delays:** Klassen für gestaffelte Animationen (200ms bis 10000ms)
- **Hintergrund-Highlights:** Globale Komponente mit Twinkle-Dots, Sternformen, Shooting Stars, Rising Particles, Mond
- **Gradient-Text Fix:** `padding-bottom: 0.15em` verhindert Abschneiden von Unterlängen (g, p, y)



## 9. Implementierungs-Roadmap

- [x] Phase 1: Projekt-Setup, Supabase-Anbindung, Auth-Flow
- [x] Phase 2: Landingpage mit Hero, Angeboten, Features, Ablauf, Testimonials
- [x] Phase 3: Login/Registrierung mit E-Mail + Passwort
- [x] Phase 4: Dashboard mit Reading-Anzeige und Empty-State
- [ ] Phase 5: Stripe Checkout Integration
- [ ] Phase 6: Geburtsdaten-Formular mit Standortsuche
- [ ] Phase 7: Admin-Ansicht für PDF-Upload und Bestellverwaltung
- [ ] Phase 8: Supabase Dashboard konfigurieren (Site URL, Redirect URLs)



## 10. Wichtige Dateien

```
src/
├── app/
│   ├── globals.css          # Tailwind v4 Theme, Animationen, Glassmorphism
│   ├── layout.js            # Root Layout mit BackgroundHighlights
│   ├── page.js              # Landingpage Komposition
│   ├── login/page.js        # Login/Register/Forgot Password
│   ├── set-password/page.js # Passwort-Zurücksetzen
│   ├── dashboard/page.js    # User Dashboard
│   └── admin/page.js        # Admin-Bereich
├── components/
│   ├── background-highlights.js  # Globale Hintergrund-Animationen
│   ├── landing/
│   │   ├── navbar.js        # Sticky Navigation
│   │   ├── hero.js          # Hero mit Händebild
│   │   ├── offerings.js     # 3 Produktkarten
│   │   ├── features.js      # Feature-Übersicht
│   │   ├── services.js      # 3-Schritte-Ablauf
│   │   ├── testimonials.js  # Kundenstimmen
│   │   └── footer.js        # Footer
│   └── ui/                  # shadcn/ui Komponenten
├── lib/
│   └── supabase/
│       ├── client.js        # Browser Supabase Client
│       ├── server.js        # Server Supabase Client
│       └── middleware.js    # Auth Middleware (Route Protection)
public/
└── hands-bg.jpg             # Aquarell-Händebild für Hero
```
