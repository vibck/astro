import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import { BackgroundHighlights } from "@/components/background-highlights";
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
  title: "Seelensprache | Professionelle Astrologie-Readings",
  description:
    "Erhalte dein persönliches, professionelles Astrologie-Reading als PDF.",
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
        <BackgroundHighlights />
        {children}
      </body>
    </html>
  );
}
