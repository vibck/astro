import { articles } from "@/lib/articles";

export default function sitemap() {
  const baseUrl = "https://seelensprache-astro.de";

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/wissen/${article.slug}`,
    lastModified: article.modifiedDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: "2026-02-23",
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ueber-mich`,
      lastModified: "2026-02-23",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/wissen`,
      lastModified: "2026-04-05",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articleUrls,
    {
      url: `${baseUrl}/impressum`,
      lastModified: "2026-02-22",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: "2026-02-22",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/agb`,
      lastModified: "2026-02-22",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/widerruf`,
      lastModified: "2026-02-22",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
