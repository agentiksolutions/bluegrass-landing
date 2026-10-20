import Button from "./button";
import { BOOKING_URL, PHONE, PHONE_HREF } from "@/lib/site";

export default function InlineArticleCTA() {
  return (
    <aside className="my-14 border-y border-line py-10">
      <p className="font-display text-[24px] font-light tracking-[-0.015em] text-ink md:text-[28px]">Want to talk about your own business?</p>
      <p className="mt-2 text-[17px] leading-relaxed text-body">Book a 30-minute call and tell me what takes up your week.</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 font-display">
        <Button href={BOOKING_URL}>Book a call</Button>
        <a href={PHONE_HREF} className="text-[15px] font-medium text-blue underline underline-offset-4">
          or call {PHONE}
        </a>
      </div>
    </aside>
  );
}
