import { KanbanCard as PrimitiveKanbanCard } from "@/components/ui/shadcn-io/kanban";
import { Task, TaskContainer } from "@/lib/type";
import { cn } from "@/lib/utils";

interface Props {
  column: TaskContainer;
  task: Task;
  bulletColor: string;
}

export default function KanbanTaskCard({ column, task, bulletColor }: Props) {
  return (
    <PrimitiveKanbanCard
      column={column.id}
      id={task.id}
      key={task.id}
      name={task.name}
      className="border-none rounded-xl bg-gray-300"
    >
      <li className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className={cn("w-1.5 min-w-1.5 h-1.5 rounded-full", bulletColor)}
          />
          <span className="tag-r-12">{task.name}</span>
        </div>
        <input
          className="self-end"
          type="checkbox"
          checked={task.completed}
          onChange={(e) => (task.completed = e.target.checked)}
        />
      </li>
    </PrimitiveKanbanCard>
  );
}
