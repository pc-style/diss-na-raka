import { ImageResponse } from "next/og";

export const alt = "DISS NA RAKA · Tablica streamu Łatwogang × Cancer Fighters";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

function CrabMark() {
  return (
    <svg width="180" height="150" viewBox="0 0 220 180" fill="none">
      <g stroke="#dc2320" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="110" cy="108" rx="52" ry="30" />
        <line x1="90" y1="82" x2="84" y2="66" />
        <line x1="130" y1="82" x2="136" y2="66" />
        <circle cx="82" cy="62" r="6" fill="#dc2320" />
        <circle cx="138" cy="62" r="6" fill="#dc2320" />
        <path d="M62 101c-30-13-43-35-37-54 21 5 37 18 45 42" />
        <path d="M158 101c30-13 43-35 37-54-21 5-37 18-45 42" />
        <path d="M73 132 41 160" />
        <path d="M96 140 78 170" />
        <path d="M124 140 142 170" />
        <path d="M147 132 179 160" />
      </g>
    </svg>
  );
}

export default function Image() {
  const total = "202 000 000+";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#10100f",
          color: "#f5eee2",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 24,
            border: "2px solid rgba(245,238,226,0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -40,
            bottom: -20,
            opacity: 0.9,
            display: "flex",
          }}
        >
          <CrabMark />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontSize: 22, letterSpacing: 6, color: "rgba(245,238,226,0.68)", textTransform: "uppercase" }}>
                Łatwogang × Cancer Fighters
              </div>
              <div style={{ display: "flex", flexDirection: "column", fontSize: 110, fontWeight: 900, letterSpacing: -5, lineHeight: 0.86, textTransform: "uppercase" }}>
                <span>Diss na</span>
                <span style={{ color: "#dc2320" }}>raka</span>
              </div>
            </div>
            <div style={{ display: "flex", transform: "rotate(-5deg)" }}>
              <CrabMark />
            </div>
          </div>

          <div style={{ display: "flex", gap: 28, alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 24, letterSpacing: 5, color: "rgba(245,238,226,0.62)", textTransform: "uppercase" }}>
                aktualny tracker
              </div>
              <div style={{ fontSize: 78, fontWeight: 900, letterSpacing: -3, color: "#dc2320", lineHeight: 1 }}>
                {`${total} PLN`}
              </div>
            </div>
            <div style={{ width: 2, height: 92, background: "rgba(245,238,226,0.22)" }} />
            <div style={{ fontSize: 28, lineHeight: 1.18, maxWidth: 360, color: "rgba(245,238,226,0.78)" }}>
              Nieoficjalna tablica streamu: licznik, milestone’y, oś czasu i klipy.
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
