export const products = {
  seelenspiegel: {
    id: "seelenspiegel",
    name: "Seelenspiegel",
    subtitle: "Dein kosmischer Fingerabdruck",
    description:
      "Eine vollständige Analyse deines Geburtshoroskops — Sonne, Mond, Aszendent, Planetenaspekte und Häuser. Erfahre, welche Energien dich prägen und wie du dein volles Potenzial entfalten kannst.",
    price: 4900, // Cent
    priceDisplay: "49",
    formType: "single",
    features: [
      "Vollständige Geburtshoroskop-Analyse",
      "Sonne, Mond & Aszendent Deutung",
      "Planetenaspekte & Häuser",
      "Persönliche Stärken & Herausforderungen",
      "Hochwertiges PDF-Dokument",
    ],
  },
  seelenkarte: {
    id: "seelenkarte",
    name: "Seelenkarte",
    subtitle: "Die Sterne deines Kindes",
    description:
      "Eine liebevolle astrologische Deutung für dein Kind. Verstehe seine Talente, Bedürfnisse und Persönlichkeit — ein wundervolles Geschenk für Eltern, die ihr Kind noch tiefer verstehen möchten.",
    price: 3900,
    priceDisplay: "39",
    formType: "single",
    features: [
      "Kindgerechte Horoskop-Deutung",
      "Talente & Begabungen",
      "Emotionale Bedürfnisse",
      "Lernstil & Kommunikation",
      "Liebevoll gestaltetes PDF",
    ],
  },
  seelenkompass: {
    id: "seelenkompass",
    name: "Seelenkompass",
    subtitle: "Die Verbindung zweier Seelen",
    description:
      "Entdecke die kosmische Dynamik zwischen dir und deinem Partner. Erfahre, wie eure Energien zusammenwirken, wo Harmonie und wo Wachstumspotenzial liegt.",
    price: 5900,
    priceDisplay: "59",
    formType: "partner",
    features: [
      "Synastrie-Analyse beider Charts",
      "Beziehungsdynamik & Stärken",
      "Kommunikationsmuster",
      "Wachstumspotenziale als Paar",
      "Gemeinsames PDF-Dokument",
    ],
  },
};

export function getProduct(id) {
  return products[id] || null;
}

export const productList = Object.values(products);
