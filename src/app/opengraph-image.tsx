import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Bluegrass Advisory Group — AI Integration & Business Operations Consulting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#1C1C1E",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "8px",
              background: "#0D7C66",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FAF8F5",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            B
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#FAF8F5",
              letterSpacing: "2px",
              textTransform: "uppercase" as const,
            }}
          >
            Bluegrass Advisory Group
          </div>
        </div>
        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#FAF8F5",
            lineHeight: 1.15,
            marginBottom: "28px",
            maxWidth: "800px",
          }}
        >
          We help businesses figure out AI.
        </div>
        <div
          style={{
            fontSize: "22px",
            color: "#888888",
            lineHeight: 1.5,
            maxWidth: "700px",
          }}
        >
          AI integration, web design, dashboards, and operations consulting.
          Lexington, Kentucky.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            left: "80px",
            display: "flex",
            gap: "24px",
            fontSize: "14px",
            letterSpacing: "2px",
            textTransform: "uppercase" as const,
            color: "#0D7C66",
            fontWeight: 600,
          }}
        >
          <span>bluegrassadvisorygroup.com</span>
        </div>
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "8px",
            height: "100%",
            background: "#0D7C66",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
