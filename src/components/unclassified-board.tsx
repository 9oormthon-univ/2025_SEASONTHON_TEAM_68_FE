import { columns, unclassifiedTasks } from "@/lib/dummy";
import { TaskColumn } from "@/lib/type";
import { cn, paddingToTask, tagToColor } from "@/lib/utils";
import DragAndDropColumn from "./ui/drag-and-drop/column";
import DragAndDropProvider from "./ui/drag-and-drop/provider";

export default function UnclassifiedBoard() {
  return (
    <DragAndDropProvider initTasks={paddingToTask(unclassifiedTasks)}>
      <UnclassifiedColumn column={columns.at(0)!} />
      <UnclassifiedColumn column={columns.at(1)!} />
      <UnclassifiedColumn column={columns.at(2)!} />
    </DragAndDropProvider>
  );
}

function UnclassifiedColumn({ column }: { column: TaskColumn }) {
  const color = tagToColor(column.id);

  return (
    <DragAndDropColumn column={column}>
      <div
        className={cn(
          "absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center",
          color.text
        )}
      >
        <span className="font-semibold text-4xl">{column.name}</span>
        <span className="font-semibold text-xl">{column.subtitle}</span>
      </div>
    </DragAndDropColumn>
  );
}
