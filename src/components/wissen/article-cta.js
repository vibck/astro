import Link from "next/link";
import { products } from "@/lib/products";

export function ArticleCta({ productId }) {
  const product = products[productId];
  if (!product) return null;

  return (
    <div className="mt-10 rounded-2xl bg-gradient-to-br from-sand/40 to-rose-light/10 border border-sand/30 p-6 md:p-8">
      <p className="text-earth/60 text-xs uppercase tracking-wide mb-2">
        Passend zu diesem Thema
      </p>
      <h3 className="font-serif text-xl text-gold mb-2">
        {product.name}: {product.subtitle}
      </h3>
      <p className="text-earth text-sm leading-relaxed mb-4">
        {product.description}
      </p>
      <Link
        href="/#angebot"
        className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light transition-colors"
      >
        Mehr erfahren → ab {product.priceDisplay}&thinsp;€
      </Link>
    </div>
  );
}
