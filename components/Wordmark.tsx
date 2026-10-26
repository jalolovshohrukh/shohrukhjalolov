import type { Company } from "@/lib/companies";

/** A company's name as set in the grid and marquee, or its typeset logo when it has one. */
export function Wordmark({ company }: { company: Company }) {
  if (!company.mark) return <>{company.name}</>;
  const { text, dot } = company.mark;
  return (
    <>
      {text}
      {dot && (
        <span
          aria-hidden="true"
          className="ml-[0.05em] inline-block h-[0.2em] w-[0.2em]"
          style={{ background: dot }}
        />
      )}
    </>
  );
}
