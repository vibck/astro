import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ArticleCard } from "@/components/wissen/article-card";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { articles } from "@/lib/articles";

export const metadata = {
  title: "Astrologie Wissen",
  description:
    "Lerne die Grundlagen der Astrologie: Aszendent, Mondzeichen, Saturn Return, die vier Elemente und mehr. Verständlich erklärt von Seelensprache.",
  alternates: {
    canonical: "/wissen",
  },
};

export default function WissenPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Startseite", url: "/" },
          { name: "Wissen" },
        ])}
      />
      <Navbar />

      <main className="flex-1 px-6 pt-32 sm:pt-36 lg:pt-40 pb-16">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-gold mb-3">
              Astrologie Wissen
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gold mb-4">
              Entdecke die Sprache der Sterne
            </h1>
            <p className="text-earth/70 max-w-2xl mx-auto">
              Fundiertes Wissen rund um Astrologie, verständlich erklärt.
              Von den Grundlagen bis zu fortgeschrittenen Themen.
            </p>
          </div>

          {/* Artikel-Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center glass-warm rounded-3xl p-8 md:p-12">
            <h2 className="font-serif text-2xl md:text-3xl text-gold mb-4">
              Neugierig auf dein persönliches Horoskop?
            </h2>
            <p className="text-earth/70 mb-6 max-w-xl mx-auto">
              Entdecke, was die Sterne über dich verraten. Unsere Readings werden
              individuell für dich erstellt und als hochwertiges PDF geliefert.
            </p>
            <Link
              href="/#angebot"
              className="inline-flex items-center gap-2 bg-gold text-white hover:bg-gold-light rounded-full px-8 py-3 text-sm font-medium transition-colors glow-gold-warm"
            >
              Zu den Angeboten
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
