import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export const metadata = {
  title: "Widerrufsbelehrung | Seelensprache",
  description: "Widerrufsbelehrung für digitale Inhalte gemäß § 312g BGB.",
};

export default function WiderrufPage() {
  return (
    <div className="min-h-screen px-6 py-12 relative">
      <div className="mx-auto max-w-3xl relative z-10">
        {/* Navbar */}
        <div className="flex items-center justify-between mb-10">
          <BrandLogo size="md" />
          <Link href="/" className="text-sm text-earth hover:text-gold transition-colors">
            &larr; Zurück zur Startseite
          </Link>
        </div>

        {/* Content Card */}
        <div className="glass-warm-strong rounded-3xl p-8 md:p-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gold mb-8">
            Widerrufsbelehrung
          </h1>

          <div className="space-y-6 text-earth text-sm leading-relaxed">
            {/* Widerrufsrecht */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">Widerrufsrecht</h2>
              <p>
                Sie haben grundsätzlich das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
                diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag
                des Vertragsschlusses.
              </p>
              <p className="mt-2">
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
              </p>
              <p className="mt-2 ml-4">
                Patricia Beck<br />
                Sandberg 20<br />
                27612 Loxstedt<br />
                E-Mail: <a href="mailto:kontakt@seelensprache-astro.de" className="text-gold hover:text-gold-light underline transition-colors">kontakt@seelensprache-astro.de</a>
              </p>
              <p className="mt-2">
                mittels einer eindeutigen Erklärung (z.&nbsp;B. ein mit der Post versandter Brief
                oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen,
                informieren. Sie können dafür das untenstehende Muster-Widerrufsformular verwenden,
                das jedoch nicht vorgeschrieben ist.
              </p>
              <p className="mt-2">
                Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die
                Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
              </p>
            </section>

            {/* Folgen des Widerrufs */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">Folgen des Widerrufs</h2>
              <p>
                Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von
                Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag
                zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns
                eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das
                Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen
                wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen
                dieser Rückzahlung Entgelte berechnet.
              </p>
            </section>

            {/* Ausschluss — personalisierte Produkte */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">
                Ausschluss bei personalisierten Produkten
              </h2>
              <p>
                Das Widerrufsrecht besteht <strong>nicht</strong> bei Verträgen zur Lieferung von
                Waren, die nicht vorgefertigt sind und für deren Herstellung eine individuelle
                Auswahl oder Bestimmung durch den Verbraucher maßgeblich ist oder die eindeutig auf
                die persönlichen Bedürfnisse des Verbrauchers zugeschnitten sind (
                <strong>§ 312g Abs. 2 Nr. 1 BGB</strong>).
              </p>
              <p className="mt-2">
                Unsere Astrologie-Readings werden individuell anhand Ihrer persönlichen
                Geburtsdaten (Datum, Uhrzeit und Ort) erstellt. Jedes Reading ist ein Unikat, das
                speziell für Sie angefertigt wird. Daher ist ein Widerruf nach Beginn der
                Erstellung ausgeschlossen.
              </p>
            </section>

            {/* Ausschluss — digitale Inhalte */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">
                Erlöschen bei digitalen Inhalten
              </h2>
              <p>
                Darüber hinaus erlischt das Widerrufsrecht bei einem Vertrag über die Lieferung
                von nicht auf einem körperlichen Datenträger befindlichen digitalen Inhalten, wenn
                der Unternehmer mit der Ausführung des Vertrags begonnen hat, nachdem der
                Verbraucher
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                <li>
                  ausdrücklich zugestimmt hat, dass der Unternehmer mit der Ausführung des
                  Vertrags vor Ablauf der Widerrufsfrist beginnt, und
                </li>
                <li>
                  seine Kenntnis davon bestätigt hat, dass er durch seine Zustimmung mit Beginn
                  der Ausführung des Vertrags sein Widerrufsrecht verliert
                </li>
              </ul>
              <p className="mt-2">
                (<strong>§ 356 Abs. 5 BGB</strong>).
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
