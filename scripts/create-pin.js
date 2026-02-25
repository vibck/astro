// Pinterest Pin Generator — Seelensprache Design
// Erzeugt ein 1000x1500 SVG und konvertiert es zu HTML zum Screenshot

const fs = require("fs");
const path = require("path");

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

  <!-- Background -->
  <rect width="1000" height="1500" fill="#FFF8F5"/>

  <!-- Decorative circles -->
  <circle cx="820" cy="200" r="180" fill="url(#circleGrad)"/>
  <circle cx="150" cy="1300" r="220" fill="url(#circleGrad)"/>
  <circle cx="500" cy="750" r="300" fill="url(#circleGrad)" opacity="0.5"/>

  <!-- Small decorative dots -->
  <circle cx="200" cy="300" r="4" fill="#C4868B" opacity="0.25"/>
  <circle cx="780" cy="450" r="3" fill="#C4868B" opacity="0.2"/>
  <circle cx="120" cy="700" r="5" fill="#D4A0A4" opacity="0.15"/>
  <circle cx="850" cy="900" r="4" fill="#C4868B" opacity="0.2"/>
  <circle cx="300" cy="1100" r="3" fill="#D4A0A4" opacity="0.25"/>

  <!-- Top decorative line -->
  <rect x="200" y="350" width="600" height="1" fill="url(#lineGrad)"/>

  <!-- Category label -->
  <text x="500" y="310" text-anchor="middle" font-family="Georgia, serif" font-size="22" letter-spacing="8" fill="#9B7B80" text-transform="uppercase">${category.toUpperCase()}</text>

  <!-- Main headline — multi-line -->
  ${wrapText(headline, 500, 550, 68, "Georgia, serif", "bold", "url(#textGrad)", 780)}

  <!-- Bottom decorative line -->
  <rect x="200" y="980" width="600" height="1" fill="url(#lineGrad)"/>

  <!-- Subtext -->
  ${wrapText(subtext, 500, 1060, 26, "Georgia, serif", "normal", "#9B7B80", 700)}

  <!-- Decorative star/sparkle -->
  <g transform="translate(500, 1180)" fill="#C4868B" opacity="0.4">
    <path d="M0,-12 L2,-2 L12,0 L2,2 L0,12 L-2,2 L-12,0 L-2,-2 Z"/>
  </g>

  <!-- Brand -->
  <text x="500" y="1350" text-anchor="middle" font-family="'Brush Script MT', 'Segoe Script', cursive" font-size="48" fill="url(#textGrad)">Seelensprache</text>

  <!-- URL -->
  <text x="500" y="1400" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="#9B7B80" letter-spacing="3">seelensprache-astro.de</text>
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

// Beispiel-Pin erstellen
const pin = createPinSVG({
  category: "Astrologie Wissen",
  headline: "Was verrät dein Aszendent über deinen ersten Eindruck?",
  subtext:
    "Dein Aszendent zeigt, wie andere dich wahrnehmen — und wie du auf die Welt zugehst. Entdecke, was die Sterne über dich verraten.",
});

const outputDir = path.join(__dirname, "..", "public", "pins");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

fs.writeFileSync(path.join(outputDir, "beispiel-pin.svg"), pin);
console.log("Pin erstellt: public/pins/beispiel-pin.svg");
