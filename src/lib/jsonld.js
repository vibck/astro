const baseUrl = "https://seelensprache-astro.de";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Seelensprache",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/logo.png`,
    description:
      "Professionelle Astrologie-Readings als PDF. Geburtshoroskop, Kinder-Horoskop und Partner-Synastrie von Patricia Beck.",
    founder: {
      "@type": "Person",
      name: "Patricia Beck",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Loxstedt",
      addressCountry: "DE",
    },
    priceRange: "79€–149€",
    areaServed: {
      "@type": "Country",
      name: "Deutschland",
    },
    sameAs: [],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Seelensprache",
    url: baseUrl,
    description:
      "Professionelle Astrologie-Readings als PDF — persönlich, einfühlsam und individuell erstellt.",
    inLanguage: "de-DE",
  };
}

export function productJsonLd(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Seelensprache ${product.name}`,
    description: product.description,
    offers: {
      "@type": "Offer",
      price: (product.price / 100).toFixed(2),
      priceCurrency: "EUR",
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      url: baseUrl,
      seller: {
        "@type": "Person",
        name: "Patricia Beck",
      },
    },
    brand: {
      "@type": "Brand",
      name: "Seelensprache",
    },
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url ? `${baseUrl}${item.url}` : undefined,
    })),
  };
}
