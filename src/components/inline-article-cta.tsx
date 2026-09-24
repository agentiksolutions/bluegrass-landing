import { BOOKING_URL, PHONE, PHONE_HREF } from "@/lib/site";

export default function InlineArticleCTA() {
  return (
    <aside className="my-12 p-8 bg-band rounded border border-line">
      <p className="font-display text-xl font-bold text-ink mb-2">Want to talk about your own business?</p>
      <p className="text-[17px] leading-relaxed text-body mb-5">
        Book a 30-minute call and tell me what takes up your week.
      </p>
      <div className="flex flex-wrap items-center gap-4 font-display">
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 rounded bg-blue text-white text-[15px] font-semibold hover:bg-blue-dark"
        >
          Book a call
        </a>
        <a href={PHONE_HREF} className="text-[15px] font-medium text-blue underline underline-offset-2">
          or call {PHONE}
        </a>
      </div>
    </aside>
  );
}
