"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { buildDailyTodos, defaultYear, monthMeta } from "@/app/todo/data";

type PanelMode = "search" | "nav";

type NavItem = {
  id: string;
  label: string;
  href: string;
  section: "Routes";
};

type TodoResult = {
  id: string;
  title: string;
  tag: string;
  progress: string;
  date: string;
  href: string;
};

const baseRoutes: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    section: "Routes",
  },
  {
    id: "todo",
    label: "Todo",
    href: "/todo",
    section: "Routes",
  },
  {
    id: "progress",
    label: "Progress",
    href: "/progress",
    section: "Routes",
  },
  {
    id: "years",
    label: "Years",
    href: "/years",
    section: "Routes",
  },
];

const normalize = (value: string) => value.toLowerCase().trim();

export default function GlobalCommandPalette() {
  const [mode, setMode] = useState<PanelMode | null>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const allTodos = useMemo<TodoResult[]>(() => {
    return monthMeta.flatMap((month) => {
      const dailyTodos = buildDailyTodos(month.number, defaultYear);
      const monthValue = String(month.number).padStart(2, "0");

      return dailyTodos.flatMap((day) =>
        day.todos.map((todo) => {
          const anchorId = `todo-${day.date}-${todo.id}`;
          return {
            id: `${anchorId}-${month.number}`,
            title: todo.title,
            tag: todo.tag,
            progress: todo.progress,
            date: day.date,
            href: `/todo?month=${monthValue}&year=${defaultYear}#${anchorId}`,
          };
        })
      );
    });
  }, []);

  const filteredNav = useMemo(() => {
    const search = normalize(query);
    if (!search) {
      return {
        base: baseRoutes,
        flat: baseRoutes,
      };
    }

    const matches = (item: NavItem) =>
      normalize(`${item.label}`).includes(search);
    const base = baseRoutes.filter(matches);

    return {
      base,
      flat: base,
    };
  }, [query]);

  const filteredTodos = useMemo(() => {
    const search = normalize(query);
    if (!search) {
      return allTodos.slice(0, 12);
    }

    return allTodos
      .filter((item) =>
        normalize(`${item.title} ${item.tag} ${item.progress} ${item.date}`).includes(
          search
        )
      )
      .slice(0, 20);
  }, [allTodos, query]);

  const results = mode === "nav" ? filteredNav.flat : filteredTodos;

  useEffect(() => {
    if (!mode) {
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mode]);

  useEffect(() => {
    if (mode) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [mode]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, mode]);

  useEffect(() => {
    if (!mode) {
      return;
    }

    if (results.length === 0) {
      setActiveIndex(0);
      return;
    }

    setActiveIndex((prev) => Math.min(prev, results.length - 1));
  }, [results, mode]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (event.altKey && event.metaKey && key === "f") {
        event.preventDefault();
        setMode((prev) => (prev === "search" ? null : "search"));
        return;
      }
      if (event.altKey && event.metaKey && key === "p") {
        event.preventDefault();
        setMode((prev) => (prev === "nav" ? null : "nav"));
        return;
      }
      if (!mode) {
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setMode(null);
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) =>
          results.length === 0 ? 0 : (prev + 1) % results.length
        );
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) =>
          results.length === 0
            ? 0
            : (prev - 1 + results.length) % results.length
        );
        return;
      }
      if (event.key === "Enter" && results.length > 0) {
        event.preventDefault();
        const item = results[activeIndex];
        if (item) {
          router.push(item.href);
          setMode(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, mode, results, router]);

  const handleSelect = (href: string) => {
    router.push(href);
    setMode(null);
  };

  const panelTitle = "Commands";
  const panelHint =
    mode === "nav" ? "Filter routes" : "Search todos";

  return (
    <>
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 hidden border-t border-[color:var(--app-border)] bg-[color:var(--app-panel)]/90 px-6 py-3 text-[13px] font-medium lowercase tracking-[0.14em] text-[color:rgba(235,230,223,0.72)] shadow-[0_-12px_30px_rgba(0,0,0,0.45)] sm:flex">
        <div className="flex w-full items-center justify-end">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-[color:var(--app-muted)]">
                search
              </span>
              <span className="flex items-center gap-2">
                <kbd
                  className="border-0 bg-transparent p-0 font-semibold text-white"
                  style={{ color: "#fff" }}
                >
                  Alt
                </kbd>
                <span className="font-semibold text-white" style={{ color: "#fff" }}>
                  +
                </span>
                <kbd
                  className="border-0 bg-transparent p-0 font-semibold text-white"
                  style={{ color: "#fff" }}
                >
                  Super
                </kbd>
                <span className="font-semibold text-white" style={{ color: "#fff" }}>
                  +
                </span>
                <kbd
                  className="border-0 bg-transparent p-0 font-semibold text-white"
                  style={{ color: "#fff" }}
                >
                  F
                </kbd>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-[color:var(--app-muted)]">
                projects
              </span>
              <span className="flex items-center gap-2">
                <kbd
                  className="border-0 bg-transparent p-0 font-semibold text-white"
                  style={{ color: "#fff" }}
                >
                  Alt
                </kbd>
                <span className="font-semibold text-white" style={{ color: "#fff" }}>
                  +
                </span>
                <kbd
                  className="border-0 bg-transparent p-0 font-semibold text-white"
                  style={{ color: "#fff" }}
                >
                  Super
                </kbd>
                <span className="font-semibold text-white" style={{ color: "#fff" }}>
                  +
                </span>
                <kbd
                  className="border-0 bg-transparent p-0 font-semibold text-white"
                  style={{ color: "#fff" }}
                >
                  P
                </kbd>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-[color:var(--app-muted)]">
                close
              </span>
              <span>
                <kbd
                  className="border-0 bg-transparent p-0 font-semibold text-white"
                  style={{ color: "#fff" }}
                >
                  Esc
                </kbd>
              </span>
            </div>
          </div>
        </div>
      </div>

      {mode ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-24 backdrop-blur-sm"
          onClick={() => setMode(null)}
        >
          <div
            className="w-full max-w-2xl bg-[color:var(--app-panel)]/95 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 pt-5 text-[11px] font-semibold uppercase tracking-[0.4em] text-[var(--app-muted)]">
              <span className="text-white">{panelTitle}</span>
              <span className="text-[10px]">esc</span>
            </div>
            <div className="px-6 pt-4">
              <input
                ref={inputRef}
                className="w-full border-b border-[color:var(--app-border)] bg-transparent pb-3 text-sm text-[var(--app-fg)] placeholder:text-[var(--app-muted)] focus:border-[color:var(--app-accent)] focus:outline-none"
                placeholder={panelHint}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            <div className="max-h-[60vh] overflow-y-auto px-4 pb-6 pt-4">
              {mode === "nav" ? (
                <div className="space-y-4">
                  {filteredNav.base.length > 0 ? (
                    <div>
                      <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--app-muted)]">
                        Routes
                      </div>
                      <div className="space-y-1">
                        {filteredNav.base.map((item, index) => {
                          const isActive = index === activeIndex;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleSelect(item.href)}
                              className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition ${
                                isActive
                                  ? "bg-[var(--app-accent)] text-[#1b130c]"
                                  : "text-[var(--app-fg)] hover:bg-white/5"
                              }`}
                            >
                              <span>{item.label}</span>
                              <span
                                className={`text-[11px] uppercase tracking-[0.3em] ${
                                  isActive
                                    ? "text-[#1b130c]/70"
                                    : "text-[var(--app-muted)]"
                                }`}
                              >
                                Route
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  {filteredNav.flat.length === 0 ? (
                    <div className="px-2 text-sm text-[var(--app-muted)]">
                      No routes match that query.
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="px-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--app-muted)]">
                    Todos
                  </div>
                  <div className="space-y-1">
                    {filteredTodos.map((item, index) => {
                      const isActive = index === activeIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelect(item.href)}
                          className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition ${
                            isActive
                              ? "bg-[var(--app-accent)] text-[#1b130c]"
                              : "text-[var(--app-fg)] hover:bg-white/5"
                          }`}
                        >
                          <div className="flex flex-col items-start gap-1">
                            <span className="font-medium">{item.title}</span>
                            <span
                              className={`text-[10px] uppercase tracking-[0.3em] ${
                                isActive
                                  ? "text-[#1b130c]/70"
                                  : "text-[var(--app-muted)]"
                              }`}
                            >
                              {item.tag} · {item.progress}
                            </span>
                          </div>
                          <span
                            className={`text-[10px] uppercase tracking-[0.3em] ${
                              isActive
                                ? "text-[#1b130c]/70"
                                : "text-[var(--app-muted)]"
                            }`}
                          >
                            {item.date}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {filteredTodos.length === 0 ? (
                    <div className="px-2 text-sm text-[var(--app-muted)]">
                      No todos match that search.
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
