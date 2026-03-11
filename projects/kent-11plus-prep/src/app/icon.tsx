import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a1a 0%, #12122a 50%, #0a0a1a 100%)",
          borderRadius: "96px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            opacity: 0.15,
            backgroundImage:
              "linear-gradient(rgba(100, 120, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 120, 255, 0.3) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Outer glow ring */}
        <div
          style={{
            position: "absolute",
            width: "420px",
            height: "420px",
            borderRadius: "84px",
            display: "flex",
            border: "3px solid rgba(0, 220, 255, 0.3)",
            boxShadow:
              "0 0 40px rgba(0, 220, 255, 0.2), inset 0 0 40px rgba(0, 220, 255, 0.05)",
          }}
        />
        {/* Inner content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "180px",
              fontWeight: 900,
              fontFamily: "monospace",
              color: "#00dcff",
              textShadow:
                "0 0 20px rgba(0, 220, 255, 0.6), 0 0 60px rgba(0, 220, 255, 0.3)",
              letterSpacing: "-4px",
              lineHeight: 1,
            }}
          >
            11+
          </span>
          <span
            style={{
              fontSize: "48px",
              fontWeight: 700,
              fontFamily: "monospace",
              color: "rgba(0, 220, 255, 0.6)",
              letterSpacing: "12px",
              textTransform: "uppercase",
            }}
          >
            TRAINER
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
