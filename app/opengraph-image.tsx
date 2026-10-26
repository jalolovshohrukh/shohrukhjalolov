import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Shohrukh Jalolov — Entrepreneur, Business Developer & Founder";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 82% 18%, rgba(255,77,31,0.75), rgba(140,22,4,0.45) 32%, #0b0a09 62%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: "22px",
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "#aaa198",
          }}
        >
          Dushanbe, Tajikistan
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "112px", color: "#f3eee7", lineHeight: 1 }}>
            Shohrukh Jalolov
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "36px",
              color: "#aaa198",
              maxWidth: "900px",
              lineHeight: 1.25,
            }}
          >
            Entrepreneur, business developer & founder.
          </div>
        </div>

        <div style={{ display: "flex", gap: "44px", fontSize: "24px", color: "#f3eee7" }}>
          <span>CifarX</span>
          <span>Refresh</span>
          <span>Makon</span>
          <span>Spendly</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
