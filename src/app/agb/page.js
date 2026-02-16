import Link from "next/link";

export const metadata = {
  title: "AGB | Seelensprache",
  description: "Allgemeine Geschäftsbedingungen von Seelensprache.",
};

export default function AGBPage() {
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
            Allgemeine Geschäftsbedingungen
          </h1>

          <div className="space-y-6 text-earth text-sm leading-relaxed">
            {/* § 1 Geltungsbereich */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">§ 1 Geltungsbereich</h2>
              <p>
                (1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen
              </p>
              <p className="mt-2 ml-4">
                [TODO: Vorname Nachname]<br />
                [TODO: Straße Hausnummer]<br />
                [TODO: PLZ Ort]<br />
                (nachfolgend „Anbieter")
              </p>
              <p className="mt-2">
                und dem Kunden (nachfolgend „Kunde") über die Website seelensprache.com
                (nachfolgend „Website").
              </p>
              <p className="mt-2">
                (2) Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, der
                Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.
              </p>
            </section>

            {/* § 2 Vertragsgegenstand */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">§ 2 Vertragsgegenstand</h2>
              <p>
                (1) Der Anbieter bietet personalisierte Astrologie-Readings als digitale Inhalte
                (PDF-Dokumente) an. Die Readings werden individuell auf Basis der vom Kunden
                angegebenen Geburtsdaten (Datum, Uhrzeit, Ort) erstellt.
              </p>
              <p className="mt-2">
                (2) Die Readings dienen der Unterhaltung und Selbstreflexion. Sie stellen keine
                medizinische, psychologische, rechtliche oder finanzielle Beratung dar.
              </p>
            </section>

            {/* § 3 Vertragsschluss */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">§ 3 Vertragsschluss</h2>
              <p>
                (1) Die Darstellung der Produkte auf der Website stellt kein rechtlich bindendes
                Angebot dar, sondern eine Aufforderung zur Abgabe einer Bestellung (invitatio ad
                offerendum).
              </p>
              <p className="mt-2">
                (2) Der Kunde gibt durch Abschluss des Bestellvorgangs und Klick auf den
                zahlungspflichtigen Button ein verbindliches Kaufangebot ab.
              </p>
              <p className="mt-2">
                (3) Der Vertrag kommt zustande, wenn der Anbieter die Bestellung durch Zusendung
                einer Auftragsbestätigung per E-Mail annimmt oder das Reading bereitstellt.
              </p>
            </section>

            {/* § 4 Preise & Zahlung */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">§ 4 Preise und Zahlung</h2>
              <p>
                (1) Alle auf der Website genannten Preise sind Endpreise inklusive der gesetzlichen
                Mehrwertsteuer (sofern anfallend). [TODO: Falls Kleinunternehmer: „Der Anbieter ist
                Kleinunternehmer gemäß § 19 UStG und weist keine Umsatzsteuer aus."]
              </p>
              <p className="mt-2">
                (2) Die Zahlung erfolgt über den Zahlungsdienstleister Stripe. Der Kaufpreis ist
                sofort bei Bestellung fällig.
              </p>
              <p className="mt-2">
                (3) Akzeptierte Zahlungsmittel: Kreditkarte, Debitkarte sowie weitere von Stripe
                angebotene Zahlungsmethoden.
              </p>
            </section>

            {/* § 5 Lieferung */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">§ 5 Lieferung</h2>
              <p>
                (1) Nach Zahlungseingang und Erstellung des Readings wird das PDF-Dokument dem
                Kunden per E-Mail zugestellt und/oder im Kundenkonto zum Download bereitgestellt.
              </p>
              <p className="mt-2">
                (2) Die Lieferzeit hängt von der Bearbeitungsdauer ab. Der Anbieter bemüht sich um
                eine zeitnahe Bereitstellung.
              </p>
            </section>

            {/* § 6 Widerrufsrecht */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">§ 6 Widerrufsrecht</h2>
              <p>
                (1) Für das Widerrufsrecht gelten die gesetzlichen Regelungen. Die ausführliche
                Widerrufsbelehrung finden Sie unter{" "}
                <Link href="/widerruf" className="text-gold hover:text-gold-light underline transition-colors">
                  Widerrufsbelehrung
                </Link>
                .
              </p>
              <p className="mt-2">
                (2) Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die
                nicht vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder
                Bestimmung durch den Verbraucher maßgeblich ist oder die eindeutig auf die
                persönlichen Bedürfnisse des Verbrauchers zugeschnitten sind (§ 312g Abs. 2 Nr. 1
                BGB). Personalisierte Astrologie-Readings sind individuell auf die Geburtsdaten des
                Kunden zugeschnittene Produkte.
              </p>
            </section>

            {/* § 7 Haftung */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">§ 7 Haftung</h2>
              <p>
                (1) Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit.
              </p>
              <p className="mt-2">
                (2) Für leichte Fahrlässigkeit haftet der Anbieter nur bei Verletzung
                wesentlicher Vertragspflichten (Kardinalpflichten). In diesem Fall ist die Haftung
                auf den typischerweise vorhersehbaren Schaden begrenzt.
              </p>
              <p className="mt-2">
                (3) Die vorstehenden Haftungsbeschränkungen gelten nicht für Schäden aus der
                Verletzung des Lebens, des Körpers oder der Gesundheit.
              </p>
            </section>

            {/* § 8 Urheberrecht */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">§ 8 Urheberrecht</h2>
              <p>
                Die erstellten Readings sind urheberrechtlich geschützt. Der Kunde erhält ein
                einfaches, nicht übertragbares Nutzungsrecht für den persönlichen Gebrauch. Eine
                Vervielfältigung, Weitergabe oder Veröffentlichung — auch auszugsweise — ist ohne
                ausdrückliche Zustimmung des Anbieters nicht gestattet.
              </p>
            </section>

            {/* § 9 Schlussbestimmungen */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">§ 9 Schlussbestimmungen</h2>
              <p>
                (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
                UN-Kaufrechts.
              </p>
              <p className="mt-2">
                (2) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt
                die Wirksamkeit der übrigen Bestimmungen unberührt.
              </p>
              <p className="mt-2">
                (3) Die EU-Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light underline transition-colors"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
            </section>

            {/* Stand */}
            <section className="pt-4 border-t border-sand/50">
              <p className="text-earth/60 text-xs">
                Stand: [TODO: Datum einfügen]
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
