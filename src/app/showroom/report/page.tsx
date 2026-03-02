"use client";

import { useState } from "react";
import Link from "next/link";

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

interface Report {
  headline: string;
  opportunities: {
    title: string;
    impact: string;
    description: string;
    savings: string;
  }[];
  quickWin: string;
  bottomLine: string;
}

export default function ReportPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    locations: "1",
    painPoint: "",
    employees: "",
  });
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "report", formData }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setReport(data);
    } catch {
      setError("Something went wrong generating your report. Try again.");
    }
    setLoading(false);
  };

  const impactColor = (impact: string) =>
    impact === "High" ? "text-emerald bg-emerald/[0.07]" : "text-gold bg-gold/[0.07]";

  // ─── REPORT VIEW ───
  if (report) {
    return (
      <div className="min-h-screen px-5 py-10 pt-[108px]">
        <div className="max-w-[720px] mx-auto">
          <div className="mb-10">
            <div className="text-[11px] font-semibold tracking-[2px] text-emerald uppercase mb-2">
              AI Opportunity Report
            </div>
            <div className="text-[13px] text-stone mb-5">
              Prepared for{" "}
              <strong className="text-graphite">{formData.businessName}</strong>{" "}
              &middot; {formData.industry} &middot; {formData.locations} location
              {formData.locations !== "1" ? "s" : ""}
            </div>
            <h1 className="font-display text-[32px] font-bold leading-tight tracking-tight">
              {report.headline}
            </h1>
          </div>

          <div className="mb-10">
            <div className="text-xs font-semibold tracking-[2px] text-stone uppercase mb-5">
              Top Opportunities
            </div>
            {report.opportunities.map((opp, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-7 mb-4 border border-[#e8e5e0]"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display text-xl font-bold">{opp.title}</h3>
                  <span
                    className={`text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-[3px] whitespace-nowrap ${impactColor(
                      opp.impact
                    )}`}
                  >
                    {opp.impact} Impact
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-[#666] mb-3">
                  {opp.description}
                </p>
                <div className="text-[13px] font-semibold text-emerald">
                  Est. savings: {opp.savings}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-emerald rounded-lg p-7 mb-10 text-warm-white">
            <div className="text-[11px] font-semibold tracking-[2px] uppercase mb-3 opacity-70">
              This Week&apos;s Quick Win
            </div>
            <p className="text-[15px] leading-relaxed">{report.quickWin}</p>
          </div>

          <div className="border-t border-[#e0ddd8] pt-7 mb-10">
            <div className="text-xs font-semibold tracking-[2px] text-stone uppercase mb-3">
              The Bottom Line
            </div>
            <p className="font-display text-xl leading-relaxed font-semibold italic text-graphite">
              &ldquo;{report.bottomLine}&rdquo;
            </p>
          </div>

          <div className="bg-graphite rounded-lg p-9 text-center text-warm-white">
            <h3 className="font-display text-2xl font-bold mb-3">
              Want to dig deeper?
            </h3>
            <p className="text-sm text-[#aaa] mb-6 leading-relaxed">
              This report is a starting point. A 30-minute conversation gives us
              enough to tell you exactly what&apos;s worth building and what it
              would cost.
            </p>
            <a
              href="mailto:phil@bluegrassadvisorygroup.com"
              className="inline-block bg-emerald text-warm-white px-8 py-3.5 rounded text-sm font-semibold hover:bg-sage transition-colors"
            >
              Schedule a Free Call
            </a>
            <p className="text-xs text-[#666] mt-3">
              phil@bluegrassadvisorygroup.com
            </p>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => {
                setReport(null);
                setStep(0);
                setFormData({
                  businessName: "",
                  industry: "",
                  locations: "1",
                  painPoint: "",
                  employees: "",
                });
              }}
              className="text-stone text-[13px] hover:text-graphite transition-colors"
            >
              Generate another report &rarr;
            </button>
          </div>

          <div className="text-center mt-10 pt-6 border-t border-[#e8e5e0]">
            <span className="font-display text-base text-graphite">
              Bluegrass <span className="text-emerald">Advisory</span>
            </span>
            <span className="text-xs text-[#ccc] mx-3">&middot;</span>
            <span className="text-xs text-stone">Lexington, Kentucky</span>
          </div>
        </div>
      </div>
    );
  }

  // ─── FORM VIEW ───
  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10">
      <div className="max-w-[540px] w-full">
        <div className="text-center mb-12">
          <div className="font-display text-[22px] font-bold mb-2">
            Bluegrass <span className="text-emerald">Advisory</span>
          </div>
          <p className="text-sm text-stone">
            AI Opportunity Report — Free, instant, no signup
          </p>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-12">
          {[0, 1, 2].map((i) => (
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
              What&apos;s your business called?
            </h2>
            <p className="text-sm text-stone mb-8">
              We&apos;ll use this to personalize your report.
            </p>
            <input
              type="text"
              placeholder="e.g. Joe's BBQ, Apex Construction, Main St Salon"
              value={formData.businessName}
              onChange={(e) =>
                setFormData({ ...formData, businessName: e.target.value })
              }
              className="w-full p-4 border-2 border-[#e0ddd8] rounded-md text-base bg-white outline-none focus:border-emerald transition-colors"
              autoFocus
            />
            <div className="mt-6">
              <label className="text-[13px] text-stone block mb-2">
                How many employees? (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. 12"
                value={formData.employees}
                onChange={(e) =>
                  setFormData({ ...formData, employees: e.target.value })
                }
                className="w-[120px] p-4 border-2 border-[#e0ddd8] rounded-md text-base bg-white outline-none focus:border-emerald transition-colors"
              />
            </div>
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h2 className="font-display text-[28px] font-bold mb-2">
              What kind of business?
            </h2>
            <p className="text-sm text-stone mb-8">
              This helps us give industry-specific recommendations.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setFormData({ ...formData, industry: ind })}
                  className={`px-5 py-3 rounded-md text-sm transition-all cursor-pointer border-2 ${
                    formData.industry === ind
                      ? "border-emerald bg-emerald/[0.06] text-emerald font-semibold"
                      : "border-[#e0ddd8] bg-white text-[#666]"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
            <div className="mt-6">
              <label className="text-[13px] text-stone block mb-2">
                How many locations?
              </label>
              <div className="flex gap-2">
                {["1", "2-3", "4-10", "10+"].map((n) => (
                  <button
                    key={n}
                    onClick={() => setFormData({ ...formData, locations: n })}
                    className={`px-5 py-3 rounded-md text-sm transition-all cursor-pointer border-2 ${
                      formData.locations === n
                        ? "border-emerald bg-emerald/[0.06] text-emerald font-semibold"
                        : "border-[#e0ddd8] bg-white text-[#666]"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h2 className="font-display text-[28px] font-bold mb-2">
              What&apos;s your biggest headache?
            </h2>
            <p className="text-sm text-stone mb-8">
              Pick the one that costs you the most time or money.
            </p>
            <div className="flex flex-col gap-2.5">
              {painPoints.map((pp) => (
                <button
                  key={pp}
                  onClick={() => setFormData({ ...formData, painPoint: pp })}
                  className={`px-5 py-3 rounded-md text-sm text-left transition-all cursor-pointer border-2 ${
                    formData.painPoint === pp
                      ? "border-emerald bg-emerald/[0.06] text-emerald font-semibold"
                      : "border-[#e0ddd8] bg-white text-[#666]"
                  }`}
                >
                  {pp}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-12 items-center">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-sm text-stone font-medium hover:text-graphite transition-colors"
            >
              &larr; Back
            </button>
          ) : (
            <div />
          )}

          {step < 2 ? (
            <button
              onClick={() => canProceed() && setStep(step + 1)}
              disabled={!canProceed()}
              className={`px-8 py-3.5 rounded text-sm font-semibold transition-colors ${
                canProceed()
                  ? "bg-graphite text-warm-white hover:bg-emerald cursor-pointer"
                  : "bg-[#ddd] text-stone cursor-default"
              }`}
            >
              Continue &rarr;
            </button>
          ) : (
            <button
              onClick={() => canProceed() && generateReport()}
              disabled={!canProceed() || loading}
              className={`px-8 py-3.5 rounded text-sm font-semibold min-w-[200px] transition-colors ${
                canProceed() && !loading
                  ? "bg-emerald text-warm-white hover:bg-sage cursor-pointer"
                  : "bg-[#ddd] text-stone cursor-default"
              }`}
            >
              {loading ? "Analyzing your business..." : "Generate My Report"}
            </button>
          )}
        </div>

        {error && (
          <p className="text-[#c0392b] text-[13px] mt-4 text-center">{error}</p>
        )}

        <p className="text-center text-xs text-[#ccc] mt-12">
          No email required. No data stored. Just a free look at what&apos;s
          possible.
        </p>
      </div>
    </div>
  );
}
