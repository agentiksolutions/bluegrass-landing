"use client";

import { useState } from "react";

const vibes = [
  {
    id: "clean",
    label: "Clean & Modern",
    desc: "Minimal, professional, lots of whitespace",
  },
  {
    id: "bold",
    label: "Bold & Confident",
    desc: "Dark tones, strong typography, high contrast",
  },
  {
    id: "warm",
    label: "Warm & Approachable",
    desc: "Earthy tones, friendly, inviting",
  },
  {
    id: "luxury",
    label: "Premium & Refined",
    desc: "Elegant, sophisticated, high-end feel",
  },
];

interface SiteData {
  tagline: string;
  subtext: string;
  sections: { title: string; content: string }[];
  cta: string;
  colorPrimary: string;
  colorAccent: string;
  fontVibe: string;
}

export default function WebsiteGeneratorPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    businessName: "",
    whatYouDo: "",
    vibe: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const canProceed = () => {
    if (step === 0)
      return (
        formData.businessName.trim().length > 0 &&
        formData.whatYouDo.trim().length > 0
      );
    if (step === 1) return formData.vibe.length > 0;
    return true;
  };

  const generateSite = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "website", formData }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setSiteData(data);
    } catch {
      setError("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  // ─── LIVE PREVIEW ───
  if (siteData) {
    const isSerif = siteData.fontVibe === "serif";
    const headingFont = isSerif
      ? "font-display"
      : "font-body";
    const primary = siteData.colorPrimary || "#1C1C1E";
    const accent = siteData.colorAccent || "#0D7C66";

    return (
      <div className="min-h-screen bg-graphite p-6 pt-[92px]">
        <div className="max-w-[900px] mx-auto">
          {/* Browser chrome */}
          <div className="bg-[#2a2a2c] rounded-t-[10px] px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 bg-[#1a1a1c] rounded-md px-3.5 py-1.5 text-xs text-stone text-center ml-2">
              {formData.businessName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com
            </div>
          </div>

          {/* Generated site */}
          <div className="bg-warm-white rounded-b-[10px] overflow-hidden">
            {/* Site nav */}
            <div className="px-10 py-4 flex justify-between items-center border-b border-[#eee]">
              <span
                className={`${headingFont} text-lg font-bold`}
                style={{ color: primary }}
              >
                {formData.businessName}
              </span>
              <div className="flex gap-6 items-center">
                {["About", "Services", "Contact"].map((item) => (
                  <span key={item} className="text-[13px] text-stone font-medium">
                    {item}
                  </span>
                ))}
                <span
                  className="text-white px-[18px] py-2 rounded text-xs font-semibold"
                  style={{ background: accent }}
                >
                  {siteData.cta}
                </span>
              </div>
            </div>

            {/* Hero */}
            <div
              className="px-10 pt-20 pb-16"
              style={{
                background:
                  formData.vibe === "bold" ? primary : "transparent",
              }}
            >
              <h1
                className={`${headingFont} text-[42px] font-bold leading-[1.15] tracking-tight mb-4 max-w-[600px]`}
                style={{
                  color: formData.vibe === "bold" ? "#FAF8F5" : primary,
                }}
              >
                {siteData.tagline}
              </h1>
              <p
                className="text-base leading-relaxed mb-8 max-w-[500px]"
                style={{
                  color:
                    formData.vibe === "bold"
                      ? "rgba(255,255,255,0.7)"
                      : "#888",
                }}
              >
                {siteData.subtext}
              </p>
              <span
                className="inline-block text-white px-7 py-3 rounded text-sm font-semibold"
                style={{ background: accent }}
              >
                {siteData.cta}
              </span>
            </div>

            {/* Sections */}
            <div className="px-10 pb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
                {siteData.sections.map((section, i) => (
                  <div
                    key={i}
                    className="p-7"
                    style={{
                      borderTop: `3px solid ${i === 0 ? accent : "#eee"}`,
                    }}
                  >
                    <h3
                      className={`${headingFont} text-lg font-bold mb-2.5`}
                      style={{ color: primary }}
                    >
                      {section.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-stone">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fake footer */}
            <div
              className="px-10 py-8 flex justify-between items-center"
              style={{ background: primary }}
            >
              <span
                className={`${headingFont} text-base text-white font-semibold`}
              >
                {formData.businessName}
              </span>
              <span className="text-xs text-white/40">
                {formData.location || "Your City, Your State"}
              </span>
            </div>
          </div>

          {/* Below preview */}
          <div className="mt-8 p-9 bg-[#242426] rounded-lg">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <p className="text-[11px] font-semibold tracking-[2px] text-emerald uppercase mb-2">
                  Preview Generated
                </p>
                <h3 className="font-display text-[22px] font-bold text-warm-white mb-2">
                  This is what {formData.businessName} could look like.
                </h3>
                <p className="text-sm text-stone leading-relaxed max-w-[420px]">
                  This is a quick concept — the real thing would be fully custom,
                  mobile-responsive, and built to convert. Want to talk about
                  making it real?
                </p>
              </div>

              {!showEmailCapture && !emailSent && (
                <button
                  onClick={() => setShowEmailCapture(true)}
                  className="bg-emerald text-warm-white px-7 py-3 rounded text-[13px] font-semibold whitespace-nowrap shrink-0 hover:bg-sage transition-colors cursor-pointer"
                >
                  Send Me This
                </button>
              )}
            </div>

            {showEmailCapture && !emailSent && (
              <div className="mt-6 pt-6 border-t border-[#333] flex gap-3 items-end">
                <div className="flex-1">
                  <label className="text-xs text-[#666] block mb-1.5">
                    Your email
                  </label>
                  <input
                    type="email"
                    placeholder="you@yourbusiness.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-[#444] rounded bg-graphite text-warm-white text-sm outline-none focus:border-emerald transition-colors"
                    autoFocus
                  />
                </div>
                <button
                  onClick={() => {
                    if (email.includes("@")) setEmailSent(true);
                  }}
                  className="bg-emerald text-warm-white px-6 py-3 rounded text-[13px] font-semibold whitespace-nowrap cursor-pointer hover:bg-sage transition-colors"
                >
                  Send
                </button>
              </div>
            )}

            {emailSent && (
              <div className="mt-6 pt-6 border-t border-[#333]">
                <p className="text-sm text-emerald font-semibold">
                  Done. We&apos;ll send this over along with a few ideas for{" "}
                  {formData.businessName}.
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-5">
            <button
              onClick={() => {
                setSiteData(null);
                setStep(0);
                setFormData({
                  businessName: "",
                  whatYouDo: "",
                  vibe: "",
                  location: "",
                });
                setEmail("");
                setEmailSent(false);
                setShowEmailCapture(false);
              }}
              className="text-[#666] text-[13px] hover:text-warm-white transition-colors cursor-pointer"
            >
              Generate another
            </button>
            <button
              onClick={() => generateSite()}
              className="border border-[#444] text-[#aaa] px-5 py-2 rounded text-xs cursor-pointer hover:border-stone hover:text-warm-white transition-colors"
            >
              Regenerate with same info
            </button>
          </div>

          <div className="text-center mt-12 pt-6 border-t border-[#333]">
            <span className="font-display text-sm text-[#666]">
              Bluegrass <span className="text-emerald">Advisory</span>
            </span>
            <span className="text-[11px] text-[#444] mx-2.5">&middot;</span>
            <span className="text-[11px] text-[#555]">Lexington, Kentucky</span>
          </div>
        </div>
      </div>
    );
  }

  // ─── FORM ───
  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10">
      <div className="max-w-[520px] w-full">
        <div className="mb-11">
          <div className="font-display text-xl font-bold mb-1.5">
            Bluegrass <span className="text-emerald">Advisory</span>
          </div>
          <p className="text-[13px] text-stone">Website Preview Generator</p>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-11">
          {[0, 1].map((i) => (
            <div
              key={i}
              className={`flex-1 h-[3px] rounded-sm transition-colors duration-300 ${
                i <= step ? "bg-emerald" : "bg-[#e0ddd8]"
              }`}
            />
          ))}
        </div>

        {/* Step 0 */}
        {step === 0 && (
          <div>
            <h2 className="font-display text-[28px] font-bold mb-2">
              Tell us about your business.
            </h2>
            <p className="text-sm text-stone mb-8">
              We&apos;ll generate a live website preview based on what you tell
              us.
            </p>

            <div className="mb-5">
              <label className="text-xs font-semibold text-graphite block mb-1.5">
                Business name
              </label>
              <input
                type="text"
                placeholder="e.g. Main Street Dental"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
                className="w-full px-[18px] py-3.5 border-2 border-[#e0ddd8] rounded-md text-[15px] bg-white outline-none focus:border-emerald transition-colors"
                autoFocus
              />
            </div>

            <div className="mb-5">
              <label className="text-xs font-semibold text-graphite block mb-1.5">
                What does your business do?
              </label>
              <textarea
                rows={3}
                placeholder="e.g. We're a family dentist office in Lexington. Cleanings, fillings, cosmetic work. Been open 12 years."
                value={formData.whatYouDo}
                onChange={(e) =>
                  setFormData({ ...formData, whatYouDo: e.target.value })
                }
                className="w-full px-[18px] py-3.5 border-2 border-[#e0ddd8] rounded-md text-[15px] bg-white outline-none focus:border-emerald transition-colors resize-y"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-graphite block mb-1.5">
                Location (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Lexington, KY"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-[18px] py-3.5 border-2 border-[#e0ddd8] rounded-md text-[15px] bg-white outline-none focus:border-emerald transition-colors"
              />
            </div>
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h2 className="font-display text-[28px] font-bold mb-2">
              Pick a style.
            </h2>
            <p className="text-sm text-stone mb-8">
              This sets the tone for your preview. The real thing would be fully
              custom.
            </p>
            <div className="flex flex-col gap-2.5">
              {vibes.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setFormData({ ...formData, vibe: v.id })}
                  className={`p-[18px_20px] rounded-md text-left transition-all cursor-pointer border-2 ${
                    formData.vibe === v.id
                      ? "border-emerald bg-emerald/[0.04]"
                      : "border-[#e0ddd8] bg-white"
                  }`}
                >
                  <div
                    className={`text-[15px] font-semibold mb-0.5 ${
                      formData.vibe === v.id ? "text-emerald" : "text-graphite"
                    }`}
                  >
                    {v.label}
                  </div>
                  <div className="text-[13px] text-stone">{v.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-11 items-center">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-sm text-stone hover:text-graphite transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 1 ? (
            <button
              onClick={() => canProceed() && setStep(step + 1)}
              disabled={!canProceed()}
              className={`px-7 py-3.5 rounded text-sm font-semibold transition-colors ${
                canProceed()
                  ? "bg-graphite text-warm-white hover:bg-emerald cursor-pointer"
                  : "bg-[#ddd] text-stone cursor-default"
              }`}
            >
              Continue
            </button>
          ) : (
            <button
              onClick={() => canProceed() && generateSite()}
              disabled={!canProceed() || loading}
              className={`px-7 py-3.5 rounded text-sm font-semibold min-w-[200px] transition-colors ${
                canProceed() && !loading
                  ? "bg-emerald text-warm-white hover:bg-sage cursor-pointer"
                  : "bg-[#ddd] text-stone cursor-default"
              }`}
            >
              {loading ? "Building your site..." : "Generate Preview"}
            </button>
          )}
        </div>

        {error && (
          <p className="text-[#c0392b] text-[13px] mt-4 text-center">{error}</p>
        )}

        <p className="text-center text-[11px] text-[#ccc] mt-11">
          Free. No signup. Takes about 10 seconds.
        </p>
      </div>
    </div>
  );
}
