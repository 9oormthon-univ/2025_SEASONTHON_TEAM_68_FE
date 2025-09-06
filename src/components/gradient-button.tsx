import { cn } from "@/lib/utils";

export function GradientButton({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "flex items-center justify-center w-40 h-10 tab-m-14 bg-linear-to-r from-[#F7F7F7] to-[#52FFAE] rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
