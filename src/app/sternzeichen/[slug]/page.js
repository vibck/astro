import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, zodiacJsonLd } from "@/lib/jsonld";
import { ArticleCta } from "@/components/wissen/article-cta";
import { articles } from "@/lib/articles";
import { zodiacSigns, getZodiacSignBySlug } from "@/lib/sternzeichen";

export function generateStaticParams() {
  return zodiacSigns.map((sign) => ({
    slug: sign.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const sign = getZodiacSignBySlug(slug);
  if (!sign) return {};

  return {
    title: sign.title,
    description: sign.description,
    alternates: {
      canonical: `/sternzeichen/${sign.slug}`,
    },
    openGraph: {
      title: sign.title,
      description: sign.description,
    },
  };
}

export default async function ZodiacSignPage({ params }) {
  const { slug } = await params;
  const sign = getZodiacSignBySlug(slug);
  if (!sign) notFound();

  const Content = sign.content;

  const facts = [
    { label: "Element", value: sign.element },
    { label: "Qualität", value: sign.quality },
    { label: "Herrscher", value: sign.ruler },
    { label: "Stärke", value: sign.strength },
    { label: "Schatten", value: sign.shadow },
    { label: "In der Liebe", value: sign.love },
    { label: "Im Beruf", value: sign.career },
    { label: "Passt zu", value: sign.matches },
    { label: "Braucht", value: sign.needs },
  ];

  return (
    <div className="min-h-screen px-6 py-12 relative">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Startseite", url: "/" },
            { name: "Sternzeichen", url: "/sternzeichen" },
            { name: sign.name },
          ]),
          zodiacJsonLd(sign),
        ]}
      />

      <div className="mx-auto max-w-3xl relative z-10">
        {/* Navbar */}
        <div className="flex items-center justify-between mb-10">
          <BrandLogo size="md" />
          <Link
            href="/sternzeichen"
            className="text-sm text-earth hover:text-gold transition-colors"
          >
            &larr; Alle Sternzeichen
          </Link>
        </div>

        {/* Content Card */}
        <article className="glass-warm-strong rounded-3xl p-8 md:p-12">
          {/* Kopf */}
          <div className="text-center mb-8">
            <span className="text-5xl text-gold block mb-3">{sign.symbol}</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-gold mb-1">
              Sternzeichen {sign.name}
            </h1>
            <p className="text-earth/60 text-lg">{sign.dateRange}</p>
          </div>

          {/* Steckbrief */}
          <div className="rounded-2xl bg-gradient-to-br from-sand/40 to-rose-light/10 border border-sand/30 p-6 md:p-8 mb-8">
            <p className="text-earth/60 text-xs uppercase tracking-wide mb-4">
              Steckbrief
            </p>
            <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-4 border-b border-sand/40 pb-2"
                >
                  <dt className="text-sm font-medium text-earth shrink-0">
                    {fact.label}
                  </dt>
                  <dd className="text-sm text-gold text-right">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Inhalt */}
          <div className="article-content space-y-4 text-earth text-[15px] leading-relaxed [&>h2]:font-serif [&>h2]:text-xl [&>h2]:text-gold [&>h2]:mt-8 [&>h2]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-1.5 [&>ul]:text-earth/80">
            <Content />

            <h2>Mehr als dein Sternzeichen</h2>
            <p>
              Dein Sternzeichen beschreibt deinen inneren Kern, aber es ist nur
              eine von vielen Ebenen deiner Persönlichkeit. Genauso prägend sind
              dein{" "}
              <Link
                href="/wissen/was-ist-dein-aszendent"
                className="text-gold hover:text-gold-light underline underline-offset-2"
              >
                Aszendent
              </Link>
              , dein{" "}
              <Link
                href="/wissen/mondzeichen-gefuehle"
                className="text-gold hover:text-gold-light underline underline-offset-2"
              >
                Mondzeichen
              </Link>{" "}
              und die Stellung aller Planeten zum Zeitpunkt deiner Geburt. Erst
              dein vollständiges{" "}
              <Link
                href="/wissen/was-ist-ein-geburtshoroskop"
                className="text-gold hover:text-gold-light underline underline-offset-2"
              >
                Geburtshoroskop
              </Link>{" "}
              zeigt, wer du wirklich bist.
            </p>
          </div>

          {/* CTA */}
          <ArticleCta productId="seelenspiegel" />
        </article>

        {/* Alle Sternzeichen */}
        <section className="mt-8">
          <h2 className="font-serif text-xl text-gold mb-4">
            Alle Sternzeichen entdecken
          </h2>
          <div className="flex flex-wrap gap-2">
            {zodiacSigns.map((other) => (
              <Link
                key={other.slug}
                href={`/sternzeichen/${other.slug}`}
                className={`glass-warm rounded-full px-4 py-2 text-sm transition-colors ${
                  other.slug === sign.slug
                    ? "text-gold font-medium"
                    : "text-earth hover:text-gold"
                }`}
              >
                {other.symbol} {other.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Verwandte Artikel */}
        {sign.relatedArticles && sign.relatedArticles.length > 0 && (
          <section className="mt-8">
            <h2 className="font-serif text-xl text-gold mb-4">
              Das könnte dich auch interessieren
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sign.relatedArticles.map((relSlug) => {
                const rel = articles.find((a) => a.slug === relSlug);
                if (!rel) return null;
                return (
                  <Link
                    key={rel.slug}
                    href={`/wissen/${rel.slug}`}
                    className="glass-warm rounded-2xl p-5 hover:shadow-md transition-shadow group"
                  >
                    <span className="text-lg mb-1 block">{rel.icon}</span>
                    <span className="text-xs font-medium text-gold/80 tracking-wide uppercase">
                      {rel.category}
                    </span>
                    <h3 className="font-serif text-base text-earth group-hover:text-gold transition-colors mt-1 mb-1.5">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-earth/60 leading-relaxed line-clamp-2">
                      {rel.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
