"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { photos } from "@/lib/photos";

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
  { value: "", label: "Choose" },
  { value: "under_1m", label: "Under $1M" },
  { value: "1m_to_5m", label: "$1M to $5M" },
  { value: "5m_to_15m", label: "$5M to $15M" },
  { value: "15m_to_50m", label: "$15M to $50M" },
  { value: "over_50m", label: "Over $50M" },
];

const ENTITIES_OPTIONS = [
  { value: "", label: "Choose" },
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

  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://cal.com/philip-fifield/intro";

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
    <section className="pt-28 lg:pt-32 pb-20 px-4 md:px-10 max-w-[1160px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10 items-start">
        <div>
          <h1 className="font-display text-[36px] lg:text-[44px] leading-tight font-bold tracking-tight text-ink">
            Let&apos;s see if I can help.
          </h1>
          {/* The person who reads the form. Laptop only; on a phone the form comes first. */}
          <Image
            src={photos.phil.src}
            alt={photos.phil.alt}
            width={photos.phil.width}
            height={photos.phil.height}
            sizes="440px"
            className="hidden lg:block mt-8 w-full max-w-[440px] h-auto rounded"
          />
        </div>

        {/* Form: second on a phone, right-hand column on a laptop. */}
        <div className="bg-white p-6 md:p-10 rounded border border-line lg:col-start-2 lg:row-start-1">
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
                  <label className="block font-display text-[14px] font-semibold text-ink mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="contact_name"
                    value={form.contact_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-line rounded text-[15px] bg-white outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-display text-[14px] font-semibold text-ink mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    name="contact_role"
                    value={form.contact_role}
                    onChange={handleChange}
                    placeholder="CEO, COO, Operator..."
                    className="w-full px-4 py-3 border border-line rounded text-[15px] bg-white outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block font-display text-[14px] font-semibold text-ink mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-line rounded text-[15px] bg-white outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
                />
              </div>

              {/* Company name + Website row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-display text-[14px] font-semibold text-ink mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={form.company_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-line rounded text-[15px] bg-white outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-display text-[14px] font-semibold text-ink mb-2">
                    Website
                  </label>
                  <input
                    type="text"
                    name="company_website"
                    value={form.company_website}
                    onChange={handleChange}
                    placeholder="example.com (optional)"
                    className="w-full px-4 py-3 border border-line rounded text-[15px] bg-white outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
                  />
                </div>
              </div>

              {/* Revenue + Entities row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-display text-[14px] font-semibold text-ink mb-2">
                    Revenue
                  </label>
                  <select
                    name="annual_revenue_range"
                    value={form.annual_revenue_range}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-line rounded text-[15px] bg-white outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
                  >
                    {REVENUE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-display text-[14px] font-semibold text-ink mb-2">
                    Locations
                  </label>
                  <select
                    name="num_entities"
                    value={form.num_entities}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-line rounded text-[15px] bg-white outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
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
                <label className="block font-display text-[14px] font-semibold text-ink mb-2">
                  What do you need?
                </label>
                <textarea
                  name="ai_question"
                  value={form.ai_question}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="A few sentences on what you're trying to figure out, what you've tried, what's blocking you..."
                  className="w-full px-4 py-3 border border-line rounded text-[15px] bg-white outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors resize-none"
                />
              </div>

              {/* Best time */}
              <div>
                <label className="block font-display text-[14px] font-semibold text-ink mb-2">
                  Best time to call
                </label>
                <input
                  type="text"
                  name="best_call_time"
                  value={form.best_call_time}
                  onChange={handleChange}
                  placeholder="Optional, e.g. weekday mornings"
                  className="w-full px-4 py-3 border border-line rounded text-[15px] bg-white outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
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
                className="w-full bg-blue text-white px-6 py-4 rounded font-display text-[16px] font-semibold hover:bg-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : "Send"}
              </button>

              <p className="font-display text-[14px] text-muted text-center leading-relaxed">
                By submitting, you agree to our{" "}
                <Link href="/terms" className="text-blue underline underline-offset-2">Terms</Link> and{" "}
                <Link href="/privacy" className="text-blue underline underline-offset-2">Privacy Notice</Link>.
                We use your answers only to reply to you.
              </p>
            </form>
          )}
        </div>

        <div className="font-display">
          <p className="text-[17px] text-body mb-6">
            If AI is not what your business needs right now, I will tell you.
          </p>
          <div className="text-[16px] text-body space-y-2">
            <div>
              <span className="font-semibold text-ink">Email:</span>{" "}
              <a href="mailto:phil@bluegrassadvisorygroup.com" className="text-blue underline underline-offset-2">
                phil@bluegrassadvisorygroup.com
              </a>
            </div>
            <div>
              <span className="font-semibold text-ink">Phone:</span>{" "}
              <a href="tel:+18593143051" className="text-blue underline underline-offset-2">
                (859) 314-3051
              </a>
            </div>
            <div>
              <span className="font-semibold text-ink">Based in:</span> Lexington, Kentucky
            </div>
            <div>
              <span className="font-semibold text-ink">Reply:</span> within 24 hours
            </div>
          </div>

          <div className="mt-8 bg-band p-6 rounded">
            <h2 className="text-[16px] font-semibold text-ink mb-3">What happens next</h2>
            <ol className="text-[16px] text-body leading-relaxed space-y-1.5 list-decimal list-inside">
              <li>You send this form. It takes about three minutes.</li>
              <li>I reply within 24 hours.</li>
              <li>We set up a free 30-minute call.</li>
              <li>You get a recommendation, and sometimes it is to wait.</li>
            </ol>
          </div>
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
        Your answers are in. I&apos;ll read them and reply within 24 hours.
      </p>

      {calendlyUrl ? (
        <>
          <div className="text-[13px] font-semibold tracking-wide text-emerald uppercase mb-3">
            Or book your call now
          </div>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-graphite text-warm-white px-6 py-4 rounded-md text-[15px] font-semibold tracking-wide hover:bg-emerald transition-colors"
          >
            Book a 30-minute call
          </a>
          <p className="text-[12px] text-stone mt-4">
            Opens the booking page in a new tab. Pick a slot that works for you.
          </p>
        </>
      ) : (
        <div className="bg-cream p-5 rounded-md text-[14px] text-charcoal leading-relaxed">
          I&apos;ll be in touch within 24 hours to schedule the call. Check
          your inbox. A confirmation email should arrive in the next minute or two.
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
