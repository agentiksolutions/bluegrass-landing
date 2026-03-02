import type { Metadata } from "next";
import SectionLabel from "@/components/section-label";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Bluegrass Advisory Group. No sales pitch, no pressure — just a conversation about your business.",
};

export default function ContactPage() {
  return (
    <section className="pt-[148px] pb-24 px-6 md:px-12 max-w-content mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* Left column — info */}
        <div>
          <SectionLabel>Get In Touch</SectionLabel>
          <h1 className="font-display text-4xl leading-tight font-bold tracking-tight mb-6">
            Let&apos;s figure out if we can help.
          </h1>
          <p className="text-base leading-relaxed text-[#666] mb-8">
            No sales pitch. No pressure. Just a conversation about your business
            and whether AI makes sense for where you are right now.
          </p>
          <div className="text-[15px] text-stone space-y-3">
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
              <strong className="text-graphite">Based in:</strong> Lexington,
              Kentucky
            </div>
            <div>
              <strong className="text-graphite">Response time:</strong> Usually
              within 24 hours
            </div>
          </div>
        </div>

        {/* Right column — form */}
        <div className="bg-white p-10 rounded-lg border border-graphite/[0.06]">
          <form
            action="https://formspree.io/f/xvoeydwg"
            method="POST"
            className="space-y-6"
          >
            <div>
              <label className="block text-[13px] font-semibold text-graphite mb-2 tracking-wide">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 border border-graphite/[0.08] rounded-md text-[15px] bg-warm-white outline-none focus:border-emerald transition-colors"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-graphite mb-2 tracking-wide">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-graphite/[0.08] rounded-md text-[15px] bg-warm-white outline-none focus:border-emerald transition-colors"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-graphite mb-2 tracking-wide">
                Company
              </label>
              <input
                type="text"
                name="company"
                className="w-full px-4 py-3 border border-graphite/[0.08] rounded-md text-[15px] bg-warm-white outline-none focus:border-emerald transition-colors"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-graphite mb-2 tracking-wide">
                Tell us about your business
              </label>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="What kind of business do you run? What's your biggest headache right now?"
                className="w-full px-4 py-3 border border-graphite/[0.08] rounded-md text-[15px] bg-warm-white outline-none focus:border-emerald transition-colors resize-y"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-graphite text-warm-white py-3.5 rounded-md text-[15px] font-semibold hover:bg-emerald transition-colors cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
