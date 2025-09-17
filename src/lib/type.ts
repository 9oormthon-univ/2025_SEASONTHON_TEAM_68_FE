export type TAG = "DO" | "PLAN" | "DELEGATE";

export type Task = {
  id: string;
  tag: TAG;
  name: string;
  done: boolean;
  due: Date;
};

export type UnclassifiedTask = {
  id: string;
  tag?: TAG;
  name: string;
  due?: Date;
};

export type Board = {
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
