import { useState } from "react";

const industries = [
  "Restaurant / Food Service",
  "Retail / E-Commerce",
  "Construction / Trades",
  "Professional Services",
  "Healthcare / Wellness",
  "Real Estate",
  "Hospitality / Events",
  "Other",
];

const painPoints = [
  "Drowning in spreadsheets and manual processes",
  "No real visibility into my numbers",
  "Website is outdated or nonexistent",
  "Losing money but can't pinpoint where",
  "Staff turnover and training is killing us",
  "Spending too much time on admin work",
  "Can't keep up with competitors",
  "Don't know where to start with technology",
];

const DemoGenerator = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    locations: "1",
    painPoint: "",
    employees: "",
  });
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  const canProceed = () => {
    if (step === 0) return formData.businessName.trim().length > 0;
    if (step === 1) return formData.industry.length > 0;
    if (step === 2) return formData.painPoint.length > 0;
    return true;
  };

  const generateReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `You are an AI business consultant for Bluegrass Advisory Group, a tech consulting firm in Lexington, KY. A prospect just entered their info into our demo tool. Generate a SHORT, specific, actionable AI opportunity report for them. Be direct, no fluff, no generic advice. Sound like a real operator who knows their industry.

Business: ${formData.businessName}
Industry: ${formData.industry}
Locations: ${formData.locations}
Employees: ${formData.employees || "Not specified"}
Biggest pain point: ${formData.painPoint}

Respond ONLY in this exact JSON format, no markdown, no backticks:
{"headline":"One punchy line about their biggest opportunity","opportunities":[{"title":"Short title","impact":"High/Medium","description":"2-3 sentences, specific to their industry and pain point. What it does and why it matters.","savings":"Estimated time or money saved per month"},{"title":"Short title","impact":"High/Medium","description":"2-3 sentences","savings":"Estimate"},{"title":"Short title","impact":"Medium","description":"2-3 sentences","savings":"Estimate"}],"quickWin":"One thing they could do THIS WEEK with free tools to see immediate results. Be specific.","bottomLine":"One honest sentence about whether AI makes sense for them right now."}`
            }
          ],
        }),
      });
      const data = await response.json();
      const text = data.content.map(i => i.text || "").join("");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setReport(parsed);
    } catch (err) {
      console.error(err);
      setError("Something went wrong generating your report. Try again.");
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%", padding: "16px 20px", border: "2px solid #e0ddd8",
    borderRadius: "6px", fontSize: "16px", fontFamily: '"DM Sans", sans-serif',
    background: "#fff", outline: "none", transition: "border-color 0.2s",
    boxSizing: "border-box", color: "#1C1C1E",
  };

  const chipStyle = (selected) => ({
    padding: "12px 20px", borderRadius: "6px", fontSize: "14px",
    fontFamily: '"DM Sans", sans-serif', cursor: "pointer",
    border: selected ? "2px solid #0D7C66" : "2px solid #e0ddd8",
    background: selected ? "rgba(13,124,102,0.06)" : "#fff",
    color: selected ? "#0D7C66" : "#666",
    fontWeight: selected ? 600 : 400,
    transition: "all 0.2s ease",
  });

  const impactColor = (impact) => {
    if (impact === "High") return "#0D7C66";
    return "#B8860B";
  };

  // REPORT VIEW
  if (report) {
    return (
      <div style={{
        fontFamily: '"DM Sans", sans-serif', color: "#1C1C1E",
        background: "#FAF8F5", minHeight: "100vh", padding: "40px 20px",
      }}>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: "40px" }}>
            <div style={{
              fontSize: "11px", fontWeight: 600, letterSpacing: "2px",
              color: "#0D7C66", textTransform: "uppercase", marginBottom: "8px",
            }}>AI Opportunity Report</div>
            <div style={{
              fontSize: "13px", color: "#999", marginBottom: "20px",
            }}>Prepared for <strong style={{ color: "#1C1C1E" }}>{formData.businessName}</strong> · {formData.industry} · {formData.locations} location{formData.locations !== "1" ? "s" : ""}</div>
            <h1 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "32px", fontWeight: 700, lineHeight: 1.2,
              letterSpacing: "-0.5px",
            }}>{report.headline}</h1>
          </div>

          {/* Opportunities */}
          <div style={{ marginBottom: "40px" }}>
            <div style={{
              fontSize: "12px", fontWeight: 600, letterSpacing: "2px",
              color: "#999", textTransform: "uppercase", marginBottom: "20px",
            }}>Top Opportunities</div>

            {report.opportunities.map((opp, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: "8px", padding: "28px",
                marginBottom: "16px", border: "1px solid #e8e5e0",
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "flex-start", marginBottom: "12px",
                }}>
                  <h3 style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: "20px", fontWeight: 700,
                  }}>{opp.title}</h3>
                  <span style={{
                    fontSize: "11px", fontWeight: 700, letterSpacing: "1px",
                    color: impactColor(opp.impact), textTransform: "uppercase",
                    background: `${impactColor(opp.impact)}12`,
                    padding: "4px 10px", borderRadius: "3px", whiteSpace: "nowrap",
                  }}>{opp.impact} Impact</span>
                </div>
                <p style={{
                  fontSize: "14px", lineHeight: 1.7, color: "#666", marginBottom: "12px",
                }}>{opp.description}</p>
                <div style={{
                  fontSize: "13px", fontWeight: 600, color: "#0D7C66",
                }}>Est. savings: {opp.savings}</div>
              </div>
            ))}
          </div>

          {/* Quick Win */}
          <div style={{
            background: "#0D7C66", borderRadius: "8px", padding: "28px",
            marginBottom: "40px", color: "#FAF8F5",
          }}>
            <div style={{
              fontSize: "11px", fontWeight: 600, letterSpacing: "2px",
              textTransform: "uppercase", marginBottom: "12px", opacity: 0.7,
            }}>This Week's Quick Win</div>
            <p style={{ fontSize: "15px", lineHeight: 1.7 }}>{report.quickWin}</p>
          </div>

          {/* Bottom Line */}
          <div style={{
            borderTop: "1px solid #e0ddd8", paddingTop: "28px", marginBottom: "40px",
          }}>
            <div style={{
              fontSize: "12px", fontWeight: 600, letterSpacing: "2px",
              color: "#999", textTransform: "uppercase", marginBottom: "12px",
            }}>The Bottom Line</div>
            <p style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "20px", lineHeight: 1.5, fontWeight: 600, fontStyle: "italic",
              color: "#1C1C1E",
            }}>"{report.bottomLine}"</p>
          </div>

          {/* CTA */}
          <div style={{
            background: "#1C1C1E", borderRadius: "8px", padding: "36px",
            textAlign: "center", color: "#FAF8F5",
          }}>
            <h3 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "24px", fontWeight: 700, marginBottom: "12px",
            }}>Want to dig deeper?</h3>
            <p style={{
              fontSize: "14px", color: "#aaa", marginBottom: "24px", lineHeight: 1.6,
            }}>
              This report is a starting point. A 30-minute conversation gives us
              enough to tell you exactly what's worth building and what it would cost.
            </p>
            <a href="mailto:phil@bluegrassadvisorygroup.com" style={{
              background: "#0D7C66", color: "#FAF8F5", padding: "14px 32px",
              borderRadius: "4px", textDecoration: "none", fontSize: "14px",
              fontWeight: 600, display: "inline-block",
            }}>Schedule a Free Call</a>
            <p style={{
              fontSize: "12px", color: "#666", marginTop: "12px",
            }}>phil@bluegrassadvisorygroup.com</p>
          </div>

          {/* Restart */}
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <button onClick={() => { setReport(null); setStep(0); setFormData({ businessName: "", industry: "", locations: "1", painPoint: "", employees: "" }); }}
              style={{
                background: "none", border: "none", color: "#999",
                fontSize: "13px", cursor: "pointer", fontFamily: '"DM Sans", sans-serif',
              }}>Generate another report →</button>
          </div>

          <div style={{
            textAlign: "center", marginTop: "40px", paddingTop: "24px",
            borderTop: "1px solid #e8e5e0",
          }}>
            <span style={{
              fontFamily: '"Playfair Display", serif', fontSize: "16px",
              color: "#1C1C1E",
            }}>Bluegrass <span style={{ color: "#0D7C66" }}>Advisory</span></span>
            <span style={{ fontSize: "12px", color: "#ccc", margin: "0 12px" }}>·</span>
            <span style={{ fontSize: "12px", color: "#999" }}>Lexington, Kentucky</span>
          </div>
        </div>
      </div>
    );
  }

  // FORM VIEW
  return (
    <div style={{
      fontFamily: '"DM Sans", sans-serif', color: "#1C1C1E",
      background: "#FAF8F5", minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "40px 20px",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: "540px", width: "100%" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            fontFamily: '"Playfair Display", serif', fontSize: "22px",
            fontWeight: 700, marginBottom: "8px",
          }}>
            Bluegrass <span style={{ color: "#0D7C66" }}>Advisory</span>
          </div>
          <p style={{ fontSize: "14px", color: "#999" }}>AI Opportunity Report — Free, instant, no signup</p>
        </div>

        {/* Progress */}
        <div style={{
          display: "flex", gap: "4px", marginBottom: "48px",
        }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              flex: 1, height: "3px", borderRadius: "2px",
              background: i <= step ? "#0D7C66" : "#e0ddd8",
              transition: "background 0.3s",
            }} />
          ))}
        </div>

        {/* Step 0: Business Name */}
        {step === 0 && (
          <div>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "28px", fontWeight: 700, marginBottom: "8px",
            }}>What's your business called?</h2>
            <p style={{ fontSize: "14px", color: "#999", marginBottom: "32px" }}>
              We'll use this to personalize your report.
            </p>
            <input
              type="text"
              placeholder="e.g. Joe's BBQ, Apex Construction, Main St Salon"
              value={formData.businessName}
              onChange={e => setFormData({ ...formData, businessName: e.target.value })}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = "#0D7C66"}
              onBlur={e => e.target.style.borderColor = "#e0ddd8"}
              autoFocus
            />
            <div style={{ marginTop: "24px" }}>
              <label style={{ fontSize: "13px", color: "#999", display: "block", marginBottom: "8px" }}>
                How many employees? (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. 12"
                value={formData.employees}
                onChange={e => setFormData({ ...formData, employees: e.target.value })}
                style={{ ...inputStyle, width: "120px" }}
                onFocus={e => e.target.style.borderColor = "#0D7C66"}
                onBlur={e => e.target.style.borderColor = "#e0ddd8"}
              />
            </div>
          </div>
        )}

        {/* Step 1: Industry */}
        {step === 1 && (
          <div>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "28px", fontWeight: 700, marginBottom: "8px",
            }}>What kind of business?</h2>
            <p style={{ fontSize: "14px", color: "#999", marginBottom: "32px" }}>
              This helps us give industry-specific recommendations.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {industries.map(ind => (
                <button key={ind}
                  onClick={() => setFormData({ ...formData, industry: ind })}
                  style={chipStyle(formData.industry === ind)}
                >{ind}</button>
              ))}
            </div>
            <div style={{ marginTop: "24px" }}>
              <label style={{ fontSize: "13px", color: "#999", display: "block", marginBottom: "8px" }}>
                How many locations?
              </label>
              <div style={{ display: "flex", gap: "8px" }}>
                {["1", "2-3", "4-10", "10+"].map(n => (
                  <button key={n}
                    onClick={() => setFormData({ ...formData, locations: n })}
                    style={chipStyle(formData.locations === n)}
                  >{n}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Pain Point */}
        {step === 2 && (
          <div>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "28px", fontWeight: 700, marginBottom: "8px",
            }}>What's your biggest headache?</h2>
            <p style={{ fontSize: "14px", color: "#999", marginBottom: "32px" }}>
              Pick the one that costs you the most time or money.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {painPoints.map(pp => (
                <button key={pp}
                  onClick={() => setFormData({ ...formData, painPoint: pp })}
                  style={{
                    ...chipStyle(formData.painPoint === pp),
                    textAlign: "left",
                  }}
                >{pp}</button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          marginTop: "48px", alignItems: "center",
        }}>
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)} style={{
              background: "none", border: "none", fontSize: "14px",
              color: "#999", cursor: "pointer", fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
            }}>← Back</button>
          ) : <div />}

          {step < 2 ? (
            <button
              onClick={() => canProceed() && setStep(step + 1)}
              disabled={!canProceed()}
              style={{
                background: canProceed() ? "#1C1C1E" : "#ddd",
                color: canProceed() ? "#FAF8F5" : "#999",
                padding: "14px 32px", borderRadius: "4px", border: "none",
                fontSize: "14px", fontWeight: 600, cursor: canProceed() ? "pointer" : "default",
                fontFamily: '"DM Sans", sans-serif', transition: "background 0.2s",
              }}
            >Continue →</button>
          ) : (
            <button
              onClick={() => canProceed() && generateReport()}
              disabled={!canProceed() || loading}
              style={{
                background: canProceed() ? "#0D7C66" : "#ddd",
                color: "#FAF8F5", padding: "14px 32px", borderRadius: "4px",
                border: "none", fontSize: "14px", fontWeight: 600,
                cursor: canProceed() && !loading ? "pointer" : "default",
                fontFamily: '"DM Sans", sans-serif', transition: "background 0.2s",
                minWidth: "200px",
              }}
            >{loading ? "Analyzing your business..." : "Generate My Report"}</button>
          )}
        </div>

        {error && (
          <p style={{ color: "#c0392b", fontSize: "13px", marginTop: "16px", textAlign: "center" }}>
            {error}
          </p>
        )}

        {/* Footer note */}
        <p style={{
          textAlign: "center", fontSize: "12px", color: "#ccc",
          marginTop: "48px",
        }}>
          No email required. No data stored. Just a free look at what's possible.
        </p>
      </div>
    </div>
  );
};

export default DemoGenerator;
