import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export const metadata = {
  title: "Seite nicht gefunden | Seelensprache",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen px-6 py-12 relative flex items-center justify-center">
      <div className="mx-auto max-w-md relative z-10 text-center">
        <BrandLogo size="md" />

        <div className="glass-warm-strong rounded-3xl p-8 md:p-12 mt-8">
          <h1 className="font-serif text-4xl font-bold text-gold mb-4">404</h1>
          <p className="text-earth text-sm mb-6">
            Diese Seite konnte leider nicht gefunden werden.
          </p>
          <Link
            href="/"
            className="inline-block bg-gold text-white hover:bg-gold-light rounded-full px-8 py-3 text-sm font-medium transition-colors glow-gold-warm"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
