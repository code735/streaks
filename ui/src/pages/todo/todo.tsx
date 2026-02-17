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

const todoItems = [
  { title: "Morning review", detail: "Pick top 3", status: "Next" },
  { title: "Focus sprint", detail: "45 minutes", status: "Planned" },
  { title: "Walk reset", detail: "10 minutes", status: "Later" },
  { title: "Inbox sweep", detail: "20 minutes", status: "Queued" },
];

const reminders = [
  { label: "Water", value: "2/6" },
  { label: "Breaks", value: "1/3" },
  { label: "Stretch", value: "0/2" },
];

export default function Todo() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen overflow-hidden bg-[#f6f1ea] text-[#1d1b16]`}
    >
      <div className="pointer-events-none absolute -top-20 left-[-5%] h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,_#f3b47f_0,_#f6f1ea_60%)] blur-3xl opacity-80" />
      <div className="pointer-events-none absolute bottom-[-25%] right-[-10%] h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,_#f08b6a_0,_#f6f1ea_65%)] blur-3xl opacity-70" />
      <main className="relative mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-14 sm:px-10 sm:py-20">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#7a6f66]">
              Streaks Studio
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Today&apos;s Todo Ritual
            </h1>
          </div>
          <nav className="flex items-center gap-3 text-sm font-medium text-[#3f352f]">
            <Link className="transition hover:text-[#1d1b16]" href="/">
              Home
            </Link>
            <Link className="transition hover:text-[#1d1b16]" href="/progress">
              Progress
            </Link>
          </nav>
        </header>

        <section className="grid gap-6 rounded-3xl border border-[#e0d5cc] bg-white/80 p-6 shadow-[0_20px_60px_-40px_rgba(29,27,22,0.4)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7a6f66]">
                Queue
              </p>
              <p className="text-lg font-semibold">Small steps, steady pace.</p>
            </div>
            <span className="rounded-full bg-[#f1e5db] px-3 py-1 text-xs font-semibold text-[#6d5f57]">
              Tue 17 Feb
            </span>
          </div>
          <div className="grid gap-4">
            {todoItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#efe4da] bg-[#f9f4ee] px-4 py-3"
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
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-[#e0d5cc] bg-white/80 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7a6f66]">
              Focus block
            </p>
            <p className="mt-3 text-2xl font-semibold">
              Reserve 90 minutes of deep work.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#6d5f57]">
              Turn off notifications, block incoming meetings, and let the
              remaining tasks orbit around the single priority.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#7a6f66]">
              <span className="rounded-full border border-[#d6c9bf] px-3 py-2">
                10:00 - 11:30
              </span>
              <span className="rounded-full border border-[#d6c9bf] px-3 py-2">
                Calendar hold
              </span>
            </div>
          </div>
          <div className="grid gap-4 rounded-3xl border border-[#e0d5cc] bg-white/80 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7a6f66]">
              Gentle reminders
            </p>
            {reminders.map((item) => (
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
