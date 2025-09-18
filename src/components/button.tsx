import { cn } from "@/lib/utils";

interface Props {
  variant?: "default" | "gradient";
}

export default function Button({
  variant = "default",
  className,
  children,
  disabled,
  ...props
}: React.ComponentProps<"button"> & Props) {
  return (
    <>
      {disabled ? (
        <button
          className={cn(
            "flex items-center justify-center w-40 h-10 tab-m-14 bg-gray-300 text-gray-700 rounded-full",
            className
          )}
          disabled
          {...props}
        >
          {children}
        </button>
      ) : (
        <>
          {variant === "default" && (
            <button
              className={cn(
                "flex items-center justify-center w-40 h-10 tab-m-14 bg-gray-0 rounded-full cursor-pointer",
                className
              )}
              {...props}
            >
              {children}
            </button>
          )}
          {variant === "gradient" && (
            <button
              className={cn(
                "flex items-center justify-center w-40 h-10 tab-m-14 bg-linear-to-r from-[#F7F7F7] to-[#52FFAE] rounded-full active:bg-[#5EECAC] cursor-pointer",
                className
              )}
              {...props}
            >
              {children}
            </button>
          )}
        </>
      )}
    </>
  );
}
