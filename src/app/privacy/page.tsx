import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { CookieSettingsButton } from "@/components/cookie-consent";

export const metadata: Metadata = pageMeta({
  title: "Privacy Notice",
  description:
    "What bluegrassadvisorygroup.com collects, where it goes, how Google Analytics cookies work here, and how to reach us.",
  path: "/privacy",
});

// Laid out like a legal page (Phil, 2026-10-20: "more professional looking"): a plain title
// block with the dates, a contents list that stays beside the text on wide screens, and a
// reading column of about 68 characters. The wording is the text published on 2026-10-16; only
// the cookie button names changed to match the new cookie card.
const sections = [
  { id: "about", title: "About this notice" },
  { id: "contact-form", title: "The contact form" },
  { id: "bot-check", title: "Bot check" },
  { id: "booking", title: "Booking a call" },
  { id: "showroom", title: "Showroom tools" },
  { id: "cookies", title: "Google Analytics and cookies" },
  { id: "hosting", title: "Hosting" },
  { id: "contact-us", title: "Contact us" },
];

const p = "mb-4 text-[17px] leading-[1.7] text-body";
const ul = "mb-4 list-disc space-y-2 pl-6 text-[17px] leading-[1.7] text-body marker:text-muted";
const a = "text-blue underline decoration-blue/40 underline-offset-4 hover:decoration-blue";

function Part({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line pt-10 first:border-t-0 first:pt-0">
      <h2 className="mb-4 font-display text-[24px] font-medium leading-snug tracking-[-0.01em] text-ink">{title}</h2>
      {children}
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <header className="border-b border-line bg-band">
        <div className="mx-auto max-w-page-pad px-4 pb-12 pt-32 md:px-10 md:pb-16 md:pt-40">
          <h1 className="font-display text-[44px] font-light leading-none tracking-[-0.03em] text-ink md:text-[64px]">
            Privacy notice
          </h1>
          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-2 font-display text-[14px] text-muted">
            <div className="flex gap-2">
              <dt>Effective</dt>
              <dd className="text-ink">October 16, 2026</dd>
            </div>
            <div className="flex gap-2">
              <dt>Last updated</dt>
              <dd className="text-ink">October 16, 2026</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="mx-auto grid max-w-page-pad grid-cols-1 gap-12 px-4 pb-24 pt-12 md:px-10 md:pt-16 lg:grid-cols-[240px_minmax(0,68ch)] lg:gap-20">
        <nav aria-label="Contents" className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-[14px] font-semibold text-ink">Contents</h2>
          <ol className="mt-3 space-y-2 border-l border-line pl-4 font-display text-[15px]">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-body hover:text-blue">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="space-y-10">
          <Part id="about" title="About this notice">
            <p className={p}>
              This notice covers bluegrassadvisorygroup.com, run by Bluegrass Advisory Group, LLC in Lexington,
              Kentucky. It lists what the site collects, where that information goes, and how to reach us.
            </p>
          </Part>

          <Part id="contact-form" title="The contact form">
            <p className={p}>
              When you send the contact form, we collect your name, role, email address, company name, company
              website, annual revenue range, number of business units, your question, and the best time to call you.
              Role, website and call time are optional. We also record your IP address and browser type with the
              submission.
            </p>
            <p className={p}>The form sends that information to three services:</p>
            <ul className={ul}>
              <li>Supabase, the database where we store form submissions.</li>
              <li>Airtable, our client records system, where we add you as a contact and your company as a prospect.</li>
              <li>Resend, which emails your submission to us and sends you a confirmation.</li>
            </ul>
          </Part>

          <Part id="bot-check" title="Bot check">
            <p className={p}>
              The contact form uses Cloudflare Turnstile to check that a person is filling it in. When you submit, we
              send Cloudflare the check result and your IP address.
            </p>
          </Part>

          <Part id="booking" title="Booking a call">
            <p className={p}>
              The links on this site for scheduling a call open our booking page on Cal.com. When you book, Cal.com
              sends us your name, email address, the time you picked and any notes you add. We save those in
              Airtable. Cal.com&apos;s own privacy policy covers what you enter on its site.
            </p>
          </Part>

          <Part id="showroom" title="Showroom tools">
            <p className={p}>
              The AI Opportunity Report and Website Generator in the showroom send what you type to Anthropic, which
              writes the result. This site does not save what you type into those tools.
            </p>
          </Part>

          <Part id="cookies" title="Google Analytics and cookies">
            <p className={p}>
              We use Google Analytics to count visits and see which pages people read. It does not load until you
              accept analytics cookies on the cookie banner. If you reject them, or never answer, the site does not
              load Google Analytics and sets no analytics cookies.
            </p>
            <p className={p}>
              After you accept, Google Analytics sets cookies whose names start with &quot;_ga&quot;. It records the
              pages you view and details about your browser and device. The site loads no advertising pixels and sets
              no advertising cookies.
            </p>
            <p className={p}>
              Your browser keeps your choice so the banner does not ask again. To change it, open{" "}
              <CookieSettingsButton className={a} /> here or from the link at the bottom of any page.
            </p>
          </Part>

          <Part id="hosting" title="Hosting">
            <p className={p}>Vercel hosts this site.</p>
          </Part>

          <Part id="contact-us" title="Contact us">
            <p className={p}>
              For questions about this notice or the information we hold about you, email{" "}
              <a href="mailto:phil@bluegrassadvisorygroup.com" className={a}>
                phil@bluegrassadvisorygroup.com
              </a>{" "}
              or write to Bluegrass Advisory Group, LLC, 3040 Sewanee Lane, Lexington, Kentucky 40509.
            </p>
          </Part>
        </article>
      </div>
    </div>
  );
}
