"use client";

import {
  KanbanBoard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from "@/components/ui/kanban";
import { boards } from "@/lib/dummy";
import { UnclassifiedTask } from "@/lib/type";
import { cn, tagToColor } from "@/lib/utils";
import { useState } from "react";
import KanbanCandidateCard from "./ui/kanban-card-candidate";

const KanbanCandidate = ({
  defaultCandidates,
}: {
  defaultCandidates: UnclassifiedTask[];
}) => {
  const [tasks, setTasks] = useState(defaultCandidates);

  return (
    <KanbanProvider columns={boards} data={tasks} onDataChange={setTasks}>
      {(column) => {
        const colors = tagToColor(column.id);
        return (
          <KanbanBoard
            id={column.id}
            key={column.id}
            className={cn("relative min-h-96", colors.bg)}
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
                  id={task.id}
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
