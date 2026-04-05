import Link from "next/link";

export function ArticleCard({ article }) {
  return (
    <Link href={`/wissen/${article.slug}`} className="group">
      <article className="glass-warm-strong rounded-3xl p-6 md:p-8 h-full flex flex-col transition-all duration-300 group-hover:shadow-[0_8px_30px_rgba(196,134,139,0.15)] group-hover:-translate-y-1">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">{article.icon}</span>
          <span className="text-xs font-medium text-gold tracking-wide uppercase">
            {article.category}
          </span>
        </div>

        <h2 className="font-serif text-lg md:text-xl text-gold mb-2 group-hover:text-gold-light transition-colors">
          {article.title}
        </h2>

        <p className="text-earth/80 text-sm leading-relaxed mb-4 flex-1">
          {article.subtitle}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-sand/30">
          <span className="text-xs text-earth/50">{article.readingTime} Lesezeit</span>
          <span className="text-sm text-gold group-hover:text-gold-light transition-colors">
            Artikel lesen →
          </span>
        </div>
      </article>
    </Link>
  );
}
