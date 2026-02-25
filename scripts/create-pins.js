// Pinterest Pin Generator — Seelensprache Startpaket (7 Pins)
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const pins = [
  {
    id: "01-aszendent",
    category: "Astrologie Wissen",
    headline: "Was verrät dein Aszendent über deinen ersten Eindruck?",
    subtext: "Dein Aszendent zeigt, wie andere dich wahrnehmen und wie du auf die Welt zugehst. Entdecke, was die Sterne über dich verraten.",
    description: "Wusstest du, dass dein Aszendent bestimmt, wie andere dich beim ersten Treffen wahrnehmen? Er ist die Maske, die du der Welt zeigst. Erfahre mehr über dein persönliches Geburtshoroskop bei Seelensprache. #Astrologie #Aszendent #Horoskop #Geburtshoroskop #Seelensprache",
    link: "https://seelensprache-astro.de",
  },
  {
    id: "02-mondzeichen",
    category: "Astrologie Wissen",
    headline: "Dein Mondzeichen verrät, was du wirklich fühlst",
    subtext: "Die Sonne zeigt, wer du bist. Der Mond zeigt, wie du fühlst. Lerne deine emotionale Seite kennen.",
    description: "Dein Mondzeichen ist der Schlüssel zu deinen tiefsten Gefühlen und Bedürfnissen. Während die Sonne deine Persönlichkeit zeigt, offenbart der Mond deine emotionale Welt. Entdecke dein vollständiges Geburtshoroskop. #Mondzeichen #Astrologie #Emotionen #Horoskop #Seelensprache",
    link: "https://seelensprache-astro.de",
  },
  {
    id: "03-kinder",
    category: "Seelensprache Readings",
    headline: "Verstehe dein Kind durch die Sterne",
    subtext: "Ein Kinder-Horoskop zeigt Talente, Bedürfnisse und den einzigartigen Charakter deines Kindes.",
    description: "Jedes Kind bringt seine eigene kosmische Energie mit. Ein Kinder-Horoskop hilft dir, die Talente, Bedürfnisse und den Lernstil deines Kindes besser zu verstehen. Liebevoll erstellt als PDF. #KinderHoroskop #Astrologie #Eltern #Sternzeichen #Seelensprache",
    link: "https://seelensprache-astro.de",
  },
  {
    id: "04-synastrie",
    category: "Partnerschaft",
    headline: "Was die Sterne über eure Beziehung sagen",
    subtext: "Eine Synastrie-Analyse zeigt, wo Harmonie herrscht und wo Wachstum möglich ist.",
    description: "Passt ihr wirklich zusammen? Eine Synastrie-Analyse vergleicht eure Geburtshoroskope und zeigt die Dynamik eurer Beziehung. Entdecke eure Stärken als Paar und wo ihr gemeinsam wachsen könnt. #Synastrie #Partnerhoroskop #Beziehung #Astrologie #Seelensprache",
    link: "https://seelensprache-astro.de",
  },
  {
    id: "05-haeuser",
    category: "Astrologie Wissen",
    headline: "Die 12 Häuser: Welcher Lebensbereich ruft dich?",
    subtext: "Jedes Haus in deinem Horoskop steht für einen anderen Lebensbereich. Vom Selbstbild bis zur Spiritualität.",
    description: "Die 12 Häuser in der Astrologie repräsentieren verschiedene Lebensbereiche: Identität, Finanzen, Kommunikation, Familie, Kreativität, Gesundheit und mehr. Finde heraus, wo deine Planeten stehen. #Astrologie #Häuser #Horoskop #Selbsterkenntnis #Seelensprache",
    link: "https://seelensprache-astro.de",
  },
  {
    id: "06-geburtshoroskop",
    category: "Seelensprache Readings",
    headline: "Dein Geburtshoroskop: Eine Landkarte deiner Seele",
    subtext: "Persönlich erstellt, kein Computertext. Verstehe deine Stärken, Muster und dein Potenzial.",
    description: "Ein Geburtshoroskop ist wie eine Landkarte deiner Persönlichkeit. Bei Seelensprache wird jedes Reading individuell und mit Herz erstellt — kein Algorithmus, sondern echte, persönliche Worte. Ab 99€ als PDF. #Geburtshoroskop #Astrologie #Reading #Persönlichkeit #Seelensprache",
    link: "https://seelensprache-astro.de",
  },
  {
    id: "07-sonne-mond-aszendent",
    category: "Astrologie Wissen",
    headline: "Sonne, Mond und Aszendent: Deine drei Säulen",
    subtext: "Diese drei Zeichen bilden das Fundament deiner Persönlichkeit. Zusammen erzählen sie deine Geschichte.",
    description: "Dein Sternzeichen ist nur der Anfang. Sonne, Mond und Aszendent bilden zusammen die drei Säulen deiner astrologischen Persönlichkeit. Erfahre, wie sie zusammenwirken und was sie über dich verraten. #Sternzeichen #Astrologie #Sonne #Mond #Aszendent #Seelensprache",
    link: "https://seelensprache-astro.de",
  },
];

function createPinSVG({ headline, subtext, category }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1000" height="1500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8B5A60"/>
      <stop offset="50%" style="stop-color:#C4868B"/>
      <stop offset="100%" style="stop-color:#D4A0A4"/>
    </linearGradient>
    <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#C4868B;stop-opacity:0.15"/>
      <stop offset="100%" style="stop-color:#D4A0A4;stop-opacity:0.08"/>
    </linearGradient>
    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#C4868B;stop-opacity:0"/>
      <stop offset="50%" style="stop-color:#C4868B;stop-opacity:0.4"/>
      <stop offset="100%" style="stop-color:#C4868B;stop-opacity:0"/>
    </linearGradient>
  </defs>

  <rect width="1000" height="1500" fill="#FFF8F5"/>

  <circle cx="820" cy="200" r="180" fill="url(#circleGrad)"/>
  <circle cx="150" cy="1300" r="220" fill="url(#circleGrad)"/>
  <circle cx="500" cy="750" r="300" fill="url(#circleGrad)" opacity="0.5"/>

  <circle cx="200" cy="300" r="4" fill="#C4868B" opacity="0.25"/>
  <circle cx="780" cy="450" r="3" fill="#C4868B" opacity="0.2"/>
  <circle cx="120" cy="700" r="5" fill="#D4A0A4" opacity="0.15"/>
  <circle cx="850" cy="900" r="4" fill="#C4868B" opacity="0.2"/>
  <circle cx="300" cy="1100" r="3" fill="#D4A0A4" opacity="0.25"/>

  <rect x="200" y="350" width="600" height="1" fill="url(#lineGrad)"/>

  <text x="500" y="310" text-anchor="middle" font-family="Georgia, serif" font-size="26" letter-spacing="8" fill="#9B7B80">${category.toUpperCase()}</text>

  ${wrapText(headline, 500, 560, 82, "Georgia, serif", "bold", "url(#textGrad)", 820)}

  <rect x="200" y="1000" width="600" height="1" fill="url(#lineGrad)"/>

  ${wrapText(subtext, 500, 1080, 36, "Georgia, serif", "normal", "#9B7B80", 740)}

  <g transform="translate(500, 1180)" fill="#C4868B" opacity="0.4">
    <path d="M0,-12 L2,-2 L12,0 L2,2 L0,12 L-2,2 L-12,0 L-2,-2 Z"/>
  </g>

  <text x="500" y="1340" text-anchor="middle" font-family="'Brush Script MT', 'Segoe Script', cursive" font-size="56" fill="url(#textGrad)">Seelensprache</text>
  <text x="500" y="1400" text-anchor="middle" font-family="Georgia, serif" font-size="24" fill="#9B7B80" letter-spacing="3">seelensprache-astro.de</text>
</svg>`;
}

function wrapText(text, x, startY, fontSize, fontFamily, fontWeight, fill, maxWidth) {
  const approxCharsPerLine = Math.floor(maxWidth / (fontSize * 0.52));
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length > approxCharsPerLine && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  const lineHeight = fontSize * 1.35;
  const totalHeight = lines.length * lineHeight;
  const adjustedY = startY - totalHeight / 2 + fontSize;

  return lines
    .map(
      (line, i) =>
        `<text x="${x}" y="${adjustedY + i * lineHeight}" text-anchor="middle" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fill}">${line}</text>`
    )
    .join("\n  ");
}

async function generateAll() {
  const outputDir = path.join(__dirname, "..", "public", "pins");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  // Beschreibungen als Textdatei speichern
  let descriptions = "# Pinterest Pin Beschreibungen — Seelensprache\n\n";

  for (const pin of pins) {
    const svg = createPinSVG(pin);
    const svgPath = path.join(outputDir, `${pin.id}.svg`);
    const pngPath = path.join(outputDir, `${pin.id}.png`);

    fs.writeFileSync(svgPath, svg);
    await sharp(Buffer.from(svg)).png().toFile(pngPath);

    descriptions += `## Pin ${pin.id}\n`;
    descriptions += `**Bild:** ${pin.id}.png\n`;
    descriptions += `**Titel:** ${pin.headline}\n`;
    descriptions += `**Beschreibung:**\n${pin.description}\n`;
    descriptions += `**Link:** ${pin.link}\n\n---\n\n`;

    console.log(`✓ ${pin.id}.png`);
  }

  fs.writeFileSync(path.join(outputDir, "beschreibungen.md"), descriptions);
  console.log("\n✓ Alle 7 Pins generiert in public/pins/");
  console.log("✓ Beschreibungen in public/pins/beschreibungen.md");
}

generateAll().catch(console.error);
