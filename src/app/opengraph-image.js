import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Seelensprache — Professionelle Astrologie-Readings";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFF8F5",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #8B5A60, #C4868B, #D4A0A4)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Seelensprache
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#9B7B80",
              textAlign: "center",
              maxWidth: "600px",
            }}
          >
            Professionelle Astrologie-Readings
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#B87D82",
              marginTop: "12px",
            }}
          >
            Geburtshoroskop · Kinder-Horoskop · Partner-Synastrie
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
