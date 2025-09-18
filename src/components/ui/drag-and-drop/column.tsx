import { KanbanBoard, KanbanCards } from "@/components/ui/kanban";
import { TaskColumnType, TaskType } from "@/lib/type";
import { cn, columnToColor } from "@/lib/utils";
import KanbanTask from "./task";

interface Props {
  column: TaskColumnType;
  taskBgColor: string;
  showCheckbox?: boolean;
  showDate?: boolean;
  filter?: (task: TaskType) => boolean;
}

export default function DragAndDropColumn({
  column,
  taskBgColor,
  showCheckbox = false,
  showDate = false,
  className,
  children,
  ...props
}: Props & React.HTMLAttributes<HTMLDivElement>) {
  const color = columnToColor(column.id);

  return (
    <KanbanBoard
      id={column.id}
      key={column.id}
      className={cn("relative min-h-96 px-5 py-10", color.bg, className)}
      {...props}
    >
      {children}
      <KanbanCards column={column}>
        {(task: TaskType) => (
          <KanbanTask
            key={task.id}
            initTask={task}
            showCheckbox={showCheckbox}
            showDate={showDate}
            bgColor={taskBgColor}
          />
        )}
      </KanbanCards>
    </KanbanBoard>
  );
}
