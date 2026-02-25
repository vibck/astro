// Pinterest Pin Generator — Seelensprache Batch 2 (10 neue Pins)
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const pins = [
  {
    id: "08-venus",
    category: "Astrologie Wissen",
    headline: "Dein Venus-Zeichen zeigt, wie du liebst",
    subtext: "Venus bestimmt, was dich anzieht, wie du Nähe zeigst und was du in der Liebe wirklich brauchst.",
    description: "Dein Sternzeichen verrät nur einen Teil deiner Persönlichkeit. Venus zeigt dir, wie du liebst, was dich anzieht und wie du Zuneigung ausdrückst. Entdecke dein vollständiges Geburtshoroskop bei Seelensprache. #Venus #Astrologie #Liebe #Horoskop #Seelensprache",
    link: "https://seelensprache-astro.de",
  },
  {
    id: "09-saturn-return",
    category: "Astrologie Wissen",
    headline: "Saturn Return: Der kosmische Wendepunkt um die 30",
    subtext: "Zwischen 27 und 30 kehrt Saturn an seinen Geburtsort zurück. Eine Zeit großer Veränderungen und neuer Klarheit.",
    description: "Der Saturn Return ist einer der wichtigsten Übergänge im Leben. Er bringt Umbrüche, aber auch die Chance, endlich deinen eigenen Weg zu gehen. Erfahre, was Saturn in deinem Horoskop bewirkt. #SaturnReturn #Astrologie #Lebensweg #Horoskop #Seelensprache",
    link: "https://seelensprache-astro.de",
  },
  {
    id: "10-elemente",
    category: "Astrologie Wissen",
    headline: "Feuer, Erde, Luft oder Wasser: Welches Element prägt dich?",
    subtext: "Die vier Elemente zeigen deine grundlegende Energie. Sie beeinflussen, wie du denkst, fühlst und handelst.",
    description: "Jedes Sternzeichen gehört zu einem Element. Feuerzeichen sind leidenschaftlich, Erdzeichen beständig, Luftzeichen kommunikativ und Wasserzeichen intuitiv. Finde heraus, welches Element in deinem Horoskop dominiert. #Elemente #Astrologie #Sternzeichen #Horoskop #Seelensprache",
    link: "https://seelensprache-astro.de",
  },
  {
    id: "11-mondknoten",
    category: "Astrologie Wissen",
    headline: "Dein Mondknoten: Die Richtung deiner Seele",
    subtext: "Der Mondknoten zeigt, wohin deine Seele sich entwickeln möchte und welche Lektionen auf dich warten.",
    description: "Der Mondknoten ist einer der faszinierendsten Punkte im Horoskop. Er zeigt deine karmische Lebensrichtung und wohin du dich entwickeln darfst. Entdecke deine persönliche Seelenreise. #Mondknoten #Karma #Astrologie #Lebensweg #Seelensprache",
    link: "https://seelensprache-astro.de",
  },
  {
    id: "12-geschenk",
    category: "Seelensprache Readings",
    headline: "Ein Geschenk, das von Herzen kommt",
    subtext: "Schenke einem besonderen Menschen ein persönliches Reading. Individuell erstellt, voller Einsichten und Wärme.",
    description: "Suchst du ein Geschenk mit Bedeutung? Ein astrologisches Reading von Seelensprache ist persönlich, einzigartig und berührt die Seele. Perfekt zum Geburtstag, zur Geburt oder einfach so. Ab 79€ als PDF. #Geschenkidee #Astrologie #Reading #Geburtstag #Seelensprache",
    link: "https://seelensprache-astro.de",
  },
  {
    id: "13-chiron",
    category: "Astrologie Wissen",
    headline: "Chiron: Deine tiefste Wunde wird deine größte Stärke",
    subtext: "In der Astrologie zeigt Chiron, wo du verletzt wurdest und wie du genau dort Heilung finden kannst.",
    description: "Chiron wird der verwundete Heiler genannt. Seine Position in deinem Horoskop zeigt, wo du eine tiefe Verletzung trägst und wie du durch ihre Heilung anderen helfen kannst. Erfahre mehr in deinem Geburtshoroskop. #Chiron #Astrologie #Heilung #Horoskop #Seelensprache",
    link: "https://seelensprache-astro.de",
  },
  {
    id: "14-merkur",
    category: "Astrologie Wissen",
    headline: "Merkur verrät, wie du denkst und kommunizierst",
    subtext: "Merkur beeinflusst deinen Kommunikationsstil, deine Denkweise und wie du Informationen verarbeitest.",
    description: "Merkur ist der Planet des Verstandes. Sein Zeichen in deinem Horoskop zeigt, wie du denkst, lernst und dich ausdrückst. Ob analytisch, kreativ oder intuitiv — dein Merkur erzählt die Geschichte. #Merkur #Astrologie #Kommunikation #Horoskop #Seelensprache",
    link: "https://seelensprache-astro.de",
  },
  {
    id: "15-seelenkarte",
    category: "Seelensprache Readings",
    headline: "Die Seelenkarte: Das perfekte Horoskop für dein Kind",
    subtext: "Liebevoll und persönlich erstellt. Verstehe die Talente, Stärken und Bedürfnisse deines Kindes auf einer tieferen Ebene.",
    description: "Die Seelenkarte von Seelensprache ist mehr als ein Horoskop. Sie zeigt dir die Persönlichkeit deines Kindes, seine Begabungen und emotionalen Bedürfnisse. Persönlich geschrieben, ab 79€ als PDF. #Seelenkarte #KinderHoroskop #Astrologie #Eltern #Seelensprache",
    link: "https://seelensprache-astro.de",
  },
  {
    id: "16-mars",
    category: "Astrologie Wissen",
    headline: "Dein Mars-Zeichen: So setzt du deine Energie ein",
    subtext: "Mars zeigt, was dich antreibt, wie du für deine Ziele kämpfst und woher deine Leidenschaft kommt.",
    description: "Mars steht für Antrieb, Mut und Durchsetzungskraft. Sein Zeichen in deinem Horoskop verrät, wie du deine Energie einsetzt und was dich wirklich motiviert. Entdecke dein vollständiges Geburtshoroskop. #Mars #Astrologie #Energie #Motivation #Seelensprache",
    link: "https://seelensprache-astro.de",
  },
  {
    id: "17-seelenkompass",
    category: "Seelensprache Readings",
    headline: "Seelenkompass: Was die Sterne über eure Liebe verraten",
    subtext: "Eine persönliche Synastrie-Analyse für Paare. Versteht eure Stärken, Herausforderungen und euren gemeinsamen Weg.",
    description: "Der Seelenkompass vergleicht eure beiden Geburtshoroskope und zeigt die kosmische Verbindung zwischen euch. Wie ergänzt ihr euch? Wo könnt ihr gemeinsam wachsen? Persönlich erstellt, ab 129€. #Seelenkompass #Partnerhoroskop #Synastrie #Liebe #Seelensprache",
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

  // Neue Beschreibungen anhängen
  let descriptions = "\n## Batch 2 — Neue Pins (25. Feb 2026)\n\n";

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

  // An bestehende beschreibungen.md anhängen
  const descPath = path.join(outputDir, "beschreibungen.md");
  fs.appendFileSync(descPath, descriptions);

  console.log("\n✓ Alle 10 neuen Pins generiert in public/pins/");
  console.log("✓ Beschreibungen angehängt an public/pins/beschreibungen.md");
}

generateAll().catch(console.error);
