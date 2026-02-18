export default function Home() {
  return (
    <div className="min-h-screen px-6 pb-16 pt-12 text-[var(--app-fg)]">
      <header className="mb-12 space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[var(--app-muted)]">
          OpenCode Console
        </p>
        <h1 className="text-4xl font-semibold">
          Terminal workspace, tuned for focus.
        </h1>
        <p className="max-w-2xl text-sm text-[var(--app-muted)]">
          Use the command palette to jump between routes or search todos without
          leaving the keyboard. Everything stays minimal, dark, and built for
          deep work.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-2">
        <a
          href="/todo"
          className="group flex flex-col justify-between border border-[color:var(--app-border)] bg-[color:var(--app-panel)]/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--app-accent)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
        >
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[var(--app-muted)]">
              Todo Ledger
            </p>
            <h2 className="text-2xl font-semibold">Daily focus runs</h2>
            <p className="text-sm text-[var(--app-muted)]">
              Review tasks, expand subtasks, and keep each day clean.
            </p>
          </div>
          <span className="mt-6 text-xs uppercase tracking-[0.3em] text-[var(--app-accent)]">
            Open /todo →
          </span>
        </a>

        <a
          href="/progress"
          className="group flex flex-col justify-between border border-[color:var(--app-border)] bg-[color:var(--app-panel)]/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--app-emerald)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
        >
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[var(--app-muted)]">
              Progress Grid
            </p>
            <h2 className="text-2xl font-semibold">Monthly checkpoint</h2>
            <p className="text-sm text-[var(--app-muted)]">
              Jump into any month and pull the todo timeline.
            </p>
          </div>
          <span className="mt-6 text-xs uppercase tracking-[0.3em] text-[var(--app-emerald)]">
            Open /progress →
          </span>
        </a>
      </section>

      <section className="mt-12 border border-[color:var(--app-border)] bg-[color:var(--app-panel)]/80 p-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[var(--app-muted)]">
          Quick actions
        </div>
        <div className="mt-4 space-y-3 text-sm text-[var(--app-fg)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>Search todos from anywhere</span>
            <span className="flex items-center gap-2">
              <kbd>Alt</kbd>
              <kbd>Super</kbd>
              <kbd>F</kbd>
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>Open project navigation</span>
            <span className="flex items-center gap-2">
              <kbd>Alt</kbd>
              <kbd>Super</kbd>
              <kbd>P</kbd>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
