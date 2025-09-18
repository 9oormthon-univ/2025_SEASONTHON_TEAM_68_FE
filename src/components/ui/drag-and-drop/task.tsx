"use client";

import calendar from "@/../public/icons/calendar.svg";
import calendar_blue from "@/../public/icons/calendar_blue.svg";
import checkbox from "@/../public/icons/checkbox.svg";
import checkbox_checked from "@/../public/icons/checkbox_checked.svg";
import { KanbanCard as PrimitiveKanbanCard } from "@/components/ui/kanban";
import { TaskType } from "@/lib/type";
import { cn, columnToColor } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  initTask: TaskType;
  bgColor: string;
  showDate?: boolean;
  showCheckbox?: boolean;
}

export default function DragAndDropTask({
  initTask,
  bgColor,
  showCheckbox = false,
  showDate = false,
}: Props) {
  // TODO test
  const [task, setTask] = useState<TaskType>(initTask);
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
      {...task}
      className={cn("border-none rounded-xl", bgColor)}
    >
      <div className="flex-1 flex items-center">
        <div className="flex-1 flex items-center gap-1">
          <span
            className={cn(
              "w-1.5 min-w-1.5 h-1.5 rounded-full",
              columnToColor(task.column).bullet
            )}
          />
          {edit ? (
            <input
              type="text"
              className="tag-r-12 w-full"
              value={task.name}
              onChange={(e) =>
                setTask((prev) => ({ ...prev, name: e.target.value }))
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
            onClick={() => setTask((prev) => ({ ...prev, done: !prev.done }))}
          />
        )}
        {showDate && (
          <DatePicker
            className="flex items-center justify-center"
            selected={task.due}
            onChange={(date) =>
              setTask((prev) => ({ ...prev, due: date || undefined }))
            }
            customInput={
              <Image
                src={task.due ? calendar_blue : calendar}
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
