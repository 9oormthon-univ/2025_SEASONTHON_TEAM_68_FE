import { cn } from "@/lib/utils";

export default function Chip({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-18 h-6 tab-sb-14 rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
