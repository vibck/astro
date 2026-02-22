import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export const metadata = {
  title: "Widerrufsbelehrung | Seelensprache",
  description: "Widerrufsbelehrung für digitale Inhalte gemäß § 356 Abs. 5 BGB.",
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
                Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag
                zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des
                Vertragsschlusses.
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
                mittels einer eindeutigen Erklärung (z.&nbsp;B. per E-Mail oder Brief) über Ihren
                Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das
                untenstehende Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
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
                zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf bei uns eingegangen ist.
                Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
                ursprünglichen Transaktion eingesetzt haben; in keinem Fall werden Ihnen wegen
                dieser Rückzahlung Entgelte berechnet.
              </p>
            </section>

            {/* Vorzeitiges Erlöschen */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">
                Vorzeitiges Erlöschen des Widerrufsrechts
              </h2>
              <p>
                Das Widerrufsrecht erlischt bei einem Vertrag über die Lieferung von digitalen
                Inhalten, die nicht auf einem körperlichen Datenträger bereitgestellt werden
                (z.&nbsp;B. PDF-Dateien), gemäß{" "}
                <strong>§ 356 Abs. 5 BGB</strong>, wenn der Unternehmer mit der Ausführung des
                Vertrags begonnen hat, nachdem der Verbraucher:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                <li>
                  ausdrücklich zugestimmt hat, dass der Unternehmer mit der Ausführung des
                  Vertrags vor Ablauf der Widerrufsfrist beginnt, und
                </li>
                <li>
                  seine Kenntnis davon bestätigt hat, dass er durch seine Zustimmung sein
                  Widerrufsrecht verliert.
                </li>
              </ul>
              <p className="mt-2">
                Ein Widerrufsrecht besteht zudem gemäß <strong>§ 312g Abs. 2 Nr. 1 BGB</strong> nicht bei Verträgen zur Lieferung von Waren oder Dienstleistungen, die
                nicht vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder
                Bestimmung durch den Verbraucher maßgeblich ist oder die eindeutig auf die
                persönlichen Bedürfnisse zugeschnitten sind.
              </p>
              <p className="mt-2">
                Unsere Astrologie-Readings werden individuell anhand Ihrer persönlichen
                Geburtsdaten erstellt und sind ausschließlich für Sie bestimmt.
              </p>
              <p className="mt-2">
                Die Erstellung beginnt erst, nachdem Sie im Bestellprozess ausdrücklich zugestimmt
                haben, dass wir vor Ablauf der Widerrufsfrist mit der Ausführung beginnen und Sie
                den Verlust Ihres Widerrufsrechts bestätigen.
              </p>
            </section>

            {/* Muster-Widerrufsformular */}
            <section>
              <h2 className="font-serif text-lg text-gold mb-2">Muster-Widerrufsformular</h2>
              <p className="italic text-earth/70">
                (Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und
                senden Sie es zurück.)
              </p>
              <div className="mt-3 p-4 rounded-xl border border-sand/50 bg-cream/30 space-y-2">
                <p>
                  An: Patricia Beck, Sandberg 20, 27612 Loxstedt,{" "}
                  <a href="mailto:kontakt@seelensprache-astro.de" className="text-gold hover:text-gold-light underline transition-colors">
                    kontakt@seelensprache-astro.de
                  </a>
                </p>
                <p>
                  Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag
                  über die Erbringung der folgenden Dienstleistung (*) / die Lieferung der
                  folgenden Waren (*)
                </p>
                <p>— Bestellt am (*) / erhalten am (*)</p>
                <p>— Name des/der Verbraucher(s)</p>
                <p>— Anschrift des/der Verbraucher(s)</p>
                <p>— Datum</p>
                <p className="text-earth/60 text-xs mt-2">(*) Unzutreffendes streichen.</p>
              </div>
            </section>

            {/* Stand */}
            <section className="pt-4 border-t border-sand/50">
              <p className="text-earth/60 text-xs">
                Stand: 22. Februar 2026
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
