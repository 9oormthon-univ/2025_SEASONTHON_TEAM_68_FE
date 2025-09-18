"use client";

import { registry } from "@/lib/column-registry";
import { TaskColumnType, TaskType, TAG } from "@/lib/type";
import { cn, columnToColor } from "@/lib/utils";
import Link from "next/link";
import Button from "./button";
import DragAndDropColumn from "./ui/drag-and-drop/column";
import { KanbanProvider } from "./ui/kanban";
import Alert from "@/../public/icons/alert.svg";
import { useState } from "react";
import Image from "next/image";

interface Props {
  initTasks: TaskType[];
  guide: { guide: string; tip: string };
}

export default function UnclassifiedTaskBoard({ initTasks, guide }: Props) {
  const [tasks, setTasks] = useState<TaskType[]>(initTasks);
  const columns = Array.from(registry.values()).filter(
    (col) => col.id === "DO" || col.id === "PLAN" || col.id === "DELEGATE"
  );

  const saveTasks = () => {
    // TODO
  };

  return (
    <>
      <KanbanProvider columns={columns} data={tasks} onDataChange={setTasks}>
        {columns.map((column) => (
          <UnclassifiedTaskColumn key={column.id} column={column} />
        ))}
      </KanbanProvider>
      <div className="w-full flex flex-col gap-2.5 px-10 py-7 bg-gray-0 border border-gray-500 rounded-2xl">
        <span className="flex gap-4">
          <Image src={Alert} alt="alert icon" />
          <p>{guide.guide}</p>
        </span>
        <span>{guide.tip}</span>
      </div>
      <Button variant="gradient" className="self-end" onClick={saveTasks}>
        <Link href="/done">저장하기 →</Link>
      </Button>
    </>
  );
}

function UnclassifiedTaskColumn({ column }: { column: TaskColumnType }) {
  const color = columnToColor(column.id);

  return (
    <DragAndDropColumn column={column} taskBgColor="bg-gray-0" showDate>
      <div
        className={cn(
          "absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center",
          color.text
        )}
      >
        <span className="font-semibold text-4xl">{column.en}</span>
        <span className="font-semibold text-xl">{column.ko}</span>
      </div>
    </DragAndDropColumn>
  );
}
