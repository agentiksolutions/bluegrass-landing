import { useState, useEffect } from "react";

const BAGLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navOpacity = Math.min(scrollY / 200, 0.95);

  return (
    <div style={{ fontFamily: '"DM Sans", sans-serif', color: "#1C1C1E", background: "#FAF8F5" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: `rgba(28, 28, 30, ${navOpacity})`,
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        transition: "all 0.3s ease",
        padding: "16px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{
          fontFamily: '"Playfair Display", serif', fontSize: "20px", fontWeight: 700,
          color: scrollY > 50 ? "#FAF8F5" : "#FAF8F5",
          letterSpacing: "-0.5px",
        }}>
          Bluegrass <span style={{ color: "#0D7C66" }}>Advisory</span>
        </div>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {["What We Do", "About", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s/g, "-")}`} style={{
              color: "#FAF8F5", textDecoration: "none", fontSize: "14px",
              fontWeight: 500, letterSpacing: "0.5px", opacity: 0.8,
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.8}
            >{item}</a>
          ))}
          <a href="#contact" style={{
            background: "#0D7C66", color: "#FAF8F5", padding: "10px 24px",
            borderRadius: "6px", textDecoration: "none", fontSize: "14px",
            fontWeight: 600, transition: "background 0.2s",
          }}
            onMouseEnter={e => e.target.style.background = "#2A9D8F"}
            onMouseLeave={e => e.target.style.background = "#0D7C66"}
          >Let's Talk</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "120px 40px 80px",
        maxWidth: "900px", margin: "0 auto",
      }}>
        <div style={{
          fontSize: "12px", fontWeight: 600, letterSpacing: "3px",
          color: "#0D7C66", marginBottom: "24px", textTransform: "uppercase",
        }}>
          Lexington, Kentucky
        </div>
        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.1,
          fontWeight: 700, marginBottom: "32px", letterSpacing: "-1px",
          color: "#1C1C1E",
        }}>
          Your business should be<br />
          using AI.<br />
          <span style={{ color: "#0D7C66", fontStyle: "italic" }}>You just don't know where to start.</span>
        </h1>
        <p style={{
          fontSize: "20px", lineHeight: 1.6, color: "#555",
          maxWidth: "600px", marginBottom: "48px",
        }}>
          We help small businesses cut through the hype, figure out what
          actually matters, and build systems they couldn't build on their own.
          No jargon. No overselling. Just results.
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a href="#contact" style={{
            background: "#1C1C1E", color: "#FAF8F5", padding: "16px 36px",
            borderRadius: "6px", textDecoration: "none", fontSize: "16px",
            fontWeight: 600, transition: "all 0.2s", display: "inline-block",
          }}
            onMouseEnter={e => { e.target.style.background = "#0D7C66"; }}
            onMouseLeave={e => { e.target.style.background = "#1C1C1E"; }}
          >Start a Conversation</a>
          <a href="#what-we-do" style={{
            background: "transparent", color: "#1C1C1E", padding: "16px 36px",
            borderRadius: "6px", textDecoration: "none", fontSize: "16px",
            fontWeight: 600, border: "2px solid #1C1C1E20",
            transition: "all 0.2s", display: "inline-block",
          }}
            onMouseEnter={e => { e.target.style.borderColor = "#0D7C66"; e.target.style.color = "#0D7C66"; }}
            onMouseLeave={e => { e.target.style.borderColor = "#1C1C1E20"; e.target.style.color = "#1C1C1E"; }}
          >See What We Do</a>
        </div>
      </section>

      {/* THIN DIVIDER */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ height: "1px", background: "#1C1C1E15" }} />
      </div>

      {/* WHAT WE DO */}
      <section id="what-we-do" style={{
        padding: "100px 40px", maxWidth: "900px", margin: "0 auto",
      }}>
        <div style={{
          fontSize: "12px", fontWeight: 600, letterSpacing: "3px",
          color: "#0D7C66", marginBottom: "16px", textTransform: "uppercase",
        }}>
          What We Actually Do
        </div>
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.15,
          fontWeight: 700, marginBottom: "24px", color: "#1C1C1E",
        }}>
          We meet you where you are.
        </h2>
        <p style={{
          fontSize: "18px", lineHeight: 1.7, color: "#555", marginBottom: "60px",
          maxWidth: "650px",
        }}>
          Most businesses we talk to aren't sure what AI can do for them.
          That's fine — that's exactly where we start. We learn your business first,
          then figure out where AI actually helps. Not everything needs AI.
          The things that do? We build them.
        </p>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "32px",
        }}>
          {[
            {
              title: "Websites That Work",
              desc: "Not templates. Professional sites built for your business that you actually own. Hosted, maintained, done right.",
              icon: "◈",
            },
            {
              title: "Dashboards & Reporting",
              desc: "See your numbers in one place instead of digging through five apps. Built to show you what matters, updated automatically.",
              icon: "◧",
            },
            {
              title: "AI That Fits Your Business",
              desc: "Research, document creation, customer communication, data analysis — trained on your business, not generic templates.",
              icon: "◉",
            },
            {
              title: "Operational Cleanup",
              desc: "We look at how your business actually runs — the tools, the processes, the gaps — and fix what's costing you time and money.",
              icon: "◫",
            },
          ].map((item, i) => (
            <div key={i} style={{
              padding: "36px 32px", background: "#fff",
              borderRadius: "8px", border: "1px solid #1C1C1E10",
              transition: "all 0.3s ease",
              cursor: "default",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#0D7C66";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#1C1C1E10";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: "28px", color: "#0D7C66", marginBottom: "16px" }}>{item.icon}</div>
              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: "20px", fontWeight: 700, marginBottom: "12px",
              }}>{item.title}</h3>
              <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#666" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section style={{
        background: "#1C1C1E", color: "#FAF8F5", padding: "100px 40px",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{
            fontSize: "12px", fontWeight: 600, letterSpacing: "3px",
            color: "#2A9D8F", marginBottom: "16px", textTransform: "uppercase",
          }}>
            Why Us
          </div>
          <h2 id="about" style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.15,
            fontWeight: 700, marginBottom: "24px",
          }}>
            Built by an operator, not a consultant.
          </h2>
          <p style={{
            fontSize: "18px", lineHeight: 1.7, color: "#aaa",
            maxWidth: "650px", marginBottom: "48px",
          }}>
            Phil Fifield spent 13 years in restaurant operations — from crew member
            to Director of Operations managing 3 locations and 85 employees. He didn't
            read about running businesses in a textbook. He's been in the weeds
            every day for over a decade.
          </p>
          <p style={{
            fontSize: "18px", lineHeight: 1.7, color: "#aaa",
            maxWidth: "650px", marginBottom: "60px",
          }}>
            Bluegrass Advisory Group exists because the tools he built for his own
            operation solve the same problems every growing business faces. We don't
            sell theory. We sell what works — because we use it ourselves, every day.
          </p>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
          }}>
            {[
              { num: "13", label: "years in operations" },
              { num: "3", label: "locations managed" },
              { num: "85", label: "employees" },
              { num: "KY", label: "based, KY focused" },
            ].map((item, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "48px", fontWeight: 700, color: "#0D7C66",
                  marginBottom: "8px",
                }}>{item.num}</div>
                <div style={{ fontSize: "14px", color: "#888", letterSpacing: "0.5px" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "100px 40px", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{
          fontSize: "12px", fontWeight: 600, letterSpacing: "3px",
          color: "#0D7C66", marginBottom: "16px", textTransform: "uppercase",
        }}>
          How It Works
        </div>
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.15,
          fontWeight: 700, marginBottom: "60px", color: "#1C1C1E",
        }}>
          Simple. Honest. No surprises.
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {[
            {
              step: "01",
              title: "We have a conversation",
              desc: "30 minutes, free, no pitch. We ask about your business — what's working, what's not, where you're spending time you shouldn't be. You ask us anything about AI. No stupid questions.",
            },
            {
              step: "02",
              title: "We tell you what's worth doing",
              desc: "Not everything needs AI. Not everything needs a new tool. We'll be straight with you about what would actually save you time or money — and what's just hype.",
            },
            {
              step: "03",
              title: "We build it. You own it.",
              desc: "Whatever we create — website, dashboard, system, process — it's yours. It runs without us. We don't build dependency. We build things that last.",
            },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", gap: "32px", alignItems: "flex-start",
            }}>
              <div style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: "56px", fontWeight: 700, color: "#0D7C6615",
                lineHeight: 1, minWidth: "80px",
              }}>{item.step}</div>
              <div>
                <h3 style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "24px", fontWeight: 700, marginBottom: "8px",
                }}>{item.title}</h3>
                <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#666", maxWidth: "550px" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING SIGNAL */}
      <section style={{
        background: "#F0EBE3", padding: "80px 40px",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: "clamp(28px, 3.5vw, 40px)", lineHeight: 1.2,
            fontWeight: 700, marginBottom: "16px", color: "#1C1C1E",
          }}>
            Discovery calls are free. Everything else is transparent.
          </h2>
          <p style={{
            fontSize: "17px", lineHeight: 1.7, color: "#666",
            maxWidth: "550px", margin: "0 auto 40px",
          }}>
            Websites start at $2,000. Assessments and roadmaps start at $500.
            Full system builds depend on scope — we'll tell you exactly what
            it costs before you commit to anything. 50% upfront, no hourly billing, no surprises.
          </p>
          <a href="#contact" style={{
            background: "#0D7C66", color: "#FAF8F5", padding: "16px 40px",
            borderRadius: "6px", textDecoration: "none", fontSize: "16px",
            fontWeight: 600, display: "inline-block", transition: "background 0.2s",
          }}
            onMouseEnter={e => e.target.style.background = "#2A9D8F"}
            onMouseLeave={e => e.target.style.background = "#0D7C66"}
          >Schedule a Free Discovery Call</a>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{
        padding: "100px 40px", maxWidth: "900px", margin: "0 auto",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
          <div>
            <div style={{
              fontSize: "12px", fontWeight: 600, letterSpacing: "3px",
              color: "#0D7C66", marginBottom: "16px", textTransform: "uppercase",
            }}>
              Get In Touch
            </div>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "36px", lineHeight: 1.2,
              fontWeight: 700, marginBottom: "24px", color: "#1C1C1E",
            }}>
              Let's figure out if we can help.
            </h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#666", marginBottom: "32px" }}>
              No sales pitch. No pressure. Just a conversation about your business
              and whether AI makes sense for where you are right now.
            </p>
            <div style={{ fontSize: "15px", color: "#888", lineHeight: 2 }}>
              <div><strong style={{ color: "#1C1C1E" }}>Email:</strong> phil@bluegrassadvisorygroup.com</div>
              <div><strong style={{ color: "#1C1C1E" }}>Based in:</strong> Lexington, Kentucky</div>
              <div><strong style={{ color: "#1C1C1E" }}>Response time:</strong> Usually within 24 hours</div>
            </div>
          </div>

          <div style={{
            background: "#fff", padding: "40px", borderRadius: "8px",
            border: "1px solid #1C1C1E10",
          }}>
            {["Your Name", "Your Email", "Tell us about your business"].map((label, i) => (
              <div key={i} style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block", fontSize: "13px", fontWeight: 600,
                  color: "#1C1C1E", marginBottom: "8px", letterSpacing: "0.5px",
                }}>{label}</label>
                {i < 2 ? (
                  <input type={i === 1 ? "email" : "text"} style={{
                    width: "100%", padding: "12px 16px", border: "1px solid #1C1C1E15",
                    borderRadius: "6px", fontSize: "15px", fontFamily: '"DM Sans", sans-serif',
                    background: "#FAF8F5", outline: "none", transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
                    onFocus={e => e.target.style.borderColor = "#0D7C66"}
                    onBlur={e => e.target.style.borderColor = "#1C1C1E15"}
                  />
                ) : (
                  <textarea rows={4} style={{
                    width: "100%", padding: "12px 16px", border: "1px solid #1C1C1E15",
                    borderRadius: "6px", fontSize: "15px", fontFamily: '"DM Sans", sans-serif',
                    background: "#FAF8F5", outline: "none", resize: "vertical",
                    transition: "border-color 0.2s", boxSizing: "border-box",
                  }}
                    placeholder="What kind of business do you run? What's your biggest headache right now?"
                    onFocus={e => e.target.style.borderColor = "#0D7C66"}
                    onBlur={e => e.target.style.borderColor = "#1C1C1E15"}
                  />
                )}
              </div>
            ))}
            <button style={{
              width: "100%", background: "#1C1C1E", color: "#FAF8F5",
              padding: "14px", border: "none", borderRadius: "6px",
              fontSize: "15px", fontWeight: 600, fontFamily: '"DM Sans", sans-serif',
              cursor: "pointer", transition: "background 0.2s",
            }}
              onMouseEnter={e => e.target.style.background = "#0D7C66"}
              onMouseLeave={e => e.target.style.background = "#1C1C1E"}
            >Send Message</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: "#1C1C1E", padding: "48px 40px", color: "#888",
      }}>
        <div style={{
          maxWidth: "900px", margin: "0 auto",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "16px",
        }}>
          <div>
            <div style={{
              fontFamily: '"Playfair Display", serif', fontSize: "18px",
              color: "#FAF8F5", marginBottom: "4px",
            }}>
              Bluegrass <span style={{ color: "#0D7C66" }}>Advisory</span>
            </div>
            <div style={{ fontSize: "13px" }}>Lexington, Kentucky</div>
          </div>
          <div style={{ fontSize: "13px" }}>
            © 2026 Bluegrass Advisory Group, LLC
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BAGLanding;
