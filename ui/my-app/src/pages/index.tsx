import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen overflow-hidden bg-[#f6f1ea] text-[#1d1b16]`}
    >
      <div className="pointer-events-none absolute -top-28 right-[-10%] h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,_#f3b47f_0,_#f6f1ea_60%)] blur-3xl opacity-80" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-12%] h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,_#f08b6a_0,_#f6f1ea_65%)] blur-3xl opacity-70" />
      <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 py-14 sm:px-10 sm:py-20">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1d1b16] text-sm font-semibold text-[#f6f1ea]">
              ST
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#7a6f66]">
                Streaks Studio
              </p>
              <p className="text-lg font-semibold">Focus is a ritual</p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-[#3f352f]">
            <a className="transition hover:text-[#1d1b16]" href="#habits">
              Habits
            </a>
            <a className="transition hover:text-[#1d1b16]" href="#insights">
              Insights
            </a>
            <a className="transition hover:text-[#1d1b16]" href="#routines">
              Routines
            </a>
          </nav>
        </header>

        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <p className="w-fit rounded-full border border-[#d6c9bf] bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#6d5f57]">
              Sample Page
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Build streaks that feel less like a streak and more like a cadence.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-[#5f524b]">
              A soft, focused dashboard for everyday progress. Track rituals, add gentle
              reminders, and see a calm view of momentum without chasing perfection.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="rounded-full bg-[#1d1b16] px-6 py-3 text-sm font-semibold text-[#f6f1ea] transition hover:bg-[#2b2621]">
                Start a 7-day reset
              </button>
              <button className="rounded-full border border-[#1d1b16] px-6 py-3 text-sm font-semibold text-[#1d1b16] transition hover:bg-[#1d1b16] hover:text-[#f6f1ea]">
                Explore templates
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-[#6d5f57]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#f08b6a]" />
                Gentle nudges, not alarms
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#f3b47f]" />
                Weekly reflection snapshots
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-3xl border border-[#e0d5cc] bg-white/80 p-6 shadow-[0_20px_60px_-40px_rgba(29,27,22,0.4)]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7a6f66]">
                Today
              </p>
              <span className="rounded-full bg-[#f1e5db] px-3 py-1 text-xs font-semibold text-[#6d5f57]">
                Mon 2 Feb
              </span>
            </div>
            <div className="space-y-4">
              {[
                { title: "Morning pages", detail: "12 minutes", status: "Complete" },
                { title: "Stretch + tea", detail: "8 minutes", status: "Next" },
                { title: "Focus block", detail: "90 minutes", status: "Planned" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-2xl border border-[#efe4da] bg-[#f9f4ee] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#1d1b16]">
                      {item.title}
                    </p>
                    <p className="text-xs text-[#7a6f66]">{item.detail}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#6d5f57]">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 rounded-2xl bg-[#1d1b16] px-4 py-3 text-[#f6f1ea]">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#d8cbbf]">
                  Streak
                </p>
                <p className="text-2xl font-semibold">18</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#d8cbbf]">
                  Focus
                </p>
                <p className="text-2xl font-semibold">76%</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#d8cbbf]">
                  Mood
                </p>
                <p className="text-2xl font-semibold">Calm</p>
              </div>
            </div>
          </div>
        </section>

        <section id="habits" className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Ritual stacks",
              copy: "Pair habits together so your day feels like a smooth loop.",
            },
            {
              title: "Soft accountability",
              copy: "Track momentum without breaking when life shifts.",
            },
            {
              title: "Mindful analytics",
              copy: "See patterns across energy, focus, and mood.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-[#e0d5cc] bg-white/70 p-6"
            >
              <p className="text-lg font-semibold text-[#1d1b16]">
                {card.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#6d5f57]">
                {card.copy}
              </p>
            </div>
          ))}
        </section>

        <section
          id="insights"
          className="grid gap-8 rounded-3xl border border-[#e0d5cc] bg-white/80 p-8 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7a6f66]">
              Weekly Insight
            </p>
            <h2 className="text-3xl font-semibold">
              Your longest focus streak arrives mid-week.
            </h2>
            <p className="text-sm leading-6 text-[#6d5f57]">
              Protect Wednesday mornings. Keep it quiet, stack creative work first,
              and let admin tasks drift to the afternoon.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              { label: "Protected hours", value: "6.5" },
              { label: "Distractions", value: "-22%" },
              { label: "Sleep balance", value: "7.4" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-2xl border border-[#efe4da] bg-[#f9f4ee] px-4 py-3"
              >
                <span className="text-sm text-[#6d5f57]">{item.label}</span>
                <span className="font-mono text-lg font-semibold text-[#1d1b16]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section id="routines" className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Sample routines</h3>
            <button className="rounded-full border border-[#d6c9bf] px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#6d5f57] transition hover:border-[#1d1b16] hover:text-[#1d1b16]">
              View all
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: "Sunrise reset", time: "25 min", note: "Journal, stretch, plan" },
              { title: "Deep work", time: "90 min", note: "Two focus blocks" },
              { title: "Evening calm", time: "40 min", note: "Walk, tea, unplug" },
            ].map((routine) => (
              <div
                key={routine.title}
                className="flex flex-col justify-between rounded-3xl border border-[#e0d5cc] bg-white/80 p-6"
              >
                <div>
                  <p className="text-lg font-semibold text-[#1d1b16]">
                    {routine.title}
                  </p>
                  <p className="mt-2 text-sm text-[#6d5f57]">{routine.note}</p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.28em] text-[#7a6f66]">
                  <span>{routine.time}</span>
                  <span>Active</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
