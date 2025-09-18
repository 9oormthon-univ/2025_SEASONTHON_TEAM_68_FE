import { TaskColumnType } from "./type";

export const registry: Map<string, TaskColumnType> = new Map();

registry.set("UNSORTED", {
  id: "UNSORTED",
  en: "Unsorted",
  ko: "추출된 할 일",
  filter: (task) => task.tag == undefined,
});

registry.set("DO", {
  id: "DO",
  en: "Do",
  ko: "진행하기",
  filter: (task) => task.column == "DO",
});

registry.set("PLAN", {
  id: "PLAN",
  en: "Plan",
  ko: "계획하기",
  filter: (task) => task.column == "PLAN",
});

registry.set("DELEGATE", {
  id: "DELEGATE",
  en: "Delegate",
  ko: "위임하기",
  filter: (task) => task.column == "DELEGATE",
});

registry.set("LATE", {
  id: "LATE",
  en: "Late",
  ko: "밀린 할 일",
  filter: (task) => !task.done && !!task.due && task.due < new Date(),
});