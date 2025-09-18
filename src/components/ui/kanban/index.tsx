"use client";

import handler from "@/../public/icons/handler.svg";
import { ScrollArea, ScrollBar } from "@/components/ui/sidebar/scroll-area";
import { TaskColumnType, TaskType } from "@/lib/type";
import { cn } from "@/lib/utils";
import type {
  Announcements,
  DndContextProps,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import {
  createContext,
  type HTMLAttributes,
  type ReactNode,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import tunnel from "tunnel-rat";

const t = tunnel();

export type { DragEndEvent } from "@dnd-kit/core";

type KanbanContextProps<
  T extends TaskType = TaskType,
  C extends TaskColumnType = TaskColumnType
> = {
  columns: C[];
  data: T[];
  onDataChange: (data: T[]) => void;
  activeCardId: string | null;
};

const KanbanContext = createContext<KanbanContextProps<any, any>>({
  columns: [],
  data: [],
  onDataChange: () => {},
  activeCardId: null,
});

export type KanbanBoardProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export const KanbanBoard = ({ id, children, className }: KanbanBoardProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      className={cn(
        "flex size-full min-h-40 flex-col gap-7 divide-y rounded-md bg-secondary text-xs shadow-sm ring-2 transition-all",
        className
      )}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};

export type KanbanCardProps = {
  id: string;
  bgColor: string;
  children: (
    data: TaskType[],
    onDataChange: (data: TaskType[]) => void
  ) => ReactNode;
  className?: string;
};

export const KanbanCard = <T extends TaskType = TaskType>({
  id,
  bgColor,
  children,
  className,
}: KanbanCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
    isDragging,
  } = useSortable({
    id,
  });
  const { activeCardId, data, onDataChange } = useContext(
    KanbanContext
  ) as KanbanContextProps;
  const item = data.find((item) => item.id === id) as T;

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <>
      <div style={style} {...attributes} ref={setNodeRef}>
        <li
          className={cn(
            "flex items-center gap-2.5 bg-gray-0 h-10 px-2.5 border-none rounded-xl",
            item.done ? "bg-[#DBF8EB]" : bgColor,
            className
          )}
        >
          <Image
            className={cn(
              "cursor-grab",
              isDragging && "pointer-events-none cursor-grabbing opacity-30"
            )}
            {...listeners}
            src={handler}
            alt="handler"
          />
          {children(data, onDataChange)}
        </li>
      </div>
      {activeCardId === id && (
        <t.In>
          <li
            className={cn(
              "flex items-center gap-2.5 bg-gray-0 h-10 px-2.5 rounded-xl",
              className
            )}
          >
            <Image
              className={cn(
                "cursor-grab",
                isDragging && "pointer-events-none cursor-grabbing opacity-30"
              )}
              {...listeners}
              src={handler}
              alt="handler"
            />
            {children(data, onDataChange)}
          </li>
        </t.In>
      )}
    </>
  );
};

export type KanbanCardsProps<T extends TaskType = TaskType> = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "id"
> & {
  column: TaskColumnType;
  children: (item: T) => ReactNode;
};

export const KanbanCards = <T extends TaskType = TaskType>({
  column,
  children,
  className,
  ...props
}: KanbanCardsProps<TaskType>) => {
  const { data } = useContext(KanbanContext) as KanbanContextProps<TaskType>;
  const filteredData = data.filter(column.filter);
  const items = filteredData.map((item) => item.id);

  return (
    <ScrollArea>
      <SortableContext items={items}>
        <div
          className={cn("flex flex-grow flex-col gap-5", className)}
          {...props}
        >
          {filteredData.map(children)}
        </div>
      </SortableContext>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

export type KanbanProviderProps<
  T extends TaskType = TaskType,
  C extends TaskColumnType = TaskColumnType
> = Omit<DndContextProps, "children"> & {
  children: ReactNode;
  className?: string;
  columns: C[];
  data: T[];
  onDataChange: (data: T[]) => void;
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  onDragOver?: (event: DragOverEvent) => void;
};

export const KanbanProvider = <
  T extends TaskType = TaskType,
  C extends TaskColumnType = TaskColumnType
>({
  children,
  onDragStart,
  onDragEnd,
  onDragOver,
  className,
  columns,
  data,
  onDataChange,
  ...props
}: KanbanProviderProps<T, C>) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    const card = data.find((item) => item.id === event.active.id);
    if (card) {
      setActiveCardId(event.active.id as string);
    }
    onDragStart?.(event);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeItem = data.find((item) => item.id === active.id);
    const overItem = data.find((item) => item.id === over.id);

    if (!activeItem) {
      return;
    }

    const activeColumn = activeItem.column;
    const overColumn =
      overItem?.column ||
      columns.find((col) => col.id === over.id)?.id ||
      columns[0]?.id;

    if (activeColumn !== overColumn) {
      let newData = [...data];
      const activeIndex = newData.findIndex((item) => item.id === active.id);
      const overIndex = newData.findIndex((item) => item.id === over.id);

      newData[activeIndex].column = overColumn;
      newData[activeIndex].due = new Date(overColumn.slice(5));

      newData = arrayMove(newData, activeIndex, overIndex);

      onDataChange(newData);
    }

    onDragOver?.(event);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCardId(null);

    onDragEnd?.(event);

    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    let newData = [...data];

    const oldIndex = newData.findIndex((item) => item.id === active.id);
    const newIndex = newData.findIndex((item) => item.id === over.id);

    console.log(data);

    newData = arrayMove(newData, oldIndex, newIndex);

    onDataChange(newData);
  };

  const announcements: Announcements = {
    onDragStart({ active }) {
      const { name, column } = data.find((item) => item.id === active.id) ?? {};

      return `Picked up the card "${name}" from the "${column}" column`;
    },
    onDragOver({ active, over }) {
      const { name } = data.find((item) => item.id === active.id) ?? {};
      const newColumn = columns.find((column) => column.id === over?.id)?.en;

      return `Dragged the card "${name}" over the "${newColumn}" column`;
    },
    onDragEnd({ active, over }) {
      const { name } = data.find((item) => item.id === active.id) ?? {};
      const newColumn = columns.find((column) => column.id === over?.id)?.en;

      return `Dropped the card "${name}" into the "${newColumn}" column`;
    },
    onDragCancel({ active }) {
      const { name } = data.find((item) => item.id === active.id) ?? {};

      return `Cancelled dragging the card "${name}"`;
    },
  };

  return (
    <KanbanContext.Provider
      value={
        { columns, data, onDataChange, activeCardId } as KanbanContextProps<T>
      }
    >
      <DndContext
        accessibility={{ announcements }}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        sensors={sensors}
        {...props}
      >
        <div
          className={cn(
            "grid size-full auto-cols-fr grid-flow-col gap-4",
            className
          )}
        >
          {children}
        </div>
        {typeof window !== "undefined" &&
          createPortal(
            <DragOverlay>
              <t.Out />
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </KanbanContext.Provider>
  );
};
