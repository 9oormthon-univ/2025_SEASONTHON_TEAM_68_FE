import { cn } from "@/lib/utils";

export function GradientButton({
  className,
  children,
  variable,
  ...props
}: React.ComponentProps<"button"> & { variable?: "default" | "disabled" }) {
  return (
    <>
      {variable === "disabled" ? (
        <button
          className={cn(
            "flex items-center justify-center w-40 h-10 tab-m-14 bg-gray-300 text-gray-700 rounded-full cursor-pointer",
            className
          )}
          {...props}
        >
          {children}
        </button>
      ) : (
        <button
          className={cn(
            "flex items-center justify-center w-40 h-10 tab-m-14 bg-linear-to-r from-[#F7F7F7] to-[#52FFAE] rounded-full cursor-pointer",
            className
          )}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
}
