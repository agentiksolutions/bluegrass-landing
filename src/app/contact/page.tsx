"use client";

import { useRef, useState } from "react";
import Script from "next/script";
import { hanken, newsreader } from "./fonts";

declare global {
  interface Window {
    turnstile?: { reset: () => void };
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

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
  { value: "1m_to_5m", label: "$1M to $5M" },
  { value: "5m_to_15m", label: "$5M to $15M" },
  { value: "15m_to_50m", label: "$15M to $50M" },
  { value: "over_50m", label: "Over $50M" },
];

const ENTITIES_OPTIONS = [
  { value: "", label: "Select" },
  { value: "1", label: "1" },
  { value: "2-3", label: "2 to 3" },
  { value: "4-7", label: "4 to 7" },
  { value: "8+", label: "8+" },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startedAt = useRef(Date.now());

  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://cal.com/philip-fifield/intro";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fields = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          bag_hp: fields.get("bag_hp") || "",
          elapsed_ms: Date.now() - startedAt.current,
          turnstile_token: fields.get("cf-turnstile-response") || "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error ||
            "Something went wrong. Please try again or email phil@bluegrassadvisorygroup.com directly.",
        );
        window.turnstile?.reset();
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        "Network error. Please try again or email phil@bluegrassadvisorygroup.com directly.",
      );
      window.turnstile?.reset();
      setSubmitting(false);
    }
  };

  return (
    <div className={`bg-white ${hanken.className}`}>
    <section className="pt-[148px] pb-24 px-6 md:px-12 max-w-content mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* Left column: info */}
        <div>
          <h1 className="text-4xl leading-tight font-bold tracking-tight text-ink mb-6">
            Let&apos;s figure out if we can help.
          </h1>
          <p className={`${newsreader.className} text-lg leading-relaxed text-body mb-8`}>
            A few quick questions, then a free 30-minute intro call to scope
            what makes sense for your business. If AI is not what your
            business needs right now, I will tell you.
          </p>

          <div className="text-[15px] text-body space-y-3 mb-10">
            <div>
              <span className="font-semibold text-ink">Email:</span>{" "}
              <a
                href="mailto:phil@bluegrassadvisorygroup.com"
                className="text-blue underline underline-offset-2 hover:text-blue-dark"
              >
                phil@bluegrassadvisorygroup.com
              </a>
            </div>
            <div>
              <span className="font-semibold text-ink">Phone:</span>{" "}
              <a
                href="tel:+18593143051"
                className="text-blue underline underline-offset-2 hover:text-blue-dark"
              >
                (859) 314-3051
              </a>
            </div>
            <div>
              <span className="font-semibold text-ink">Based in:</span> Lexington,
              Kentucky
            </div>
          </div>

          <div className="bg-band p-6 rounded">
            <h2 className="text-[16px] font-semibold text-ink mb-3">
              What happens next
            </h2>
            <ol className={`${newsreader.className} text-[16px] text-body leading-relaxed space-y-2 list-decimal list-inside`}>
              <li>You send this form. It takes about three minutes.</li>
              <li>I review it and reply.</li>
              <li>We set up a free 30-minute call.</li>
              <li>You get a recommendation, and sometimes it is to wait.</li>
            </ol>
          </div>
        </div>

        {/* Right column: form or success */}
        <div className="bg-white p-6 md:p-10 rounded border border-line">
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
                  <label className="block text-[14px] font-semibold text-ink mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="contact_name"
                    value={form.contact_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-line rounded text-[15px] text-ink bg-white outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-ink mb-2">
                    Your Role
                  </label>
                  <input
                    type="text"
                    name="contact_role"
                    value={form.contact_role}
                    onChange={handleChange}
                    placeholder="CEO, COO, Operator..."
                    className="w-full px-4 py-3 border border-line rounded text-[15px] text-ink bg-white outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[14px] font-semibold text-ink mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-line rounded text-[15px] text-ink bg-white outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
                />
              </div>

              {/* Company name + Website row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-semibold text-ink mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={form.company_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-line rounded text-[15px] text-ink bg-white outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-ink mb-2">
                    Website{" "}
                    <span className="text-muted font-normal text-[13px]">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="company_website"
                    value={form.company_website}
                    onChange={handleChange}
                    placeholder="example.com"
                    className="w-full px-4 py-3 border border-line rounded text-[15px] text-ink bg-white outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
                  />
                </div>
              </div>

              {/* Revenue + Entities row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-semibold text-ink mb-2">
                    Annual Revenue
                  </label>
                  <select
                    name="annual_revenue_range"
                    value={form.annual_revenue_range}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-line rounded text-[15px] text-ink bg-white outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
                  >
                    {REVENUE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-ink mb-2">
                    Entities / Business Units
                  </label>
                  <select
                    name="num_entities"
                    value={form.num_entities}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-line rounded text-[15px] text-ink bg-white outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
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
                <label className="block text-[14px] font-semibold text-ink mb-2">
                  What&apos;s your biggest AI question or need?
                </label>
                <textarea
                  name="ai_question"
                  value={form.ai_question}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="A few sentences on what you're trying to figure out, what you've tried, what's blocking you..."
                  className="w-full px-4 py-3 border border-line rounded text-[15px] text-ink bg-white outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors resize-none"
                />
              </div>

              {/* Best time */}
              <div>
                <label className="block text-[14px] font-semibold text-ink mb-2">
                  Best time for a 30-min call{" "}
                  <span className="text-muted font-normal text-[13px]">
                    (optional)
                  </span>
                </label>
                <input
                  type="text"
                  name="best_call_time"
                  value={form.best_call_time}
                  onChange={handleChange}
                  placeholder="Weekday mornings ET, Tuesday/Thursday afternoons..."
                  className="w-full px-4 py-3 border border-line rounded text-[15px] text-ink bg-white outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
                />
              </div>

              {/* Bot checks: a field people never see, and Turnstile when keys are set. */}
              <input
                type="text"
                name="bag_hp"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-px w-px overflow-hidden"
              />
              {TURNSTILE_SITE_KEY && (
                <>
                  <Script
                    src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                    strategy="afterInteractive"
                  />
                  <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} />
                </>
              )}

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
                className="w-full bg-blue text-white px-6 py-4 rounded text-[16px] font-semibold hover:bg-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit & Schedule Call"}
              </button>

              <p className="text-[13px] text-muted text-center leading-relaxed">
                Your information stays confidential. Used only to scope and
                respond to your inquiry.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
    </div>
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
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-tint flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="w-8 h-8 text-blue"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-ink mb-3">
        Got it, {firstName}.
      </h2>

      <p className={`${newsreader.className} text-[17px] text-body leading-relaxed mb-8 max-w-sm mx-auto`}>
        Your submission is in. I&apos;ll review it and reply
        with a tier recommendation and a one-page scope.
      </p>

      {calendlyUrl ? (
        <>
          <div className="text-[15px] font-semibold text-ink mb-3">
            Or book your call now
          </div>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue text-white px-6 py-4 rounded text-[16px] font-semibold hover:bg-blue-dark transition-colors"
          >
            Book a 30-minute call
          </a>
          <p className="text-[13px] text-muted mt-4">
            Opens the booking page in a new tab. Pick a slot that works for you.
          </p>
        </>
      ) : (
        <div className={`${newsreader.className} bg-band p-5 rounded text-[16px] text-body leading-relaxed`}>
          I&apos;ll be in touch to schedule the call. Check your inbox. A
          confirmation email should arrive in the next minute or two.
        </div>
      )}

      <div className="mt-10 pt-6 border-t border-line">
        <p className="text-[14px] text-muted">
          Questions in the meantime?{" "}
          <a
            href="mailto:phil@bluegrassadvisorygroup.com"
            className="text-blue underline underline-offset-2 hover:text-blue-dark"
          >
            phil@bluegrassadvisorygroup.com
          </a>
        </p>
      </div>
    </div>
  );
}
