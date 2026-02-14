\# Projekt-Spezifikation: Astro-Service-Plattform (JS-Edition)



\## 1. Vision \& Ziel

Eine exklusive, hochperformante Web-App für Astrologie-Dienstleistungen. 

\- \*\*User-Erfahrung:\*\* Der Kunde kauft ein Reading, gibt seine Geburtsdaten an und erhält später ein professionelles PDF-Reading in seinem persönlichen Dashboard.

\- \*\*Workflow:\*\* Die Berechnungen erfolgen extern (via Astro-Seek durch die Expertin), die Plattform dient als professionelles Verkaufs-, Datenabfrage- und Auslieferungs-Tool.



\## 2. Tech-Stack (Verbindliche Vorgaben)

\- \*\*Framework:\*\* Next.js (Aktuellste Version, App Router).

\- \*\*Sprache:\*\* Rein modernes JavaScript (JSX), KEIN TypeScript.

\- \*\*Styling:\*\* Tailwind CSS + shadcn/ui Komponenten.

\- \*\*Datenbank \& Backend:\*\* Supabase (PostgreSQL).

\- \*\*Authentifizierung:\*\* Supabase Auth (E-Mail Magic Links für passwortlosen Login).

\- \*\*Datei-Speicher:\*\* Supabase Storage (für den Upload der PDF-Readings).

\- \*\*Zahlungen:\*\* Stripe Checkout (Pay-as-you-go).

\- \*\*Hosting:\*\* Vercel (Free Tier).



\## 3. Daten-Struktur (Supabase Tabellen)

\- \*\*profiles:\*\* - `id` (uuid, primary key)

&nbsp; - `email` (text)

&nbsp; - `full\_name` (text)

&nbsp; - `created\_at` (timestamp)

\- \*\*readings:\*\*

&nbsp; - `id` (uuid)

&nbsp; - `user\_id` (references profiles.id)

&nbsp; - `status` (enum: 'pending', 'paid', 'processing', 'completed')

&nbsp; - `birth\_date` (date)

&nbsp; - `birth\_time` (time)

&nbsp; - `birth\_place` (text)

&nbsp; - `birth\_coords` (jsonb - für lat/lng)

&nbsp; - `stripe\_session\_id` (text)

&nbsp; - `pdf\_url` (text - Link zum fertigen Reading im Storage)

&nbsp; - `updated\_at` (timestamp)



\## 4. Design-Vorgaben ("Modern Mystical")

\- \*\*Farben:\*\* Hintergrund: Tiefschwarz/Dunkelblau (#050505), Akzente: Matt-Gold (#D4AF37), Schrift: Off-White (#F5F5F5).

\- \*\*Ästhetik:\*\* Sehr clean, feine Linien, hochwertige Typografie (z.B. eine elegante Serif-Schrift für Headlines), subtile Sternen-Hintergründe (CSS-basiert).

\- \*\*UI-Komponenten:\*\* Nutze shadcn/ui für Karten, Formulare und Buttons.



\## 5. Implementierungs-Roadmap

\- \*\*Phase 1: Setup \& Auth:\*\* Next.js Projekt-Initialisierung und Anbindung an Supabase. Login/Registrierung-Flow.

\- \*\*Phase 2: Landingpage:\*\* Repräsentative Seite mit Vorstellung der Dienstleistung und Preis-Sektion.

\- \*\*Phase 3: Checkout-Flow:\*\* Integration von Stripe. Nach erfolgreicher Zahlung Weiterleitung zum Geburtsdaten-Formular.

\- \*\*Phase 4: Datenerfassung:\*\* Formular für Geburtsort (mit Google Places oder OSM Nominatim für Koordinaten), Datum und Uhrzeit.

\- \*\*Phase 5: User-Dashboard:\*\* Bereich, in dem der Kunde den Status seiner Bestellung sieht und das PDF herunterladen kann, sobald es hochgeladen wurde.

\- \*\*Phase 6: Admin-Ansicht:\*\* Ein einfacher Bereich für die Ehefrau, um eingegangene Daten zu sehen und das fertige PDF hochzuladen.



\## 6. Spezielle Anweisungen für die KI

\- "Schreibe modularen JavaScript-Code in der `/app` Struktur."

\- "Verwende für das Design Tailwind-Klassen."

\- "Implementiere Server Actions für Datenbank-Schreibvorgänge."

\- "Nutze für die Standortsuche (Geburtsort) die kostenlose OpenStreetMap (Nominatim) API."

\- "Keine externe Astro-Berechnungs-API einbauen; die Daten werden nur gesammelt."

