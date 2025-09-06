import { Task, TaskCandidate } from "@/lib/type";
import { TaskContainer } from "@/lib/type";

export const containers: TaskContainer[] = [
  {
    id: "DO",
    name: "Do",
    subtitle: "진행하기",
    color: "#18a935",
  },
  {
    id: "PLAN",
    name: "Plan",
    subtitle: "계획하기",
    color: "#ff9859",
  },
  {
    id: "DELEGATE",
    name: "Delegate",
    subtitle: "위임하기",
    color: "#9b9b9b",
  },
];

export const tasks: Task[] = [
  {
    id: "1",
    column: "DO",
    name: "Design new homepage",
    completed: false,
    due: new Date("2026-09-07"),
  },
  {
    id: "2",
    column: "PLAN",
    name: "Implement authentication",
    completed: false,
    due: new Date("2026-09-10"),
  },
  {
    id: "3",
    column: "DELEGATE",
    name: "Set up database",
    completed: false,
    due: new Date("2026-09-15"),
  },
];

export const candidates: TaskCandidate[] = [
  {
    id: "1",
    column: "DO",
    name: "Design new homepage",
  },
  {
    id: "2",
    column: "PLAN",
    name: "Implement authentication",
  },
  {
    id: "3",
    column: "DELEGATE",
    name: "Set up database",
    due: new Date("2026-09-15"),
  },
];
