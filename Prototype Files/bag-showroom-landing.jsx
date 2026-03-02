import { useState } from "react";

const rooms = [
  {
    id: "report",
    num: "01",
    title: "AI Opportunity Report",
    desc: "Enter your business info. Get a custom report on where AI can actually save you time and money. Specific to your industry, your size, your problems.",
    tag: "Interactive",
    time: "2 min",
    href: "/showroom/report",
  },
  {
    id: "website",
    num: "02",
    title: "Website Generator",
    desc: "See a live preview of what a professional website could look like for your business. Pick a style, describe what you do, and watch it build.",
    tag: "Live Preview",
    time: "1 min",
    href: "/showroom/website",
  },
  {
    id: "dashboard",
    num: "03",
    title: "Dashboard Demo",
    desc: "Explore an interactive dashboard for your industry. Real charts, real KPIs, real alerts. This is what your numbers look like when they're organized.",
    tag: "Interactive",
    time: "Browse",
    href: "/showroom/dashboard",
  },
  {
    id: "examples",
    num: "04",
    title: "Built Examples",
    desc: "Real sites and tools we've designed. Not mockups — fully functional builds you can click through and interact with.",
    tag: "Portfolio",
    time: "Browse",
    href: "/showroom/examples",
  },
];

const ShowroomLanding = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ fontFamily: '"DM Sans", sans-serif', color: "#1C1C1E", background: "#FAF8F5", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Nav */}
      <nav style={{
        padding: "0 48px", height: "68px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: "1px solid #eee",
      }}>
        <a href="/" style={{
          fontFamily: '"Playfair Display", serif', fontSize: "20px", fontWeight: 700,
          color: "#1C1C1E", letterSpacing: "-0.5px", textDecoration: "none",
        }}>
          Bluegrass <span style={{ color: "#0D7C66" }}>Advisory</span>
        </a>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {["Services", "About", "Insights", "Contact"].map(item => (
            <a key={item} href={`/${item.toLowerCase()}`} style={{
              color: "#1C1C1E", textDecoration: "none", fontSize: "13px",
              fontWeight: 500, opacity: 0.5, transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.5}
            >{item}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "80px 48px 0" }}>
        <p style={{
          fontSize: "12px", fontWeight: 600, letterSpacing: "2.5px",
          color: "#0D7C66", marginBottom: "16px", textTransform: "uppercase",
        }}>Showroom</p>
        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: "clamp(36px, 5vw, 52px)", lineHeight: 1.1,
          fontWeight: 700, letterSpacing: "-1px", marginBottom: "16px",
        }}>See it before you buy it.</h1>
        <p style={{
          fontSize: "17px", lineHeight: 1.7, color: "#888", maxWidth: "520px",
        }}>
          No signup. No sales pitch. Interactive tools that show you
          what AI can do for your business. Try as many as you want.
        </p>
      </div>

      {/* Room Grid */}
      <div style={{
        maxWidth: "960px", margin: "0 auto", padding: "60px 48px 100px",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px",
      }}>
        {rooms.map((room, i) => (
          <a
            key={room.id}
            href={room.href}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              textDecoration: "none", color: "#1C1C1E",
              background: hovered === i ? "#fff" : "#FDFCFA",
              borderRadius: "8px", padding: "40px",
              border: hovered === i ? "1px solid #0D7C66" : "1px solid #e8e5e0",
              transition: "all 0.3s ease",
              transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
              boxShadow: hovered === i ? "0 16px 48px rgba(0,0,0,0.06)" : "none",
              display: "block", position: "relative",
            }}
          >
            {/* Top row */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              marginBottom: "20px",
            }}>
              <span style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: "36px", fontWeight: 700,
                color: hovered === i ? "#0D7C66" : "#e8e5e0",
                transition: "color 0.3s", lineHeight: 1,
              }}>{room.num}</span>
              <div style={{ display: "flex", gap: "8px" }}>
                <span style={{
                  fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px",
                  color: "#0D7C66", textTransform: "uppercase",
                  background: "rgba(13,124,102,0.07)", padding: "4px 10px",
                  borderRadius: "3px",
                }}>{room.tag}</span>
                <span style={{
                  fontSize: "10px", fontWeight: 600, letterSpacing: "1px",
                  color: "#999", textTransform: "uppercase",
                  background: "#f5f4f2", padding: "4px 10px",
                  borderRadius: "3px",
                }}>{room.time}</span>
              </div>
            </div>

            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "24px", fontWeight: 700, marginBottom: "10px",
              color: hovered === i ? "#0D7C66" : "#1C1C1E",
              transition: "color 0.3s",
            }}>{room.title}</h2>

            <p style={{
              fontSize: "14px", lineHeight: 1.65, color: "#888",
              marginBottom: "24px",
            }}>{room.desc}</p>

            <span style={{
              fontSize: "13px", fontWeight: 600, color: "#0D7C66",
              opacity: hovered === i ? 1 : 0,
              transition: "opacity 0.3s",
            }}>Try it now →</span>
          </a>
        ))}
      </div>

      {/* Bottom strip */}
      <div style={{
        background: "#1C1C1E", padding: "56px 48px",
      }}>
        <div style={{
          maxWidth: "960px", margin: "0 auto",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <h3 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "24px", fontWeight: 700, color: "#FAF8F5",
              marginBottom: "8px",
            }}>Seen enough?</h3>
            <p style={{ fontSize: "14px", color: "#888", lineHeight: 1.6 }}>
              30 minutes. No pitch. Tell us about your business and we'll tell
              you what's worth building.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
            <a href="/contact" style={{
              background: "#0D7C66", color: "#FAF8F5", padding: "13px 28px",
              borderRadius: "4px", textDecoration: "none", fontSize: "14px",
              fontWeight: 600, transition: "background 0.2s",
            }}
              onMouseEnter={e => e.target.style.background = "#2A9D8F"}
              onMouseLeave={e => e.target.style.background = "#0D7C66"}
            >Schedule a Call</a>
            <a href="mailto:phil@bluegrassadvisorygroup.com" style={{
              background: "transparent", color: "#888", padding: "13px 28px",
              borderRadius: "4px", textDecoration: "none", fontSize: "14px",
              fontWeight: 600, border: "1px solid #444",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "#888"; e.target.style.color = "#FAF8F5"; }}
              onMouseLeave={e => { e.target.style.borderColor = "#444"; e.target.style.color = "#888"; }}
            >Email Us</a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: "#1C1C1E", borderTop: "1px solid #2a2a2a",
        padding: "20px 48px",
      }}>
        <div style={{
          maxWidth: "960px", margin: "0 auto",
          display: "flex", justifyContent: "space-between",
          fontSize: "11px", color: "#444",
        }}>
          <span>© 2026 Bluegrass Advisory Group, LLC</span>
          <span>Lexington, Kentucky</span>
        </div>
      </div>
    </div>
  );
};

export default ShowroomLanding;
