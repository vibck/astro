export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/dashboard", "/login", "/success", "/birth-data", "/set-password", "/api/"],
      },
    ],
    sitemap: "https://seelensprache-astro.de/sitemap.xml",
  };
}
