import { KanbanCard as PrimitiveKanbanCard } from "@/components/ui/shadcn-io/kanban";
import { TaskCandidate, TaskContainer } from "@/lib/type";
import { cn } from "@/lib/utils";

interface Props {
  column: TaskContainer;
  task: TaskCandidate;
  bulletColor: string;
}

export default function KanbanCandidateCard({
  column,
  task,
  bulletColor,
}: Props) {
  const id = crypto.randomUUID();
  return (
    <PrimitiveKanbanCard
      column={column.id}
      id={id}
      key={id}
      name={task.name}
      className="border-none rounded-xl"
    >
      <li className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className={cn("w-1.5 h-1.5 rounded-full", bulletColor)} />
          <span className="tag-r-12">{task.name}</span>
        </div>
        <input
          type="date"
          value={task.due?.toISOString().split("T")[0]}
          onChange={(e) => (task.due = new Date(e.target.value))}
        />
      </li>
    </PrimitiveKanbanCard>
  );
}
