export type TAG = "UNSORTED" | "DO" | "PLAN" | "DELEGATE";

export type TaskColumnType = {
  id: string;
  en: string;
  ko?: string;
  filter: (task: TaskType) => boolean;
};

export type TaskType = {
  id: string;
  tag: TAG;
  column: string;
  name: string;
  done: boolean;
  due?: Date;
};

export type NoteType = {
  id: string;
  summary: string[];
  content: string;
  guide: string;
  createdAt: Date;
};