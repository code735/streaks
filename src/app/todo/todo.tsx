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

export default function Todo() {
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
            className="space-y-3 rounded-2xl bg-[var(--app-card)] p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold">{day.date}</h2>
            <ul className="space-y-4">
              {day.todos.map((todo) => (
                <li key={todo.id} className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="font-medium text-[var(--app-fg)]">
                      {todo.title}
                    </span>
                    <span className="rounded-full border border-[color:var(--app-dot)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--app-muted)]">
                      {todo.tag}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">
                      {todo.progress}
                    </span>
                  </div>
                  {todo.subtasks && todo.subtasks.length > 0 ? (
                    <ul className="ml-4 list-disc space-y-1 text-xs text-[var(--app-muted)]">
                      {todo.subtasks.map((subtask) => (
                        <li key={subtask}>{subtask}</li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}
