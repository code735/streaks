"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type TodoItem = {
  id: string;
  title: string;
  tag: string;
  progress: string;
  subtasks?: string[];
};

const templates: Omit<TodoItem, "id">[] = [
  {
    title: "Morning review",
    tag: "plan",
    progress: "todo",
    subtasks: ["Skim calendar", "Pick top 3"],
  },
  {
    title: "Focus sprint",
    tag: "deep-work",
    progress: "in progress",
  },
  {
    title: "Walk reset",
    tag: "health",
    progress: "queued",
    subtasks: ["Shoes on", "10 minute loop"],
  },
  {
    title: "Inbox sweep",
    tag: "admin",
    progress: "blocked",
  },
];

const monthNumber = 2;
const yearNumber = 2026;
const daysInMonth = new Date(yearNumber, monthNumber, 0).getDate();
const monthLabel = String(monthNumber).padStart(2, "0");

const dailyTodos = Array.from({ length: daysInMonth }, (_, index) => {
  const dayNumber = index + 1;
  const dayLabel = String(dayNumber).padStart(2, "0");
  const listCount = dayNumber % 2 === 0 ? 3 : 2;
  const todos = Array.from({ length: listCount }, (_, todoIndex) => {
    const template = templates[(index + todoIndex) % templates.length];
    return {
      id: `${dayLabel}-${todoIndex}`,
      ...template,
    };
  });

  return {
    date: `${dayLabel}-${monthLabel}-${yearNumber}`,
    todos,
  };
});

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
      <div className="px-6 pt-6">
        <input
          className="w-full border-b border-[color:var(--app-dot)] bg-transparent pb-2 text-sm text-[var(--app-fg)] placeholder:text-[var(--app-muted)] focus:border-[color:var(--app-fg)] focus:outline-none"
          placeholder="type something to search"
          type="search"
        />
      </div>

      <main className="flex w-full flex-col gap-6 px-6 pb-14 pt-8">
        {dailyTodos.map((day) => (
          <section
            key={day.date}
            data-date={day.date}
            className="space-y-4 rounded-2xl bg-[color:var(--app-glass)] p-5"
          >
            <h2 className="sticky top-0 z-10 -mx-5 rounded-t-2xl bg-[color:var(--app-glass)] px-5 py-2 text-lg font-semibold backdrop-blur-xl">
              {day.date}
            </h2>
            <ul className="space-y-6">
              {day.todos.map((todo) => {
                const isOpen = openItems.has(todo.id);

                return (
                  <li key={todo.id} className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3 rounded-[6px] bg-[#00000012] p-2.5 text-sm backdrop-blur-[1px] dark:bg-[#ffffff38]">
                    <span className="font-medium text-[var(--app-fg)]">
                      {todo.title}
                    </span>
                    <span className="rounded-full border border-[color:var(--app-dot)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--app-muted)]">
                      {todo.tag}
                    </span>
                    {todo.subtasks && todo.subtasks.length > 0 ? (
                      <button
                        className={`inline-flex items-center gap-2 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ease-out ${
                          isOpen
                            ? "border-[color:var(--app-fg)] text-[var(--app-fg)]"
                            : "border-dashed border-[color:var(--app-dot)] text-[var(--app-muted)]"
                        }`}
                        onClick={() => toggleItem(todo.id)}
                        type="button"
                        aria-expanded={openItems.has(todo.id)}
                      >
                        <motion.span
                          className={`h-1.5 w-1.5 rounded-full bg-[color:var(--app-dot)] ${
                            isOpen ? "" : "opacity-70"
                          }`}
                          animate={
                            isOpen
                              ? { scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6] }
                              : { scale: 1, opacity: 0.7 }
                          }
                          transition={
                            isOpen
                              ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
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
                                className="relative pl-6 before:absolute before:left-2 before:top-[0.55rem] before:h-3 before:w-3 before:content-[''] before:border-l before:border-b before:border-dashed before:border-[color:var(--app-dot)] before:rounded-bl-xl after:absolute after:left-[0.95rem] after:top-[0.4rem] after:h-2 after:w-2 after:content-[''] after:rounded-full after:bg-[color:var(--app-dot)]"
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
