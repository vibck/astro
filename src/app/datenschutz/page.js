import Link from "next/link";

export const metadata = {
  title: "Datenschutzerklärung | Seelensprache",
  description: "Datenschutzerklärung gemäß DSGVO Art. 13/14.",
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen px-6 py-12 relative">
      <div className="mx-auto max-w-3xl relative z-10">
        {/* Navbar */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="font-serif text-2xl font-bold text-gradient-warm">
            Seelensprache
          </Link>
          <Link href="/" className="text-sm text-earth hover:text-gold transition-colors">
            &larr; Zurück zur Startseite
          </Link>
        </div>

        {/* Content Card */}
        <div className="glass-warm-strong rounded-3xl p-8 md:p-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gold mb-8">
            Datenschutzerklärung
          </h1>

          <div className="space-y-6 text-earth text-sm leading-relaxed">
            {/* 1. Verantwortlicher */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">1. Verantwortlicher</h2>
              <p>
                Patricia Beck<br />
                Sandberg 20<br />
                27612 Loxstedt<br />
                E-Mail: kontakt@seelensprache.com
              </p>
            </section>

            {/* 2. Übersicht */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">2. Übersicht der Verarbeitungen</h2>
              <p>
                Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung unseres
                Angebots (personalisierte Astrologie-Readings) erforderlich ist. Die nachfolgende
                Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer Verarbeitung
                zusammen.
              </p>
            </section>

            {/* 3. Hosting */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">3. Hosting</h2>
              <p>
                Unsere Website wird bei <strong>Vercel Inc.</strong> (440 N Barranca Ave #4133,
                Covina, CA 91723, USA) gehostet. Vercel verarbeitet Zugriffsdaten (IP-Adresse,
                Zeitpunkt des Zugriffs, angeforderte Seite) in Server-Logfiles. Die Verarbeitung
                erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
                einer sicheren und effizienten Bereitstellung).
              </p>
              <p className="mt-2">
                Für die Datenübermittlung in die USA stützen wir uns auf die
                Standardvertragsklauseln der EU-Kommission sowie das EU-US Data Privacy Framework.
              </p>
            </section>

            {/* 4. Datenbank & Authentifizierung */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">4. Datenbank &amp; Authentifizierung (Supabase)</h2>
              <p>
                Für die Benutzerverwaltung und Datenspeicherung nutzen wir <strong>Supabase Inc.</strong>{" "}
                (970 Toa Payoh North #07-04, Singapore 318992). Folgende Daten werden verarbeitet:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                <li>E-Mail-Adresse (Registrierung &amp; Login)</li>
                <li>Passwort (verschlüsselt gespeichert)</li>
                <li>Bestelldaten und Geburtsdaten für die Reading-Erstellung</li>
              </ul>
              <p className="mt-2">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
              </p>
            </section>

            {/* 5. Zahlungsabwicklung */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">5. Zahlungsabwicklung (Stripe)</h2>
              <p>
                Für die Zahlungsabwicklung nutzen wir <strong>Stripe Inc.</strong> (510 Townsend
                Street, San Francisco, CA 94103, USA). Bei der Bezahlung werden Ihre Zahlungsdaten
                direkt an Stripe übermittelt. Wir selbst speichern keine Kreditkarten- oder
                Kontodaten.
              </p>
              <p className="mt-2">
                Stripe verarbeitet: Name, E-Mail, Zahlungsinformationen, IP-Adresse,
                Transaktionsdaten.
              </p>
              <p className="mt-2">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
                Datenschutzhinweise von Stripe:{" "}
                <a
                  href="https://stripe.com/de/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light underline transition-colors"
                >
                  stripe.com/de/privacy
                </a>
              </p>
            </section>

            {/* 6. Ortssuche */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">6. Ortssuche (OpenStreetMap Nominatim)</h2>
              <p>
                Für die Geburtsort-Suche nutzen wir die <strong>Nominatim API</strong> von
                OpenStreetMap (OpenStreetMap Foundation, 132 Maney Hill Road, Sutton Coldfield, West
                Midlands, B72 1JU, Vereinigtes Königreich). Bei der Suche wird der eingegebene
                Suchbegriff an die Nominatim-Server übermittelt.
              </p>
              <p className="mt-2">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung — zur korrekten
                Erstellung des Readings wird der exakte Geburtsort benötigt).
              </p>
            </section>

            {/* 7. Cookies & Session */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">7. Cookies &amp; Session-Speicherung</h2>
              <p>
                Wir verwenden ausschließlich technisch notwendige Cookies für die
                Authentifizierung (Session-Cookie). Es werden keine Tracking-, Analyse- oder
                Werbe-Cookies eingesetzt.
              </p>
              <p className="mt-2">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
                Funktionsfähigkeit der Website) sowie § 25 Abs. 2 TDDDG (technisch erforderlich).
              </p>
            </section>

            {/* 8. Zwecke der Verarbeitung */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">8. Zwecke der Verarbeitung</h2>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Bereitstellung und Verbesserung unseres Angebots</li>
                <li>Erstellung personalisierter Astrologie-Readings</li>
                <li>Abwicklung von Zahlungen</li>
                <li>Zustellung der Readings per E-Mail/Download</li>
                <li>Benutzerkontenverwaltung</li>
              </ul>
            </section>

            {/* 9. Speicherdauer */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">9. Speicherdauer</h2>
              <p>
                Personenbezogene Daten werden gelöscht, sobald der Zweck der Speicherung entfällt.
                Für Vertragsdaten gilt die gesetzliche Aufbewahrungsfrist von bis zu 10 Jahren
                (§ 147 AO, § 257 HGB). Ihr Benutzerkonto und die zugehörigen Daten können Sie
                jederzeit löschen lassen.
              </p>
            </section>

            {/* 10. Rechte der Betroffenen */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">10. Ihre Rechte</h2>
              <p>Sie haben jederzeit das Recht auf:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                <li><strong>Auskunft</strong> über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
                <li><strong>Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO)</li>
                <li><strong>Löschung</strong> Ihrer Daten (Art. 17 DSGVO)</li>
                <li><strong>Einschränkung</strong> der Verarbeitung (Art. 18 DSGVO)</li>
                <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
                <li><strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO)</li>
              </ul>
              <p className="mt-2">
                Zur Ausübung Ihrer Rechte wenden Sie sich an: kontakt@seelensprache.com
              </p>
            </section>

            {/* 11. Beschwerderecht */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">11. Beschwerderecht bei einer Aufsichtsbehörde</h2>
              <p>
                Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten
                gegen die DSGVO verstößt, haben Sie das Recht, Beschwerde bei einer
                Datenschutz-Aufsichtsbehörde einzulegen (Art. 77 DSGVO).
              </p>
            </section>

            {/* Stand */}
            <section className="pt-4 border-t border-sand/50">
              <p className="text-earth/60 text-xs">
                Stand: 17. Februar 2026
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
