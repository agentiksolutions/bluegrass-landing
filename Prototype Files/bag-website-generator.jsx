import { useState } from "react";

const vibes = [
  { id: "clean", label: "Clean & Modern", desc: "Minimal, professional, lots of whitespace" },
  { id: "bold", label: "Bold & Confident", desc: "Dark tones, strong typography, high contrast" },
  { id: "warm", label: "Warm & Approachable", desc: "Earthy tones, friendly, inviting" },
  { id: "luxury", label: "Premium & Refined", desc: "Elegant, sophisticated, high-end feel" },
];

const WebsiteGenerator = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    businessName: "",
    whatYouDo: "",
    vibe: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [siteData, setSiteData] = useState(null);
  const [error, setError] = useState(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const canProceed = () => {
    if (step === 0) return formData.businessName.trim().length > 0 && formData.whatYouDo.trim().length > 0;
    if (step === 1) return formData.vibe.length > 0;
    return true;
  };

  const generateSite = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are a web designer for Bluegrass Advisory Group. Generate website content for a small business. Be specific to their actual business — no generic filler. Write like a human, not a marketing bot.

Business: ${formData.businessName}
What they do: ${formData.whatYouDo}
Location: ${formData.location || "Not specified"}
Design vibe: ${formData.vibe}

Respond ONLY in this exact JSON format, no markdown, no backticks:
{"tagline":"A short punchy headline for their hero section, 8 words max","subtext":"One sentence that explains what the business does and why someone should care. Specific to them.","sections":[{"title":"Section heading","content":"2-3 sentences of real copy for this section. Make it specific to what they actually do."},{"title":"Section heading","content":"2-3 sentences"},{"title":"Section heading","content":"2-3 sentences"}],"cta":"Call to action button text, 3-4 words max","colorPrimary":"A hex color that fits the vibe and industry","colorAccent":"A complementary accent hex color","fontVibe":"serif or sans-serif"}`
          }],
        }),
      });
      const data = await response.json();
      const text = data.content.map(i => i.text || "").join("");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setSiteData(parsed);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%", padding: "14px 18px", border: "2px solid #e0ddd8",
    borderRadius: "6px", fontSize: "15px", fontFamily: '"DM Sans", sans-serif',
    background: "#fff", outline: "none", transition: "border-color 0.2s",
    boxSizing: "border-box", color: "#1C1C1E",
  };

  // ─────────────── LIVE PREVIEW ───────────────
  if (siteData) {
    const isSerif = siteData.fontVibe === "serif";
    const headingFont = isSerif ? '"Playfair Display", Georgia, serif' : '"DM Sans", system-ui, sans-serif';
    const primary = siteData.colorPrimary || "#1C1C1E";
    const accent = siteData.colorAccent || "#0D7C66";

    return (
      <div style={{ fontFamily: '"DM Sans", sans-serif', background: "#1C1C1E", minHeight: "100vh", padding: "24px" }}>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

        {/* Browser chrome */}
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Top bar */}
          <div style={{
            background: "#2a2a2c", borderRadius: "10px 10px 0 0",
            padding: "12px 16px", display: "flex", alignItems: "center", gap: "8px",
          }}>
            <div style={{ display: "flex", gap: "6px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ffbd2e" }} />
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#28c840" }} />
            </div>
            <div style={{
              flex: 1, background: "#1a1a1c", borderRadius: "6px", padding: "6px 14px",
              fontSize: "12px", color: "#888", textAlign: "center", marginLeft: "8px",
            }}>
              {formData.businessName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com
            </div>
          </div>

          {/* The generated site */}
          <div style={{
            background: "#FAF8F5", borderRadius: "0 0 10px 10px",
            overflow: "hidden",
          }}>
            {/* Site nav */}
            <div style={{
              padding: "16px 40px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              borderBottom: "1px solid #eee",
            }}>
              <span style={{
                fontFamily: headingFont, fontSize: "18px", fontWeight: 700,
                color: primary,
              }}>{formData.businessName}</span>
              <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
                {["About", "Services", "Contact"].map(item => (
                  <span key={item} style={{
                    fontSize: "13px", color: "#888", fontWeight: 500,
                  }}>{item}</span>
                ))}
                <span style={{
                  background: accent, color: "#fff", padding: "8px 18px",
                  borderRadius: "4px", fontSize: "12px", fontWeight: 600,
                }}>{siteData.cta}</span>
              </div>
            </div>

            {/* Hero */}
            <div style={{
              padding: "80px 40px 60px",
              background: formData.vibe === "bold" ? primary : "transparent",
            }}>
              <h1 style={{
                fontFamily: headingFont,
                fontSize: "42px", fontWeight: 700, lineHeight: 1.15,
                letterSpacing: "-1px", marginBottom: "16px",
                color: formData.vibe === "bold" ? "#FAF8F5" : primary,
                maxWidth: "600px",
              }}>{siteData.tagline}</h1>
              <p style={{
                fontSize: "16px", lineHeight: 1.7, marginBottom: "32px",
                maxWidth: "500px",
                color: formData.vibe === "bold" ? "rgba(255,255,255,0.7)" : "#888",
              }}>{siteData.subtext}</p>
              <span style={{
                background: accent, color: "#fff", padding: "12px 28px",
                borderRadius: "4px", fontSize: "14px", fontWeight: 600,
                display: "inline-block",
              }}>{siteData.cta}</span>
            </div>

            {/* Sections */}
            <div style={{ padding: "0 40px 60px" }}>
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px",
                paddingTop: "48px",
              }}>
                {siteData.sections.map((section, i) => (
                  <div key={i} style={{
                    padding: "28px",
                    borderTop: `3px solid ${i === 0 ? accent : "#eee"}`,
                  }}>
                    <h3 style={{
                      fontFamily: headingFont,
                      fontSize: "18px", fontWeight: 700, marginBottom: "10px",
                      color: primary,
                    }}>{section.title}</h3>
                    <p style={{
                      fontSize: "13px", lineHeight: 1.7, color: "#888",
                    }}>{section.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fake footer */}
            <div style={{
              background: primary, padding: "32px 40px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{
                fontFamily: headingFont, fontSize: "16px", color: "#fff", fontWeight: 600,
              }}>{formData.businessName}</span>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                {formData.location || "Your City, Your State"}
              </span>
            </div>
          </div>

          {/* ─── Below the preview ─── */}
          <div style={{
            marginTop: "32px", padding: "36px",
            background: "#242426", borderRadius: "8px",
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            }}>
              <div>
                <p style={{
                  fontSize: "11px", fontWeight: 600, letterSpacing: "2px",
                  color: "#0D7C66", textTransform: "uppercase", marginBottom: "8px",
                }}>Preview Generated</p>
                <h3 style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "22px", fontWeight: 700, color: "#FAF8F5",
                  marginBottom: "8px",
                }}>This is what {formData.businessName} could look like.</h3>
                <p style={{
                  fontSize: "14px", color: "#888", lineHeight: 1.6, maxWidth: "420px",
                }}>
                  This is a quick concept — the real thing would be fully custom,
                  mobile-responsive, and built to convert. Want to talk about making
                  it real?
                </p>
              </div>

              {!showEmailCapture && !emailSent && (
                <button
                  onClick={() => setShowEmailCapture(true)}
                  style={{
                    background: "#0D7C66", color: "#FAF8F5", padding: "12px 28px",
                    borderRadius: "4px", border: "none", fontSize: "13px",
                    fontWeight: 600, cursor: "pointer", fontFamily: '"DM Sans", sans-serif',
                    whiteSpace: "nowrap", flexShrink: 0,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.target.style.background = "#2A9D8F"}
                  onMouseLeave={e => e.target.style.background = "#0D7C66"}
                >Send Me This</button>
              )}
            </div>

            {/* Email capture */}
            {showEmailCapture && !emailSent && (
              <div style={{
                marginTop: "24px", paddingTop: "24px", borderTop: "1px solid #333",
                display: "flex", gap: "12px", alignItems: "flex-end",
              }}>
                <div style={{ flex: 1 }}>
                  <label style={{
                    fontSize: "12px", color: "#666", display: "block", marginBottom: "6px",
                  }}>Your email</label>
                  <input
                    type="email"
                    placeholder="you@yourbusiness.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{
                      width: "100%", padding: "12px 16px",
                      border: "1px solid #444", borderRadius: "4px",
                      fontSize: "14px", fontFamily: '"DM Sans", sans-serif',
                      background: "#1C1C1E", color: "#FAF8F5", outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={e => e.target.style.borderColor = "#0D7C66"}
                    onBlur={e => e.target.style.borderColor = "#444"}
                    autoFocus
                  />
                </div>
                <button
                  onClick={() => { if (email.includes("@")) setEmailSent(true); }}
                  style={{
                    background: "#0D7C66", color: "#FAF8F5", padding: "12px 24px",
                    borderRadius: "4px", border: "none", fontSize: "13px",
                    fontWeight: 600, cursor: "pointer", fontFamily: '"DM Sans", sans-serif',
                    whiteSpace: "nowrap",
                  }}
                >Send</button>
              </div>
            )}

            {emailSent && (
              <div style={{
                marginTop: "24px", paddingTop: "24px", borderTop: "1px solid #333",
              }}>
                <p style={{ fontSize: "14px", color: "#0D7C66", fontWeight: 600 }}>
                  Done. We'll send this over along with a few ideas for {formData.businessName}.
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginTop: "20px",
          }}>
            <button
              onClick={() => { setSiteData(null); setStep(0); setFormData({ businessName: "", whatYouDo: "", vibe: "", location: "" }); setEmail(""); setEmailSent(false); setShowEmailCapture(false); }}
              style={{
                background: "none", border: "none", color: "#666",
                fontSize: "13px", cursor: "pointer", fontFamily: '"DM Sans", sans-serif',
              }}
            >Generate another</button>
            <button
              onClick={() => generateSite()}
              style={{
                background: "none", border: "1px solid #444", color: "#aaa",
                padding: "8px 20px", borderRadius: "4px",
                fontSize: "12px", cursor: "pointer", fontFamily: '"DM Sans", sans-serif',
              }}
            >Regenerate with same info</button>
          </div>

          {/* BAG branding */}
          <div style={{
            textAlign: "center", marginTop: "48px", paddingTop: "24px",
            borderTop: "1px solid #333",
          }}>
            <span style={{
              fontFamily: '"Playfair Display", serif', fontSize: "14px", color: "#666",
            }}>Bluegrass <span style={{ color: "#0D7C66" }}>Advisory</span></span>
            <span style={{ fontSize: "11px", color: "#444", margin: "0 10px" }}>·</span>
            <span style={{ fontSize: "11px", color: "#555" }}>Lexington, Kentucky</span>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────── FORM ───────────────
  return (
    <div style={{
      fontFamily: '"DM Sans", sans-serif', color: "#1C1C1E",
      background: "#FAF8F5", minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "40px 20px",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: "520px", width: "100%" }}>
        {/* Header */}
        <div style={{ marginBottom: "44px" }}>
          <div style={{
            fontFamily: '"Playfair Display", serif', fontSize: "20px",
            fontWeight: 700, marginBottom: "6px",
          }}>
            Bluegrass <span style={{ color: "#0D7C66" }}>Advisory</span>
          </div>
          <p style={{ fontSize: "13px", color: "#999" }}>Website Preview Generator</p>
        </div>

        {/* Progress */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "44px" }}>
          {[0, 1].map(i => (
            <div key={i} style={{
              flex: 1, height: "3px", borderRadius: "2px",
              background: i <= step ? "#0D7C66" : "#e0ddd8",
              transition: "background 0.3s",
            }} />
          ))}
        </div>

        {/* Step 0: Business info */}
        {step === 0 && (
          <div>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "28px", fontWeight: 700, marginBottom: "8px",
            }}>Tell us about your business.</h2>
            <p style={{ fontSize: "14px", color: "#999", marginBottom: "32px" }}>
              We'll generate a live website preview based on what you tell us.
            </p>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#1C1C1E", display: "block", marginBottom: "6px" }}>
                Business name
              </label>
              <input
                type="text"
                placeholder="e.g. Main Street Dental"
                value={formData.businessName}
                onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#0D7C66"}
                onBlur={e => e.target.style.borderColor = "#e0ddd8"}
                autoFocus
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#1C1C1E", display: "block", marginBottom: "6px" }}>
                What does your business do?
              </label>
              <textarea
                rows={3}
                placeholder="e.g. We're a family dentist office in Lexington. Cleanings, fillings, cosmetic work. Been open 12 years."
                value={formData.whatYouDo}
                onChange={e => setFormData({ ...formData, whatYouDo: e.target.value })}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={e => e.target.style.borderColor = "#0D7C66"}
                onBlur={e => e.target.style.borderColor = "#e0ddd8"}
              />
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#1C1C1E", display: "block", marginBottom: "6px" }}>
                Location (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Lexington, KY"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#0D7C66"}
                onBlur={e => e.target.style.borderColor = "#e0ddd8"}
              />
            </div>
          </div>
        )}

        {/* Step 1: Vibe */}
        {step === 1 && (
          <div>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "28px", fontWeight: 700, marginBottom: "8px",
            }}>Pick a style.</h2>
            <p style={{ fontSize: "14px", color: "#999", marginBottom: "32px" }}>
              This sets the tone for your preview. The real thing would be fully custom.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {vibes.map(v => (
                <button
                  key={v.id}
                  onClick={() => setFormData({ ...formData, vibe: v.id })}
                  style={{
                    padding: "18px 20px", borderRadius: "6px", textAlign: "left",
                    border: formData.vibe === v.id ? "2px solid #0D7C66" : "2px solid #e0ddd8",
                    background: formData.vibe === v.id ? "rgba(13,124,102,0.04)" : "#fff",
                    cursor: "pointer", transition: "all 0.2s",
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  <div style={{
                    fontSize: "15px", fontWeight: 600,
                    color: formData.vibe === v.id ? "#0D7C66" : "#1C1C1E",
                    marginBottom: "2px",
                  }}>{v.label}</div>
                  <div style={{ fontSize: "13px", color: "#999" }}>{v.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          marginTop: "44px", alignItems: "center",
        }}>
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)} style={{
              background: "none", border: "none", fontSize: "14px",
              color: "#999", cursor: "pointer", fontFamily: '"DM Sans", sans-serif',
            }}>Back</button>
          ) : <div />}

          {step < 1 ? (
            <button
              onClick={() => canProceed() && setStep(step + 1)}
              disabled={!canProceed()}
              style={{
                background: canProceed() ? "#1C1C1E" : "#ddd",
                color: canProceed() ? "#FAF8F5" : "#999",
                padding: "13px 28px", borderRadius: "4px", border: "none",
                fontSize: "14px", fontWeight: 600,
                cursor: canProceed() ? "pointer" : "default",
                fontFamily: '"DM Sans", sans-serif',
              }}
            >Continue</button>
          ) : (
            <button
              onClick={() => canProceed() && generateSite()}
              disabled={!canProceed() || loading}
              style={{
                background: canProceed() ? "#0D7C66" : "#ddd",
                color: "#FAF8F5", padding: "13px 28px", borderRadius: "4px",
                border: "none", fontSize: "14px", fontWeight: 600,
                cursor: canProceed() && !loading ? "pointer" : "default",
                fontFamily: '"DM Sans", sans-serif', minWidth: "200px",
              }}
            >{loading ? "Building your site..." : "Generate Preview"}</button>
          )}
        </div>

        {error && (
          <p style={{ color: "#c0392b", fontSize: "13px", marginTop: "16px", textAlign: "center" }}>{error}</p>
        )}

        <p style={{
          textAlign: "center", fontSize: "11px", color: "#ccc", marginTop: "44px",
        }}>Free. No signup. Takes about 10 seconds.</p>
      </div>
    </div>
  );
};

export default WebsiteGenerator;
