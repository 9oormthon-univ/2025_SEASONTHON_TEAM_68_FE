import { NoteType, TaskType } from "@/lib/type";

export const tasks: TaskType[] = [
  {
    id: "1",
    tag: "DO",
    column: "DO",
    name: "Design new homepage",
    done: false,
    due: new Date("2025-09-07"),
  },
  {
    id: "2",
    tag: "PLAN",
    column: "PLAN",
    name: "Implement authentication",
    done: false,
    due: new Date("2025-09-10"),
  },
  {
    id: "3",
    tag: "DELEGATE",
    column: "DELEGATE",
    name: "Set up database",
    done: true,
    due: new Date("2025-09-15"),
  },
  {
    id: "4",
    tag: "DO",
    column: "LATE",
    name: "Create marketing plan",
    done: false,
    due: new Date("2025-09-20"),
  }
];

export const unclassifiedTasks: TaskType[] = [
  {
    id: "5",
    tag: "UNSORTED",
    column: "UNSORTED",
    name: "Design new homepage",
    done: false,
    due: new Date("2025-09-07"),
  },
  {
    id: "6",
    tag: "UNSORTED",
    column: "UNSORTED",
    name: "Fix bugs in user profile",
    done: false,
  },
  {
    id: "7",
    tag: "UNSORTED",
    column: "UNSORTED",
    name: "Update user documentation",
    done: false,
  },
  {
    id: "8",
    tag: "UNSORTED",
    column: "UNSORTED",
    name: "Conduct user testing",
    done: false,
  },
  {
    id: "9",
    tag: "UNSORTED",
    column: "UNSORTED",
    name: "Optimize database queries",
    done: false,
  },
  {
    id: "10",
    tag: "DO",
    column: "DO",
    name: "Create marketing plan",
    done: false,
    due: new Date("2025-09-07"),
  },
  {
    id: "11",
    tag: "PLAN",
    column: "PLAN",
    name: "Implement authentication",
    done: false,
    due: new Date("2025-09-07"),
  },
  {
    id: "12",
    tag: "DELEGATE",
    column: "DELEGATE",
    name: "Set up database",
    done: false,
    due: new Date("2025-09-15"),
  },
];

export const notes: NoteType[] = [
  {
    id: "1",
    summary: ["Meeting with the design team",
      "Discussed homepage redesign"
      , "Finalized color scheme"
    ],
    content: "Discussed the new homepage design and finalized the color scheme.",
    guide: "Focus on user experience.",
    createdAt: new Date("2025-09-01"),
  },
  {
    id: "2",
    summary: ["Sprint planning session"
      , "Planned tasks for next sprint"
      , "Assigned responsibilities"
    ],
    content: "Planned tasks for the next sprint and assigned responsibilities.",
    guide: "Focus on backend integration.",
    createdAt: new Date("2025-09-05"),
  }
]

export const guide: { guide: string; tip: string } = {
  guide: "이번 회의에서 도출된 Action Item이 적네요. 더 효율적인 회의 방식을 함께 고민해보면 어떨까요?",
  tip: "주기를 조정하거나 논의 방식을 바꿔보면 더 도움이 될 거예요.",
}