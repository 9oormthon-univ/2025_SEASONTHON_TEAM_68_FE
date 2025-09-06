import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-5 px-12 py-6 bg-white rounded-lg ",
        className
      )}
      {...props}
    />
  );
}
