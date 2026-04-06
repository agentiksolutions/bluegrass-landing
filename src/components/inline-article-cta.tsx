import Link from "next/link";

export default function InlineArticleCTA() {
  return (
    <aside className="my-12 p-8 bg-cream rounded-lg border-l-4 border-emerald">
      <p className="font-display text-xl font-bold text-graphite mb-2">
        Want results like this for your business?
      </p>
      <p className="text-[15px] leading-relaxed text-[#666] mb-5">
        Let&apos;s talk — no pitch, just a conversation about what&apos;s
        possible for your operation.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <a
          href="https://calendly.com/phil-bluegrassadvisorygroup/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 rounded bg-emerald text-warm-white text-[14px] font-semibold hover:bg-sage transition-colors duration-200"
        >
          Schedule a Free Call
        </a>
        <a
          href="tel:+18593143051"
          className="text-[14px] font-medium text-emerald hover:text-sage transition-colors duration-200"
        >
          or call (859) 314-3051
        </a>
      </div>
    </aside>
  );
}
