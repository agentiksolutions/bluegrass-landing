import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Bluegrass Advisory Group. AI systems for Kentucky businesses, Lexington, Kentucky.";
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
          background: "#F2F1EC",
          fontFamily: "Helvetica, Arial, sans-serif",
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
              background: "#0033A0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
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
              color: "#161B22",
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
            color: "#161B22",
            lineHeight: 1.15,
            marginBottom: "28px",
            maxWidth: "800px",
          }}
        >
          I build AI systems for Kentucky businesses.
        </div>
        <div
          style={{
            fontSize: "22px",
            color: "#3B4350",
            lineHeight: 1.5,
            maxWidth: "700px",
          }}
        >
          Phil Fifield, Lexington, Kentucky.
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
            color: "#0033A0",
            fontWeight: 600,
          }}
        >
          <span>bluegrassadvisorygroup.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
