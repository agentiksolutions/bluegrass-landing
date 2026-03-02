import { useState, useEffect } from "react";

const BAGHomepageV3 = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [hoveredRoom, setHoveredRoom] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      num: "01",
      title: "Web Design & Development",
      brief: "Professional sites built for your business. Not templates — real design, real hosting, fully yours.",
    },
    {
      num: "02",
      title: "AI Integration",
      brief: "Research, reporting, document creation, customer tools — built around your actual workflow.",
    },
    {
      num: "03",
      title: "Dashboards & Data",
      brief: "One screen instead of five apps. Real-time numbers that help you make decisions, not just reports you ignore.",
    },
    {
      num: "04",
      title: "Operations Consulting",
      brief: "We look at how your business runs and fix what's costing you. Processes, tools, communication, all of it.",
    },
  ];

  const showroomRooms = [
    {
      icon: "⚡",
      title: "AI Opportunity Report",
      desc: "Enter your business info. Get a custom report on where AI can save you time and money.",
      tag: "Interactive",
    },
    {
      icon: "🖥",
      title: "Website Generator",
      desc: "See a live preview of what your business website could look like. Built in seconds.",
      tag: "Live Preview",
    },
    {
      icon: "📊",
      title: "Dashboard Demo",
      desc: "Explore a sample dashboard for your industry. See your numbers the way they should look.",
      tag: "Interactive",
    },
    {
      icon: "🎯",
      title: "Built Examples",
      desc: "Real sites and tools we've designed. Click through them, interact with them.",
      tag: "Portfolio",
    },
  ];

  const blogPosts = [
    {
      title: "What AI Actually Does for a Small Business in 2026",
      category: "AI Basics",
      read: "4 min read",
    },
    {
      title: "Why Your Business Needs a Dashboard, Not Another Spreadsheet",
      category: "Operations",
      read: "3 min read",
    },
    {
      title: "The Real Cost of an Outdated Website",
      category: "Web",
      read: "5 min read",
    },
  ];

  return (
    <div style={{ fontFamily: '"DM Sans", sans-serif', color: "#1C1C1E", background: "#FAF8F5" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 60 ? "rgba(250,248,245,0.97)" : "transparent",
        backdropFilter: scrollY > 60 ? "blur(16px)" : "none",
        borderBottom: scrollY > 60 ? "1px solid rgba(28,28,30,0.06)" : "1px solid transparent",
        transition: "all 0.35s ease",
        padding: "0 48px", height: "68px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{
          fontFamily: '"Playfair Display", serif', fontSize: "20px", fontWeight: 700,
          color: "#1C1C1E", letterSpacing: "-0.5px",
        }}>
          Bluegrass <span style={{ color: "#0D7C66" }}>Advisory</span>
        </div>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {["Services", "Showroom", "About", "Insights", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              color: "#1C1C1E", textDecoration: "none", fontSize: "13px",
              fontWeight: 500, opacity: 0.5, transition: "opacity 0.2s",
              letterSpacing: "0.3px",
            }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.5}
            >{item}</a>
          ))}
          <a href="#contact" style={{
            background: "#1C1C1E", color: "#FAF8F5", padding: "9px 22px",
            borderRadius: "4px", textDecoration: "none", fontSize: "13px",
            fontWeight: 600, transition: "background 0.2s",
          }}
            onMouseEnter={e => e.target.style.background = "#0D7C66"}
            onMouseLeave={e => e.target.style.background = "#1C1C1E"}
          >Let's Talk</a>
        </div>
      </nav>

      {/* ════════════════ HERO ════════════════ */}
      <section style={{
        paddingTop: "150px", paddingBottom: "60px",
        paddingLeft: "48px", paddingRight: "48px",
        maxWidth: "960px", margin: "0 auto",
      }}>
        <p style={{
          fontSize: "12px", fontWeight: 600, letterSpacing: "2.5px",
          color: "#0D7C66", marginBottom: "20px", textTransform: "uppercase",
        }}>Lexington, Kentucky</p>

        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: "clamp(38px, 5.5vw, 62px)", lineHeight: 1.1,
          fontWeight: 700, letterSpacing: "-1.5px", marginBottom: "28px",
        }}>
          We help businesses<br />figure out AI.
        </h1>

        <p style={{
          fontSize: "18px", lineHeight: 1.7, color: "#666",
          maxWidth: "520px", marginBottom: "44px",
        }}>
          Most companies know they should be doing something with AI but don't
          know where to start. We learn your business, find what's worth
          building, and build it.
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a href="#showroom" style={{
            background: "#0D7C66", color: "#FAF8F5", padding: "15px 32px",
            borderRadius: "4px", textDecoration: "none", fontSize: "15px",
            fontWeight: 600, transition: "all 0.2s",
          }}
            onMouseEnter={e => e.target.style.background = "#0a6b58"}
            onMouseLeave={e => e.target.style.background = "#0D7C66"}
          >Try the Showroom</a>
          <a href="#services" style={{
            background: "transparent", color: "#1C1C1E", padding: "15px 32px",
            borderRadius: "4px", textDecoration: "none", fontSize: "15px",
            fontWeight: 600, border: "1px solid #1C1C1E18",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => e.target.style.borderColor = "#1C1C1E"}
            onMouseLeave={e => e.target.style.borderColor = "#1C1C1E18"}
          >What We Do</a>
        </div>
      </section>

      {/* Thin accent line */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 48px" }}>
        <div style={{ height: "1px", background: "linear-gradient(to right, #0D7C6640, transparent)" }} />
      </div>

      {/* ════════════════ SHOWROOM ════════════════ */}
      <section id="showroom" style={{
        padding: "100px 48px", maxWidth: "960px", margin: "0 auto",
      }}>
        <div style={{ marginBottom: "56px" }}>
          <p style={{
            fontSize: "12px", fontWeight: 600, letterSpacing: "2.5px",
            color: "#0D7C66", marginBottom: "12px", textTransform: "uppercase",
          }}>Showroom</p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: "clamp(30px, 4vw, 42px)", fontWeight: 700,
            letterSpacing: "-0.5px", marginBottom: "12px",
          }}>Don't take our word for it. Try it.</h2>
          <p style={{ fontSize: "16px", color: "#888", maxWidth: "480px" }}>
            No signup. No sales pitch. Just tools you can use right now to see
            what AI can do for your business.
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px",
        }}>
          {showroomRooms.map((room, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredRoom(i)}
              onMouseLeave={() => setHoveredRoom(null)}
              style={{
                background: hoveredRoom === i ? "#fff" : "#FDFCFA",
                borderRadius: "8px", padding: "36px",
                border: hoveredRoom === i ? "1px solid #0D7C66" : "1px solid #e8e5e0",
                cursor: "pointer",
                transition: "all 0.3s ease",
                transform: hoveredRoom === i ? "translateY(-3px)" : "translateY(0)",
                boxShadow: hoveredRoom === i ? "0 12px 40px rgba(0,0,0,0.05)" : "none",
              }}
            >
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                marginBottom: "16px",
              }}>
                <span style={{ fontSize: "28px" }}>{room.icon}</span>
                <span style={{
                  fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px",
                  color: "#0D7C66", textTransform: "uppercase",
                  background: "rgba(13,124,102,0.07)", padding: "4px 10px",
                  borderRadius: "3px",
                }}>{room.tag}</span>
              </div>
              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: "20px", fontWeight: 700, marginBottom: "8px",
                color: hoveredRoom === i ? "#0D7C66" : "#1C1C1E",
                transition: "color 0.3s",
              }}>{room.title}</h3>
              <p style={{
                fontSize: "14px", lineHeight: 1.6, color: "#888",
              }}>{room.desc}</p>
              <div style={{
                marginTop: "20px", fontSize: "13px", fontWeight: 600,
                color: "#0D7C66",
                opacity: hoveredRoom === i ? 1 : 0,
                transition: "opacity 0.3s",
              }}>Try it →</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════ SERVICES ════════════════ */}
      <section id="services" style={{
        background: "#1C1C1E", padding: "100px 48px", color: "#FAF8F5",
      }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            marginBottom: "56px",
          }}>
            <div>
              <p style={{
                fontSize: "12px", fontWeight: 600, letterSpacing: "2.5px",
                color: "#2A9D8F", marginBottom: "12px", textTransform: "uppercase",
              }}>Services</p>
              <h2 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: "clamp(30px, 4vw, 42px)", fontWeight: 700,
                letterSpacing: "-0.5px",
              }}>What we build.</h2>
            </div>
            <a href="#" style={{
              fontSize: "13px", color: "#2A9D8F", textDecoration: "none", fontWeight: 600,
            }}>All services →</a>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {services.map((s, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveService(i)}
                style={{
                  padding: "28px 0",
                  borderTop: "1px solid #333",
                  display: "grid", gridTemplateColumns: "50px 1fr 1.2fr 40px",
                  alignItems: "center", gap: "28px",
                  cursor: "pointer", transition: "all 0.2s",
                }}
              >
                <span style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "13px", color: "#555",
                }}>{s.num}</span>
                <h3 style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "20px", fontWeight: 600,
                  color: activeService === i ? "#2A9D8F" : "#FAF8F5",
                  transition: "color 0.2s",
                }}>{s.title}</h3>
                <p style={{
                  fontSize: "13px", lineHeight: 1.6, color: "#777",
                  opacity: activeService === i ? 1 : 0,
                  transition: "opacity 0.3s",
                }}>{s.brief}</p>
                <span style={{
                  fontSize: "18px", color: "#2A9D8F", textAlign: "right",
                  opacity: activeService === i ? 1 : 0,
                  transition: "opacity 0.3s",
                }}>→</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #333" }} />
          </div>
        </div>
      </section>

      {/* ════════════════ VIDEO / ABOUT STRIP ════════════════ */}
      <section id="about" style={{
        padding: "100px 48px", maxWidth: "960px", margin: "0 auto",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>
          {/* Video placeholder */}
          <div style={{
            background: "#1C1C1E", borderRadius: "8px", aspectRatio: "16/9",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", position: "relative", overflow: "hidden",
          }}>
            <div style={{
              width: "64px", height: "64px", borderRadius: "50%",
              background: "rgba(13,124,102,0.9)", display: "flex",
              alignItems: "center", justifyContent: "center",
              transition: "transform 0.2s",
            }}>
              <div style={{
                width: 0, height: 0,
                borderTop: "10px solid transparent",
                borderBottom: "10px solid transparent",
                borderLeft: "16px solid #FAF8F5",
                marginLeft: "4px",
              }} />
            </div>
            <div style={{
              position: "absolute", bottom: "16px", left: "16px",
              fontSize: "11px", color: "#888", letterSpacing: "1px",
              textTransform: "uppercase", fontWeight: 600,
            }}>Kentucky – Where We Work</div>
          </div>

          <div>
            <p style={{
              fontSize: "12px", fontWeight: 600, letterSpacing: "2.5px",
              color: "#0D7C66", marginBottom: "12px", textTransform: "uppercase",
            }}>About</p>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "34px", fontWeight: 700, letterSpacing: "-0.5px",
              marginBottom: "20px",
            }}>Built by an operator.</h2>
            <p style={{
              fontSize: "15px", lineHeight: 1.8, color: "#666", marginBottom: "16px",
            }}>
              Phil Fifield spent 13 years in restaurant operations — from crew
              to Director of Operations. He built AI tools to run his own business
              better. Those same tools work for yours.
            </p>
            <p style={{
              fontSize: "15px", lineHeight: 1.8, color: "#666", marginBottom: "28px",
            }}>
              Based in Lexington, working with Kentucky businesses who want to
              modernize without getting sold a bunch of software they don't need.
            </p>
            <a href="#" style={{
              fontSize: "14px", color: "#0D7C66", textDecoration: "none",
              fontWeight: 600,
            }}>More about us →</a>
          </div>
        </div>
      </section>

      {/* ════════════════ INSIGHTS ════════════════ */}
      <section id="insights" style={{
        background: "#F0EBE3", padding: "100px 48px",
      }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            marginBottom: "48px",
          }}>
            <div>
              <p style={{
                fontSize: "12px", fontWeight: 600, letterSpacing: "2.5px",
                color: "#0D7C66", marginBottom: "12px", textTransform: "uppercase",
              }}>Insights</p>
              <h2 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: "clamp(30px, 4vw, 42px)", fontWeight: 700,
                letterSpacing: "-0.5px",
              }}>From the blog.</h2>
            </div>
            <a href="#" style={{
              fontSize: "13px", color: "#0D7C66", textDecoration: "none", fontWeight: 600,
            }}>All articles →</a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {blogPosts.map((post, i) => (
              <article key={i} style={{
                background: "#FAF8F5", borderRadius: "6px", padding: "32px",
                cursor: "pointer", transition: "all 0.25s ease",
                border: "1px solid transparent",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#0D7C66";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{
                  fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px",
                  color: "#0D7C66", textTransform: "uppercase",
                }}>{post.category}</span>
                <h3 style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "18px", fontWeight: 700, lineHeight: 1.35,
                  margin: "12px 0", color: "#1C1C1E",
                }}>{post.title}</h3>
                <span style={{ fontSize: "12px", color: "#bbb" }}>{post.read}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ CTA ════════════════ */}
      <section id="contact" style={{
        padding: "100px 48px",
      }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: "38px", fontWeight: 700, letterSpacing: "-0.5px",
            marginBottom: "16px",
          }}>Let's figure it out together.</h2>
          <p style={{
            fontSize: "16px", lineHeight: 1.7, color: "#888", marginBottom: "36px",
          }}>
            30 minutes. No sales pitch. Tell us about your business, ask us anything
            about AI. If we can help, we'll say so. If we can't, we'll say that too.
          </p>
          <a href="#" style={{
            background: "#1C1C1E", color: "#FAF8F5", padding: "16px 40px",
            borderRadius: "4px", textDecoration: "none", fontSize: "15px",
            fontWeight: 600, display: "inline-block", transition: "background 0.2s",
          }}
            onMouseEnter={e => e.target.style.background = "#0D7C66"}
            onMouseLeave={e => e.target.style.background = "#1C1C1E"}
          >Schedule a Call</a>
          <p style={{ marginTop: "14px", fontSize: "13px", color: "#bbb" }}>
            or email{" "}
            <a href="mailto:phil@bluegrassadvisorygroup.com" style={{
              color: "#0D7C66", textDecoration: "none",
            }}>phil@bluegrassadvisorygroup.com</a>
          </p>
        </div>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer style={{
        background: "#1C1C1E", padding: "56px 48px 28px", color: "#888",
      }}>
        <div style={{
          maxWidth: "960px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px",
          marginBottom: "40px",
        }}>
          <div>
            <div style={{
              fontFamily: '"Playfair Display", serif', fontSize: "18px",
              color: "#FAF8F5", marginBottom: "10px",
            }}>
              Bluegrass <span style={{ color: "#0D7C66" }}>Advisory</span>
            </div>
            <p style={{ fontSize: "12px", lineHeight: 1.7, color: "#555", maxWidth: "260px" }}>
              AI integration and business operations for companies ready to modernize.
            </p>
            <p style={{ fontSize: "12px", color: "#444", marginTop: "10px" }}>Lexington, Kentucky</p>
          </div>
          {[
            { title: "Services", items: ["Web Design", "AI Integration", "Dashboards", "Operations"] },
            { title: "Company", items: ["About", "Showroom", "Insights", "Contact"] },
            { title: "Connect", items: ["phil@bluegrassadvisorygroup.com", "Twitter", "LinkedIn"] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{
                fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px",
                color: "#555", textTransform: "uppercase", marginBottom: "14px",
              }}>{col.title}</div>
              {col.items.map(item => (
                <a key={item} href="#" style={{
                  display: "block", fontSize: "12px", color: "#777",
                  textDecoration: "none", marginBottom: "9px",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={e => e.target.style.color = "#FAF8F5"}
                  onMouseLeave={e => e.target.style.color = "#777"}
                >{item}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{
          borderTop: "1px solid #2a2a2a", paddingTop: "20px",
          fontSize: "11px", color: "#444",
          display: "flex", justifyContent: "space-between",
          maxWidth: "960px", margin: "0 auto",
        }}>
          <span>© 2026 Bluegrass Advisory Group, LLC</span>
          <span>Business Operations · AI Integration · Lexington, KY</span>
        </div>
      </footer>
    </div>
  );
};

export default BAGHomepageV3;
