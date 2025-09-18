"use client";

import { GradientButton } from "@/components/button";
import { KanbanProvider } from "@/components/ui/kanban";
import { columns } from "@/lib/dummy";
import { Task } from "@/lib/type";
import Link from "next/link";
import { useState } from "react";

interface Props {
  initTasks: Task[];
  children: React.ReactNode;
}

export default function DragAndDropProvider({ initTasks, children }: Props) {
  const [tasks, setTasks] = useState<Task[]>(initTasks);
  const saveTasks = () => {
    // TODO
  };

  return (
    <>
      <KanbanProvider columns={columns} data={tasks} onDataChange={setTasks}>
        {children}
      </KanbanProvider>
      <GradientButton className="self-end" onClick={saveTasks}>
        <Link href="/done">저장하기 →</Link>
      </GradientButton>
    </>
  );
}
