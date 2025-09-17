"use client";

import { GradientButton } from "@/components/button";
import {
  KanbanBoard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from "@/components/ui/kanban";
import { lists } from "@/lib/dummy";
import { Task } from "@/lib/type";
import { cn, tagToColor } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import KanbanTask from "./ui/kanban-task";
import { tasks as InitTasks } from "@/lib/dummy";

// interface Props {
//   initTasks: Task[];
// }

/**
 * Kanban 컴포넌트입니다.
 * TODO: props로 받은 initTasks를 상태로 관리하고, 저장 버튼 클릭 시 해당 상태를 서버에 저장하는 기능 추가
 */
const Component = () => {
  const [tasks, setTasks] = useState<Task[]>(InitTasks);
  const saveTasks = () => {};

  return (
    <>
      <KanbanProvider columns={lists} data={tasks} onDataChange={setTasks}>
        {(column) => {
          const color = tagToColor(column.id);
          return (
            <KanbanBoard
              id={column.id}
              key={column.id}
              className={cn("relative min-h-96", color.bg)}
            >
              <KanbanHeader>
                <div
                  className={cn(
                    "absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center",
                    color.text
                  )}
                >
                  <span className="font-semibold text-4xl">{column.name}</span>
                  <span className="font-semibold text-xl">
                    {column.subtitle}
                  </span>
                </div>
              </KanbanHeader>
              <KanbanCards id={column.id}>
                {(task: Task) => (
                  <KanbanTask
                    key={task.id}
                    column={column}
                    task={task}
                    bulletColor={color.bullet}
                  />
                )}
              </KanbanCards>
            </KanbanBoard>
          );
        }}
      </KanbanProvider>
      <GradientButton className="self-end" onClick={saveTasks}>
        <Link href="/done">저장하기 →</Link>
      </GradientButton>
    </>
  );
};

export default Component;
