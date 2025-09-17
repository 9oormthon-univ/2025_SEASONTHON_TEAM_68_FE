import { Task, UnclassifiedTask, Note, TaskColumn } from "@/lib/type";

export const columns: TaskColumn[] = [
  {
    id: "DO",
    name: "Do",
    subtitle: "진행하기",
  },
  {
    id: "PLAN",
    name: "Plan",
    subtitle: "계획하기",
  },
  {
    id: "DELEGATE",
    name: "Delegate",
    subtitle: "위임하기",
  },
];

export const tasks: Task[] = [
  {
    id: "1",
    column: "DO",
    name: "Design new homepage",
    done: false,
    due: new Date("2025-09-07"),
  },
  {
    id: "2",
    column: "PLAN",
    name: "Implement authentication",
    done: false,
    due: new Date("2025-09-10"),
  },
  {
    id: "3",
    column: "DELEGATE",
    name: "Set up database",
    done: true,
    due: new Date("2025-09-15"),
  },
];

export const unclassifiedTasks: UnclassifiedTask[] = [
  {
    column: "DO",
    name: "Design new homepage",
  },
  {
    column: "PLAN",
    name: "Implement authentication",
  },
  {
    column: "DELEGATE",
    name: "Set up database",
    due: new Date("2025-09-15"),
  },
];

export const notes: Note[] = [
  {
    id: "1",
    summary: "Meeting with the design team",
    content: "Discussed the new homepage design and finalized the color scheme.",
    guide: "Focus on user experience.",
    createdAt: new Date("2025-09-01"),
  },
  {
    id: "2",
    summary: "Sprint planning session",
    content: "Planned tasks for the next sprint and assigned responsibilities.",
    guide: "Focus on backend integration.",
    createdAt: new Date("2025-09-05"),
  }
]