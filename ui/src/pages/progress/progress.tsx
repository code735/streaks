import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const milestones = [
  { title: "Focus streak", value: "18 days", trend: "+2 this week" },
  { title: "Deep work", value: "7.4 hrs", trend: "+12%" },
  { title: "Rest balance", value: "82%", trend: "steady" },
];

const highlights = [
  { label: "Morning", value: "Calm" },
  { label: "Midday", value: "Focused" },
  { label: "Evening", value: "Rested" },
];

export default function Progress() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen overflow-hidden bg-[#f6f1ea] text-[#1d1b16]`}
    >
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,_#f3b47f_0,_#f6f1ea_60%)] blur-3xl opacity-80" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-12%] h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,_#f08b6a_0,_#f6f1ea_65%)] blur-3xl opacity-70" />
      <main className="relative mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-14 sm:px-10 sm:py-20">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#7a6f66]">
              Streaks Studio
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Progress Pulse
            </h1>
          </div>
          <nav className="flex items-center gap-3 text-sm font-medium text-[#3f352f]">
            <Link className="transition hover:text-[#1d1b16]" href="/">
              Home
            </Link>
            <Link className="transition hover:text-[#1d1b16]" href="/todo">
              Todo
            </Link>
          </nav>
        </header>

        <section className="grid gap-6 rounded-3xl border border-[#e0d5cc] bg-white/80 p-6 shadow-[0_20px_60px_-40px_rgba(29,27,22,0.4)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7a6f66]">
                Weekly rhythm
              </p>
              <p className="text-lg font-semibold">Momentum is building.</p>
            </div>
            <span className="rounded-full bg-[#f1e5db] px-3 py-1 text-xs font-semibold text-[#6d5f57]">
              Week 7
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {milestones.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#efe4da] bg-[#f9f4ee] px-4 py-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7a6f66]">
                  {item.title}
                </p>
                <p className="mt-2 text-2xl font-semibold text-[#1d1b16]">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-[#6d5f57]">{item.trend}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-[#e0d5cc] bg-white/80 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7a6f66]">
              Streak health
            </p>
            <p className="mt-3 text-2xl font-semibold">
              Consistency is holding even on busy days.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#6d5f57]">
              Your strongest sessions land mid-morning. Protect that window and
              let the rest of the schedule flex around it.
            </p>
            <div className="mt-6 grid gap-3">
              {[
                { label: "Ritual completion", value: "76%" },
                { label: "Focus minutes", value: "310" },
                { label: "Recovery", value: "88%" },
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
          </div>
          <div className="grid gap-4 rounded-3xl border border-[#e0d5cc] bg-white/80 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7a6f66]">
              Energy snapshot
            </p>
            {highlights.map((item) => (
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
      </main>
    </div>
  );
}
