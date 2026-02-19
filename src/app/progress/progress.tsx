import Link from "next/link";

import { defaultYear, monthMeta } from "../todo/data";

type ProgressProps = {
  yearParam?: string;
};

export default function Progress({ yearParam }: ProgressProps) {
  const parsedYear = yearParam ? Number(yearParam) : defaultYear;
  const yearNumber =
    Number.isInteger(parsedYear) && parsedYear >= 2020 && parsedYear <= 2099
      ? parsedYear
      : defaultYear;

  return (
    <div className="min-h-screen px-6 pb-16 pt-12 text-[var(--app-fg)]">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[var(--app-muted)]">
            Project Grid
          </p>
          <h1 className="text-3xl font-semibold">
            Months at a glance
          </h1>
          <p className="max-w-xl text-sm text-[var(--app-muted)]">
            Open a month to view its todo ledger. Each block acts like a quick
            portal into the daily log.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            className="border border-[color:var(--app-border)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--app-muted)] transition hover:text-[var(--app-fg)]"
            href="/years"
          >
            View years
          </Link>
          <div className="border border-[color:var(--app-border)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--app-muted)]">
            {yearNumber}
          </div>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {monthMeta.map((month) => {
          const monthValue = String(month.number).padStart(2, "0");

          return (
            <Link
              key={month.number}
              href={`/todo?month=${monthValue}&year=${yearNumber}`}
              className="group relative flex h-40 flex-col justify-between border border-[color:var(--app-border)] bg-[color:var(--app-panel)]/80 p-5 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--app-accent)] hover:shadow-[0_22px_60px_rgba(0,0,0,0.45)]"
            >
              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[var(--app-muted)]">
                  {month.shortLabel}
                </p>
                <h2 className="text-2xl font-semibold text-[var(--app-fg)]">
                  {month.label}
                </h2>
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--app-muted)]">
                <span className="uppercase tracking-[0.3em]">Open ledger</span>
                <span className="text-[var(--app-accent)]">→</span>
              </div>
              <div className="absolute right-5 top-5 h-2.5 w-2.5 bg-[var(--app-emerald)]/60 shadow-[0_0_12px_rgba(139,199,178,0.6)] transition group-hover:scale-110" />
            </Link>
          );
        })}
      </section>
    </div>
  );
}
