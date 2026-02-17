"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      applyTheme(stored);
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const initialTheme: Theme = prefersDark.matches ? "dark" : "light";
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <button
      className="fixed right-5 top-5 z-50 rounded-full bg-[var(--app-card)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--app-fg)] shadow-sm"
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle color theme"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
