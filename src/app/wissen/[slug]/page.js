import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, articleJsonLd } from "@/lib/jsonld";
import { ArticleCta } from "@/components/wissen/article-cta";
import { articles, getArticleBySlug } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/wissen/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const Content = article.content;

  return (
    <div className="min-h-screen px-6 py-12 relative">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Startseite", url: "/" },
            { name: "Wissen", url: "/wissen" },
            { name: article.title },
          ]),
          articleJsonLd(article),
        ]}
      />

      <div className="mx-auto max-w-3xl relative z-10">
        {/* Navbar */}
        <div className="flex items-center justify-between mb-10">
          <BrandLogo size="md" />
          <Link
            href="/wissen"
            className="text-sm text-earth hover:text-gold transition-colors"
          >
            &larr; Zurück zur Übersicht
          </Link>
        </div>

        {/* Content Card */}
        <article className="glass-warm-strong rounded-3xl p-8 md:p-12">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{article.icon}</span>
            <span className="text-xs font-medium text-gold tracking-wide uppercase">
              {article.category}
            </span>
            <span className="text-xs text-earth/50">·</span>
            <span className="text-xs text-earth/50">
              {article.readingTime} Lesezeit
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gold mb-2">
            {article.title}
          </h1>
          <p className="text-earth/60 text-lg mb-8">{article.subtitle}</p>

          {/* Artikel-Content */}
          <div className="article-content space-y-4 text-earth text-[15px] leading-relaxed [&>h2]:font-serif [&>h2]:text-xl [&>h2]:text-gold [&>h2]:mt-8 [&>h2]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-1.5 [&>ul]:text-earth/80">
            <Content />
          </div>

          {/* CTA */}
          <ArticleCta productId={article.relatedProduct} />
        </article>

        {/* Verwandte Artikel */}
        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <section className="mt-8">
            <h2 className="font-serif text-xl text-gold mb-4">Das könnte dich auch interessieren</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {article.relatedArticles.map((relSlug) => {
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
