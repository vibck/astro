export const products = {
  seelenspiegel: {
    id: "seelenspiegel",
    name: "Seelenspiegel",
    subtitle: "Dein kosmischer Fingerabdruck",
    description:
      "Eine vollständige Analyse deines Geburtshoroskops — Sonne, Mond, Aszendent, Planetenaspekte und Häuser. Erfahre, welche Energien dich prägen und wie du dein volles Potenzial entfalten kannst.",
    price: 9900, // Cent
    priceDisplay: "99",
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
    price: 7900,
    priceDisplay: "79",
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
    price: 12900,
    priceDisplay: "129",
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
