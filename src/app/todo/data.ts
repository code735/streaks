export type TodoItem = {
  id: string;
  title: string;
  tag: string;
  progress: string;
  subtasks?: string[];
};

export type DailyTodo = {
  date: string;
  todos: TodoItem[];
};

export type MonthMeta = {
  number: number;
  label: string;
  shortLabel: string;
};

export type YearMeta = {
  year: number;
  label: string;
  shortLabel: string;
};

export const defaultYear = 2026;
export const defaultMonth = 2;

export const monthMeta: MonthMeta[] = [
  { number: 1, label: "January", shortLabel: "Jan" },
  { number: 2, label: "February", shortLabel: "Feb" },
  { number: 3, label: "March", shortLabel: "Mar" },
  { number: 4, label: "April", shortLabel: "Apr" },
  { number: 5, label: "May", shortLabel: "May" },
  { number: 6, label: "June", shortLabel: "Jun" },
  { number: 7, label: "July", shortLabel: "Jul" },
  { number: 8, label: "August", shortLabel: "Aug" },
  { number: 9, label: "September", shortLabel: "Sep" },
  { number: 10, label: "October", shortLabel: "Oct" },
  { number: 11, label: "November", shortLabel: "Nov" },
  { number: 12, label: "December", shortLabel: "Dec" },
];

const yearSpan = 12;
const maxYear = 2099;
const maxStart = maxYear - yearSpan + 1;
const yearStart = Math.min(defaultYear, maxStart);

export const yearMeta: YearMeta[] = Array.from(
  { length: yearSpan },
  (_, index) => {
    const year = yearStart + index;
    return {
      year,
      label: String(year),
      shortLabel: `FY${String(year).slice(-2)}`,
    };
  }
);

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

export const buildDailyTodos = (
  monthNumber: number,
  yearNumber: number
): DailyTodo[] => {
  const daysInMonth = new Date(yearNumber, monthNumber, 0).getDate();
  const monthLabel = String(monthNumber).padStart(2, "0");

  return Array.from({ length: daysInMonth }, (_, index) => {
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
};
