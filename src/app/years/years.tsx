import Link from "next/link";

import { defaultYear, yearMeta } from "../todo/data";

export default function Years() {
  const rangeLabel = `${yearMeta[0]?.label ?? ""} - ${
    yearMeta[yearMeta.length - 1]?.label ?? ""
  }`;

  return (
    <div className="min-h-screen px-6 pb-16 pt-12 text-[var(--app-fg)]">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[var(--app-muted)]">
            Project Grid
          </p>
          <h1 className="text-3xl font-semibold">Years at a glance</h1>
          <p className="max-w-xl text-sm text-[var(--app-muted)]">
            Open a year to browse the monthly todo ledger for that cycle.
          </p>
        </div>
        <div className="border border-[color:var(--app-border)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--app-muted)]">
          {rangeLabel}
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {yearMeta.map((year) => {
          const isActive = year.year === defaultYear;

          return (
            <Link
              key={year.year}
              href={`/progress?year=${year.year}`}
              className={`group relative flex h-40 flex-col justify-between border border-[color:var(--app-border)] bg-[color:var(--app-panel)]/80 p-5 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--app-accent)] hover:shadow-[0_22px_60px_rgba(0,0,0,0.45)] ${
                isActive
                  ? "border-[color:var(--app-accent)] shadow-[0_18px_50px_rgba(0,0,0,0.4)]"
                  : ""
              }`}
            >
              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[var(--app-muted)]">
                  {year.shortLabel}
                </p>
                <h2 className="text-2xl font-semibold text-[var(--app-fg)]">
                  {year.label}
                </h2>
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--app-muted)]">
                <span className="uppercase tracking-[0.3em]">Open months</span>
                <span className="text-[var(--app-accent)]">→</span>
              </div>
              <div
                className={`absolute right-5 top-5 h-2.5 w-2.5 transition group-hover:scale-110 ${
                  isActive
                    ? "bg-[var(--app-accent)] shadow-[0_0_14px_rgba(214,156,76,0.7)]"
                    : "bg-[var(--app-emerald)]/60 shadow-[0_0_12px_rgba(139,199,178,0.6)]"
                }`}
              />
            </Link>
          );
        })}
      </section>
    </div>
  );
}
