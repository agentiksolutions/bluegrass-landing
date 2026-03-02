import SectionLabel from "./section-label";
import Button from "./button";
import CTABand from "./cta-band";

interface ServicePageProps {
  label: string;
  title: string;
  subtitle: string;
  deliverables: string[];
  whoItsFor: string[];
  showroomLink?: { href: string; label: string };
}

export default function ServicePageTemplate({
  label,
  title,
  subtitle,
  deliverables,
  whoItsFor,
  showroomLink,
}: ServicePageProps) {
  return (
    <>
      {/* Hero */}
      <section className="pt-[148px] pb-16 px-6 md:px-12 max-w-content mx-auto">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="font-display text-[clamp(36px,5vw,52px)] leading-[1.1] font-bold tracking-tight mb-5">
          {title}
        </h1>
        <p className="text-lg leading-relaxed text-[#666] max-w-[560px]">
          {subtitle}
        </p>
      </section>

      {/* Deliverables */}
      <section className="px-6 md:px-12 pb-16 max-w-content mx-auto">
        <h2 className="font-display text-2xl font-bold mb-8">What you get.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deliverables.map((d) => (
            <div
              key={d}
              className="flex items-start gap-3 p-5 bg-white rounded-lg border border-[#e8e5e0]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald mt-1.5 shrink-0" />
              <span className="text-[15px] leading-relaxed text-[#555]">{d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-cream py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <h2 className="font-display text-2xl font-bold mb-8">
            Who this is for.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whoItsFor.map((w) => (
              <p key={w} className="text-[15px] leading-relaxed text-[#666]">
                &bull; {w}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Showroom link */}
      {showroomLink && (
        <section className="py-16 px-6 md:px-12 max-w-content mx-auto text-center">
          <p className="text-stone text-sm mb-4">See it in action</p>
          <Button href={showroomLink.href}>{showroomLink.label}</Button>
        </section>
      )}

      <CTABand />
    </>
  );
}
