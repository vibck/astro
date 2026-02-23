import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import { BackgroundHighlights } from "@/components/background-highlights";
import { CartProviderWrapper } from "@/components/cart-provider-wrapper";
import { JsonLd } from "@/components/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://seelensprache-astro.de"),
  title: {
    default: "Seelensprache | Professionelle Astrologie-Readings",
    template: "%s | Seelensprache",
  },
  description:
    "Professionelle Astrologie-Readings als PDF — Geburtshoroskop, Kinder-Horoskop und Partner-Synastrie. Persönlich erstellt von Patricia Beck.",
  keywords: [
    "Astrologie",
    "Horoskop",
    "Geburtshoroskop",
    "Reading",
    "Astrologie-Reading",
    "Synastrie",
    "Kinder-Horoskop",
    "Seelensprache",
    "Patricia Beck",
    "persönliches Horoskop",
    "astrologische Beratung",
  ],
  authors: [{ name: "Patricia Beck" }],
  creator: "Seelensprache",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://seelensprache-astro.de",
    siteName: "Seelensprache",
    title: "Seelensprache | Professionelle Astrologie-Readings",
    description:
      "Professionelle Astrologie-Readings als PDF — Geburtshoroskop, Kinder-Horoskop und Partner-Synastrie. Persönlich erstellt von Patricia Beck.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seelensprache | Professionelle Astrologie-Readings",
    description:
      "Professionelle Astrologie-Readings als PDF — persönlich erstellt von Patricia Beck.",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={`${inter.variable} ${playfair.variable} ${dancingScript.variable} antialiased`}>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <BackgroundHighlights />
        <CartProviderWrapper>
          {children}
        </CartProviderWrapper>
      </body>
    </html>
  );
}
