import { Reveal } from "@/components/Reveal";

/** Opening block of an inner page: mono label, big serif title, serif lead. */
export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section>
      <div className="shell pb-20 pt-14 md:pb-28 md:pt-24">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display mt-6 max-w-5xl text-[length:var(--text-display)]">{title}</h1>
        </Reveal>
        {lead && (
          <Reveal delay={120}>
            <p className="mt-8 max-w-3xl text-[clamp(1.3rem,2.1vw,1.75rem)] font-medium leading-[1.3] tracking-[-0.025em] text-ink-soft">
              {lead}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
