"use client";

import { useState } from "react";
import SectionLabel from "@/components/section-label";

type FormState = {
  contact_name: string;
  contact_role: string;
  email: string;
  company_name: string;
  company_website: string;
  annual_revenue_range: string;
  num_entities: string;
  ai_question: string;
  best_call_time: string;
};

const initialState: FormState = {
  contact_name: "",
  contact_role: "",
  email: "",
  company_name: "",
  company_website: "",
  annual_revenue_range: "",
  num_entities: "",
  ai_question: "",
  best_call_time: "",
};

const REVENUE_OPTIONS = [
  { value: "", label: "Select range" },
  { value: "under_1m", label: "Under $1M" },
  { value: "1m_to_5m", label: "$1M – $5M" },
  { value: "5m_to_15m", label: "$5M – $15M" },
  { value: "15m_to_50m", label: "$15M – $50M" },
  { value: "over_50m", label: "Over $50M" },
];

const ENTITIES_OPTIONS = [
  { value: "", label: "Select" },
  { value: "1", label: "1" },
  { value: "2-3", label: "2 – 3" },
  { value: "4-7", label: "4 – 7" },
  { value: "8+", label: "8+" },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/phil-bluegrassadvisorygroup/30min";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error ||
            "Something went wrong. Please try again or email phil@bluegrassadvisorygroup.com directly.",
        );
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        "Network error. Please try again or email phil@bluegrassadvisorygroup.com directly.",
      );
      setSubmitting(false);
    }
  };

  return (
    <section className="pt-[148px] pb-24 px-6 md:px-12 max-w-content mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* Left column — info */}
        <div>
          <SectionLabel>Get Started</SectionLabel>
          <h1 className="font-display text-4xl leading-tight font-bold tracking-tight mb-6">
            Let&apos;s figure out if we can help.
          </h1>
          <p className="text-base leading-relaxed text-charcoal mb-8">
            No sales pitch. No pressure. A few quick questions, then a free
            30-minute intro call to scope what makes sense for your business —
            or honestly tell you if AI isn&apos;t your bottleneck right now.
          </p>

          <div className="text-[15px] text-stone space-y-3 mb-10">
            <div>
              <strong className="text-graphite">Email:</strong>{" "}
              <a
                href="mailto:phil@bluegrassadvisorygroup.com"
                className="text-emerald hover:underline"
              >
                phil@bluegrassadvisorygroup.com
              </a>
            </div>
            <div>
              <strong className="text-graphite">Phone:</strong>{" "}
              <a
                href="tel:+18593143051"
                className="text-emerald hover:underline"
              >
                (859) 314-3051
              </a>
            </div>
            <div>
              <strong className="text-graphite">Based in:</strong> Lexington,
              Kentucky
            </div>
            <div>
              <strong className="text-graphite">Response time:</strong> Within
              24 hours
            </div>
          </div>

          <div className="bg-cream p-6 rounded-lg border border-graphite/[0.06]">
            <div className="text-[12px] font-semibold tracking-wide text-emerald uppercase mb-2">
              What happens next
            </div>
            <ol className="text-[14px] text-charcoal leading-relaxed space-y-2 list-decimal list-inside">
              <li>You submit this form (~3 min)</li>
              <li>I review and reply within 24 hours</li>
              <li>We schedule a free 30-min call</li>
              <li>
                You get an honest recommendation — Quickstart, Strategic
                Roadmap, ongoing advisory, or sometimes &ldquo;you don&apos;t
                need us right now.&rdquo;
              </li>
            </ol>
          </div>
        </div>

        {/* Right column — form or success */}
        <div className="bg-white p-10 rounded-lg border border-graphite/[0.06]">
          {submitted ? (
            <SuccessState
              calendlyUrl={calendlyUrl}
              contactName={form.contact_name}
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name + Role row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-graphite mb-2 tracking-wide">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="contact_name"
                    value={form.contact_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-graphite/[0.08] rounded-md text-[15px] bg-warm-white outline-none focus:border-emerald transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-graphite mb-2 tracking-wide">
                    Your Role
                  </label>
                  <input
                    type="text"
                    name="contact_role"
                    value={form.contact_role}
                    onChange={handleChange}
                    placeholder="CEO, COO, Operator..."
                    className="w-full px-4 py-3 border border-graphite/[0.08] rounded-md text-[15px] bg-warm-white outline-none focus:border-emerald transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[13px] font-semibold text-graphite mb-2 tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-graphite/[0.08] rounded-md text-[15px] bg-warm-white outline-none focus:border-emerald transition-colors"
                />
              </div>

              {/* Company name + Website row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-graphite mb-2 tracking-wide">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={form.company_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-graphite/[0.08] rounded-md text-[15px] bg-warm-white outline-none focus:border-emerald transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-graphite mb-2 tracking-wide">
                    Website{" "}
                    <span className="text-stone font-normal text-[12px]">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="company_website"
                    value={form.company_website}
                    onChange={handleChange}
                    placeholder="example.com"
                    className="w-full px-4 py-3 border border-graphite/[0.08] rounded-md text-[15px] bg-warm-white outline-none focus:border-emerald transition-colors"
                  />
                </div>
              </div>

              {/* Revenue + Entities row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-graphite mb-2 tracking-wide">
                    Annual Revenue
                  </label>
                  <select
                    name="annual_revenue_range"
                    value={form.annual_revenue_range}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-graphite/[0.08] rounded-md text-[15px] bg-warm-white outline-none focus:border-emerald transition-colors"
                  >
                    {REVENUE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-graphite mb-2 tracking-wide">
                    Entities / Business Units
                  </label>
                  <select
                    name="num_entities"
                    value={form.num_entities}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-graphite/[0.08] rounded-md text-[15px] bg-warm-white outline-none focus:border-emerald transition-colors"
                  >
                    {ENTITIES_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* AI Question */}
              <div>
                <label className="block text-[13px] font-semibold text-graphite mb-2 tracking-wide">
                  What&apos;s your biggest AI question or need?
                </label>
                <textarea
                  name="ai_question"
                  value={form.ai_question}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="A few sentences on what you're trying to figure out, what you've tried, what's blocking you..."
                  className="w-full px-4 py-3 border border-graphite/[0.08] rounded-md text-[15px] bg-warm-white outline-none focus:border-emerald transition-colors resize-none"
                />
              </div>

              {/* Best time */}
              <div>
                <label className="block text-[13px] font-semibold text-graphite mb-2 tracking-wide">
                  Best time for a 30-min call{" "}
                  <span className="text-stone font-normal text-[12px]">
                    (optional)
                  </span>
                </label>
                <input
                  type="text"
                  name="best_call_time"
                  value={form.best_call_time}
                  onChange={handleChange}
                  placeholder="Weekday mornings ET, Tuesday/Thursday afternoons..."
                  className="w-full px-4 py-3 border border-graphite/[0.08] rounded-md text-[15px] bg-warm-white outline-none focus:border-emerald transition-colors"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-[14px] text-red-800">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-graphite text-warm-white px-6 py-4 rounded-md text-[15px] font-semibold tracking-wide hover:bg-emerald transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit & Schedule Call"}
              </button>

              <p className="text-[12px] text-stone text-center leading-relaxed">
                Your information stays confidential. Used only to scope and
                respond to your inquiry.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function SuccessState({
  calendlyUrl,
  contactName,
}: {
  calendlyUrl: string;
  contactName: string;
}) {
  const firstName = contactName.split(" ")[0] || "there";

  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald/10 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="w-8 h-8 text-emerald"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 className="font-display text-2xl font-bold text-graphite mb-3">
        Got it, {firstName}.
      </h2>

      <p className="text-[15px] text-charcoal leading-relaxed mb-8 max-w-sm mx-auto">
        Your submission is in. I&apos;ll review it and reply within 24 hours
        with a tier recommendation and a one-page scope.
      </p>

      {calendlyUrl ? (
        <>
          <div className="text-[13px] font-semibold tracking-wide text-emerald uppercase mb-3">
            Skip the email — book your intro call now
          </div>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-graphite text-warm-white px-6 py-4 rounded-md text-[15px] font-semibold tracking-wide hover:bg-emerald transition-colors"
          >
            Book Free 30-Min Call →
          </a>
          <p className="text-[12px] text-stone mt-4">
            Opens Calendly in a new tab. Pick a slot that works for you.
          </p>
        </>
      ) : (
        <div className="bg-cream p-5 rounded-md text-[14px] text-charcoal leading-relaxed">
          I&apos;ll be in touch within 24 hours to schedule the call. Check
          your inbox — confirmation should land within the next minute or two.
        </div>
      )}

      <div className="mt-10 pt-6 border-t border-graphite/10">
        <p className="text-[13px] text-stone">
          Questions in the meantime?{" "}
          <a
            href="mailto:phil@bluegrassadvisorygroup.com"
            className="text-emerald hover:underline"
          >
            phil@bluegrassadvisorygroup.com
          </a>
        </p>
      </div>
    </div>
  );
}
