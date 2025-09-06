export type MatrixQuadrant = "DO" | "PLAN" | "DELEGATE";

export type Task = {
  id: string;
  name: string;
  completed: boolean;
  column: MatrixQuadrant;
  due?: Date;
};

export type TaskCandidate = {
  id: string;
  name: string;
  column: MatrixQuadrant | "UNDEFINED";
  due?: Date;
};

export type TaskContainer = {
  id: MatrixQuadrant;
  name: string;
  subtitle: string;
  color: string;
};

export type Note = {
  id: string;
  summary: string;
  rawText: string;
  createdAt: string;
};
