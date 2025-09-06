"use client";

import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from "@/components/ui/shadcn-io/kanban";
import { useState } from "react";
import { candidates as defaultCandidates, containers } from "@/lib/dummy";
import { cn, quadrantToColor } from "@/lib/utils";
import KanbanItemCard from "./ui/kanban-card-task";
import KanbanCandidateCard from "./ui/kanban-card-candidate";

const KanbanCandidate = () => {
  const [tasks, setTasks] = useState(defaultCandidates);

  return (
    <KanbanProvider columns={containers} data={tasks} onDataChange={setTasks}>
      {(column) => {
        const colors = quadrantToColor(column.id);
        return (
          <KanbanBoard
            id={column.id}
            key={column.id}
            className={cn("relative", colors.bg)}
          >
            <KanbanHeader>
              <div
                className={cn(
                  "absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center",
                  colors.text
                )}
              >
                <span className="font-semibold text-4xl">{column.name}</span>
                <span className="font-semibold text-xl">{column.subtitle}</span>
              </div>
            </KanbanHeader>
            <KanbanCards id={column.id}>
              {(task: (typeof tasks)[number]) => (
                <KanbanCandidateCard
                  key={task.id}
                  column={column}
                  task={task}
                  bulletColor={colors.bullet}
                />
              )}
            </KanbanCards>
          </KanbanBoard>
        );
      }}
    </KanbanProvider>
  );
};

export default KanbanCandidate;
