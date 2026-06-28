import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Shohrukh Jalolov — Entrepreneur, Business Developer & Advisor";

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
          background: "#f7f6f3",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "40px", height: "4px", background: "#34503f" }} />
          <div
            style={{
              fontSize: "22px",
              letterSpacing: "6px",
              textTransform: "uppercase",
              color: "#8a847d",
              fontFamily: "monospace",
            }}
          >
            Dushanbe · Tajikistan
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "92px", color: "#16130f", lineHeight: 1.05 }}>
            Shohrukh Jalolov
          </div>
          <div
            style={{
              marginTop: "24px",
              fontSize: "34px",
              color: "#57514c",
              maxWidth: "900px",
              lineHeight: 1.3,
            }}
          >
            Entrepreneur, business developer & advisor. Building ventures and
            backing the founders behind them.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "28px",
            fontSize: "24px",
            color: "#34503f",
          }}
        >
          <span>CifarX</span>
          <span style={{ color: "#cfcabf" }}>·</span>
          <span>Refresh</span>
          <span style={{ color: "#cfcabf" }}>·</span>
          <span>SoftClub</span>
          <span style={{ color: "#cfcabf" }}>·</span>
          <span>Webmarker</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
