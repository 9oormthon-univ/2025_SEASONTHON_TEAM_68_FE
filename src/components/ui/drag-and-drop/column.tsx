import { KanbanBoard, KanbanCards } from "@/components/ui/kanban";
import { Task, TaskColumn } from "@/lib/type";
import { cn, tagToColor } from "@/lib/utils";
import KanbanTask from "./task";

interface Props {
  column: TaskColumn;
  showCheckbox?: boolean;
  showDate?: boolean;
}

export default function DragAndDropColumn({
  column,
  className,
  children,
  showCheckbox = false,
  showDate = false,
  ...props
}: Props & React.HTMLAttributes<HTMLDivElement>) {
  const color = tagToColor(column.id);
  return (
    <KanbanBoard
      id={column.id}
      key={column.id}
      className={cn("relative min-h-96 px-5 py-10", color.bg, className)}
      {...props}
    >
      {children}
      <KanbanCards id={column.id}>
        {(task: Task) => (
          <KanbanTask
            key={task.id}
            column={column}
            initTask={task}
            bulletColor={color.bullet}
            showCheckbox={showCheckbox}
            showDate={showDate}
          />
        )}
      </KanbanCards>
    </KanbanBoard>
  );
}
