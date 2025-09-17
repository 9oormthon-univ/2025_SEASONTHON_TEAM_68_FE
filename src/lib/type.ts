export type TAG = "DO" | "PLAN" | "DELEGATE";

export type Task = {
  id: string;
  column: string;
  name: string;
  done: boolean;
  due?: Date;
};

export type UnclassifiedTask = {
  column: string;
  name: string;
  due?: Date;
};

export type TaskColumn = {
  id: TAG;
  name: string;
  subtitle: string;
};

export type Note = {
  id: string;
  summary: string;
  content: string;
  guide: string;
  createdAt: Date;
};
