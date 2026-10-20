import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { CookieSettingsButton } from "@/components/cookie-consent";
import PageHero from "@/components/v2/page-hero";

export const metadata: Metadata = pageMeta({
  title: "Privacy Notice",
  description:
    "What bluegrassadvisorygroup.com collects, where it goes, how Google Analytics cookies work here, and how to reach us.",
  path: "/privacy",
});

const h2 = "font-display text-[26px] leading-snug font-medium tracking-[-0.01em] text-ink mt-12 mb-4";
const p = "text-[17px] leading-relaxed text-body mb-4";
const ul = "list-disc pl-6 text-[17px] leading-relaxed text-body mb-4 space-y-2";
const a = "text-blue underline hover:text-blue-dark";

export default function PrivacyPage() {
  return (
    <>
    <PageHero compact title="Privacy notice" intro="Effective date: October 16, 2026" />
    <section className="mx-auto max-w-page-pad px-4 pb-24 pt-16 md:px-10 md:pt-20">
      <div className="max-w-[680px]">

        <p className={p}>
          This notice covers bluegrassadvisorygroup.com, run by Bluegrass
          Advisory Group, LLC in Lexington, Kentucky. It lists what the site
          collects, where that information goes, and how to reach us.
        </p>

        <h2 className={h2}>The contact form</h2>
        <p className={p}>
          When you send the contact form, we collect your name, role, email
          address, company name, company website, annual revenue range, number
          of business units, your question, and the best time to call you.
          Role, website and call time are optional. We also record your IP
          address and browser type with the submission.
        </p>
        <p className={p}>The form sends that information to three services:</p>
        <ul className={ul}>
          <li>Supabase, the database where we store form submissions.</li>
          <li>
            Airtable, our client records system, where we add you as a contact
            and your company as a prospect.
          </li>
          <li>
            Resend, which emails your submission to us and sends you a
            confirmation.
          </li>
        </ul>

        <h2 className={h2}>Bot check</h2>
        <p className={p}>
          The contact form uses Cloudflare Turnstile to check that a person is
          filling it in. When you submit, we send Cloudflare the check result
          and your IP address.
        </p>

        <h2 className={h2}>Booking a call</h2>
        <p className={p}>
          The links on this site for scheduling a call open our booking page
          on Cal.com. When you book, Cal.com sends us your name, email address,
          the time you picked and any notes you add. We save those in Airtable.
          Cal.com&apos;s own privacy policy covers what you enter on its site.
        </p>

        <h2 className={h2}>Showroom tools</h2>
        <p className={p}>
          The AI Opportunity Report and Website Generator in the showroom send
          what you type to Anthropic, which writes the result. This site does
          not save what you type into those tools.
        </p>

        <h2 className={h2}>Google Analytics and cookies</h2>
        <p className={p}>
          We use Google Analytics to count visits and see which pages people
          read. It does not load until you click Accept on the cookie banner.
          If you click Decline, or never answer, the site does not load Google
          Analytics and sets no analytics cookies.
        </p>
        <p className={p}>
          After you accept, Google Analytics sets cookies whose names start
          with &quot;_ga&quot;. It records the pages you view and details about
          your browser and device. The site loads no advertising pixels and
          sets no advertising cookies.
        </p>
        <p className={p}>
          Your browser keeps your choice so the banner does not ask again. To
          change it, open <CookieSettingsButton className={a} /> here or from
          the link at the bottom of any page.
        </p>

        <h2 className={h2}>Hosting</h2>
        <p className={p}>Vercel hosts this site.</p>

        <h2 className={h2}>Contact us</h2>
        <p className={p}>
          For questions about this notice or the information we hold about
          you, email{" "}
          <a href="mailto:phil@bluegrassadvisorygroup.com" className={a}>
            phil@bluegrassadvisorygroup.com
          </a>{" "}
          or write to Bluegrass Advisory Group, LLC, 3040 Sewanee Lane,
          Lexington, Kentucky 40509.
        </p>
      </div>
    </section>
    </>
  );
}
