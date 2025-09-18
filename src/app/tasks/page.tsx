"use client";

import Chip from "@/components/ui/chip";
import DragAndDropColumn from "@/components/ui/drag-and-drop/column";
import { KanbanProvider } from "@/components/ui/kanban";
import { registry } from "@/lib/column-registry";
import { tasks as initTasks } from "@/lib/dummy";
import { TaskColumnType } from "@/lib/type";
import { columnToColor } from "@/lib/utils";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import calendar_black from "@/../public/icons/calendar_black.svg";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";

export default function Page() {
  const initColumns = Array.from(registry.values()).filter(
    (col) => col.id === "LATE"
  );

  const [tasks, setTasks] = useState(initTasks);
  const [columns, setColumns] = useState<TaskColumnType[]>(initColumns);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setColumns([
      ...initColumns,
      ...createDateColumns(date),
      ...createDateColumns(getNextDate(date)),
    ]);
  }, [date]);

  return (
    <main className="w-full flex flex-col p-12 gap-4 items-end">
      <div>
        <DatePicker
          className="flex items-center justify-center"
          selected={date}
          popperPlacement="top-end"
          onChange={(date) => setDate(date || new Date())}
          customInput={
            <Image
              src={calendar_black}
              alt="calendar"
              className="w-10 h-10 p-2 bg-gray-0 rounded-xl cursor-pointer"
            />
          }
        />
      </div>
      <KanbanProvider columns={columns} data={tasks} onDataChange={setTasks}>
        <div className="flex flex-col gap-[10.4px]">
          <h3 className="title-sb-24">{date.getMonth() + 1}월</h3>
          <LateColumn />
        </div>
        <div className="flex flex-col items-center gap-5">
          <Chip className={`bg-gray-900 text-gray-0`}>{date.getDate()}일</Chip>
          {columns
            .filter((col) => col.id.endsWith(parseKeyFromDate(date)))
            .map((column) => (
              <DateColumn key={column.id} column={column} />
            ))}
        </div>
        <div className="flex flex-col items-center gap-5">
          <Chip className={`bg-gray-900 text-gray-0`}>
            {date.getDate() + 1}일
          </Chip>
          {columns
            .filter((col) =>
              col.id.endsWith(parseKeyFromDate(getNextDate(date)))
            )
            .map((column) => (
              <DateColumn key={column.id} column={column} />
            ))}
        </div>
      </KanbanProvider>
    </main>
  );
}

function LateColumn() {
  const column = registry.get("LATE")!;
  const color = columnToColor(column.id);

  return (
    <DragAndDropColumn column={column} taskBgColor="bg-gray-0" showCheckbox>
      <Chip className={`${color["chip-bg"]} ${color["chip-text"]}`}>
        {column.en}
      </Chip>
    </DragAndDropColumn>
  );
}

function DateColumn({ column }: { column: TaskColumnType }) {
  const color = columnToColor(column.id);

  return (
    <DragAndDropColumn
      column={column}
      taskBgColor="bg-gray-300"
      showCheckbox
      className="bg-white"
    >
      <Chip className={`${color["chip-bg"]} ${color["chip-text"]}`}>
        {column.en}
      </Chip>
    </DragAndDropColumn>
  );
}

function createDateColumns(date: Date): TaskColumnType[] {
  const id = parseKeyFromDate(date);
  return [
    {
      id: "DO-" + id,
      en: "Do",
      filter: (task) =>
        task.tag === "DO" &&
        task.due !== undefined &&
        parseKeyFromDate(task.due) === id,
    },
    {
      id: "PLAN-" + id,
      en: "Plan",
      filter: (task) =>
        task.tag === "PLAN" &&
        task.due !== undefined &&
        parseKeyFromDate(task.due) === id,
    },
  ];
}

function parseKeyFromDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function getNextDate(date: Date) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + 1);
  return nextDate;
}
