"use client";

import calendar from "@/../public/icons/calendar.svg";
import calendar_value from "@/../public/icons/calendar_value.svg";
import checkbox from "@/../public/icons/checkbox.svg";
import checkbox_checked from "@/../public/icons/checkbox_checked.svg";
import { KanbanCard as PrimitiveKanbanCard } from "@/components/ui/kanban";
import { Task, TaskColumn } from "@/lib/type";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  column: TaskColumn;
  showDate?: boolean;
  showCheckbox?: boolean;
  initTask: Task;
  bulletColor: string;
}

export default function DragAndDropTask({
  column,
  bulletColor,
  initTask,
  showCheckbox = false,
  showDate = false,
}: Props) {
  const [task, setTasks] = useState(initTask);
  const [edit, setEdit] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setEdit(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    setEdit(false);
    // TODO validate and save
  };

  return (
    <PrimitiveKanbanCard
      column={column.id}
      id={task.id}
      key={task.id}
      name={task.name}
      className="border-none rounded-xl bg-gray-300"
    >
      <div className="flex-1 flex items-center">
        <div className="flex-1 flex items-center gap-1">
          <span
            className={cn("w-1.5 min-w-1.5 h-1.5 rounded-full", bulletColor)}
          />
          {edit ? (
            <input
              type="text"
              className="tag-r-12 w-full"
              value={task.name}
              onChange={(e) =>
                setTasks((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <span
              className="tag-r-12 w-full"
              onDoubleClick={() => setEdit(true)}
            >
              {task.name}
            </span>
          )}
        </div>

        {edit && <span className="font-normal text-[10px]">저장</span>}
        {showCheckbox && (
          <Image
            src={task.done ? checkbox_checked : checkbox}
            alt="checkbox"
            className="w-4 h-4 cursor-pointer"
            onClick={() => setTasks((prev) => ({ ...prev, done: !prev.done }))}
          />
        )}
        {showDate && (
          <DatePicker
            className="flex items-center justify-center"
            selected={task.due}
            onChange={(date) =>
              setTasks((prev) => ({ ...prev, due: date ?? undefined }))
            }
            customInput={
              <Image
                src={task.due ? calendar_value : calendar}
                alt="calendar"
                className="w-6 h-6 p-0.5 pt-1.25 cursor-pointer"
              />
            }
          />
        )}
      </div>
    </PrimitiveKanbanCard>
  );
}
