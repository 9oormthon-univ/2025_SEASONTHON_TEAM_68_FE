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
  task: TaskType;
  bgColor: string;
  showDate?: boolean;
  showCheckbox?: boolean;
}

export default function DragAndDropTask({
  task,
  bgColor,
  showCheckbox = false,
  showDate = false,
}: Props) {
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
  };

  return (
    <PrimitiveKanbanCard id={task.id} bgColor={bgColor}>
      {(data, onDataChange) => (
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
                className="tag-r-12 w-full mr-2.5 py-1"
                value={task.name}
                onChange={(e) => {
                  const newData = data.map((t) =>
                    t.id === task.id ? { ...t, name: e.target.value } : t
                  );
                  onDataChange(newData);
                }}
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

          {edit && (
            <button
              className="font-normal text-[10px] cursor-pointer"
              onClick={handleEdit}
            >
              저장
            </button>
          )}
          {!edit && showCheckbox && (
            <Image
              src={task.done ? checkbox_checked : checkbox}
              alt="checkbox"
              className="w-4 h-4 cursor-pointer"
              onClick={() => {
                const newData = data.map((t) =>
                  t.id === task.id ? { ...t, done: !t.done } : t
                );
                onDataChange(newData);
              }}
            />
          )}
          {!edit && showDate && (
            <DatePicker
              className="flex items-center justify-center"
              selected={task.due}
              onChange={(date) => {
                const newData = data.map((t) =>
                  t.id === task.id ? { ...t, due: date || undefined } : t
                );
                onDataChange(newData);
              }}
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
      )}
    </PrimitiveKanbanCard>
  );
}
