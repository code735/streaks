"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import {
  buildDailyTodos,
  defaultMonth,
  defaultYear,
  monthMeta,
} from "./data";

const listVariants = {
  open: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
  closed: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -6 },
};

export default function Todo() {
  const [openItems, setOpenItems] = useState<Set<string>>(
    () => new Set()
  );
  const searchParams = useSearchParams();
  const monthParam = searchParams?.get("month");
  const yearParam = searchParams?.get("year");
  const parsedMonth = monthParam ? Number(monthParam) : defaultMonth;
  const parsedYear = yearParam ? Number(yearParam) : defaultYear;
  const monthNumber =
    Number.isInteger(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12
      ? parsedMonth
      : defaultMonth;
  const yearNumber =
    Number.isInteger(parsedYear) && parsedYear >= 2020 && parsedYear <= 2099
      ? parsedYear
      : defaultYear;
  const monthInfo =
    monthMeta.find((month) => month.number === monthNumber) ??
    monthMeta[defaultMonth - 1];
  const dailyTodos = useMemo(
    () => buildDailyTodos(monthNumber, yearNumber),
    [monthNumber, yearNumber]
  );

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen text-left text-[var(--app-fg)]">
      <header className="px-6 pt-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[var(--app-muted)]">
              Todo Ledger
            </p>
            <h1 className="text-2xl font-semibold text-[var(--app-fg)]">
              {monthInfo.label} {yearNumber}
            </h1>
          </div>
          <Link
            className="border border-[color:var(--app-border)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--app-muted)] transition hover:text-[var(--app-fg)]"
            href="/progress"
          >
            View months
          </Link>
        </div>
      </header>
      <main className="flex w-full flex-col gap-6 px-6 pb-16 pt-8">
        {dailyTodos.map((day) => (
          <section
            key={day.date}
            data-date={day.date}
            className="space-y-4 border border-[color:var(--app-border)] bg-[color:var(--app-glass)] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
          >
            <h2 className="sticky top-0 z-10 -mx-5 bg-[color:var(--app-glass)] px-5 py-2 text-lg font-semibold backdrop-blur-xl">
              {day.date}
            </h2>
            <ul className="space-y-6">
              {day.todos.map((todo) => {
                const isOpen = openItems.has(todo.id);

                const todoAnchor = `todo-${day.date}-${todo.id}`;

                return (
                  <li
                    key={todo.id}
                    id={todoAnchor}
                    className="space-y-2 border border-[color:var(--app-border)] bg-[color:var(--app-panel)]/70 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
                  >
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="font-medium text-[var(--app-fg)]">
                        {todo.title}
                      </span>
                      <span className="border border-[color:var(--app-dot)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--app-muted)]">
                        {todo.tag}
                      </span>
                      {todo.subtasks && todo.subtasks.length > 0 ? (
                        <button
                          className={`inline-flex items-center gap-2 border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ease-out ${
                            isOpen
                              ? "border-[color:var(--app-fg)] text-[var(--app-fg)]"
                              : "border-dashed border-[color:var(--app-dot)] text-[var(--app-muted)]"
                          }`}
                          onClick={() => toggleItem(todo.id)}
                          type="button"
                          aria-expanded={openItems.has(todo.id)}
                        >
                          <motion.span
                            className={`h-1.5 w-1.5 bg-[color:var(--app-dot)] ${
                              isOpen ? "" : "opacity-70"
                            }`}
                            animate={
                              isOpen
                                ? {
                                    scale: [0.8, 1.2, 0.8],
                                    opacity: [0.6, 1, 0.6],
                                  }
                                : { scale: 1, opacity: 0.7 }
                            }
                            transition={
                              isOpen
                                ? {
                                    duration: 1.6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }
                                : { duration: 0.2 }
                            }
                            aria-hidden="true"
                          />
                          {todo.subtasks.length} subtasks
                        </button>
                      ) : null}
                      <span className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">
                        {todo.progress}
                      </span>
                    </div>
                    {todo.subtasks && todo.subtasks.length > 0 ? (
                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            key="subtasks"
                            className="ml-2 overflow-hidden"
                            initial={{ height: 0, opacity: 0, y: -8 }}
                            animate={{ height: "auto", opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -8 }}
                            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <motion.ul
                              className="relative space-y-3 pl-7 text-xs text-[var(--app-muted)] before:absolute before:left-2 before:top-0 before:bottom-0 before:content-[''] before:border-l before:border-dashed before:border-[color:var(--app-dot)]"
                              variants={listVariants}
                              initial="closed"
                              animate="open"
                              exit="closed"
                            >
                              {todo.subtasks.map((subtask) => (
                                <motion.li
                                  key={subtask}
                                  variants={itemVariants}
                                  className="relative pl-6 before:absolute before:left-2 before:top-[0.55rem] before:h-3 before:w-3 before:content-[''] before:border-l before:border-b before:border-dashed before:border-[color:var(--app-dot)] after:absolute after:left-[0.95rem] after:top-[0.4rem] after:h-2 after:w-2 after:content-[''] after:bg-[color:var(--app-dot)]"
                                >
                                  {subtask}
                                </motion.li>
                              ))}
                            </motion.ul>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}
