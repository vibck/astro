import { Inter, Playfair_Display } from "next/font/google";
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

export const metadata = {
  title: "Seelensprache | Professionelle Astrologie-Readings",
  description:
    "Erhalte dein persönliches, professionelles Astrologie-Reading als PDF.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <BackgroundHighlights />
        {children}
      </body>
    </html>
  );
}
