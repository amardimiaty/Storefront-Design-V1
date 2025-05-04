import { cn } from "@/lib/utils"

interface SectionDividerProps {
  className?: string
  variant?: "line" | "gradient" | "dots"
}

export function SectionDivider({ className, variant = "line" }: SectionDividerProps) {
  if (variant === "gradient") {
    return (
      <div
        className={cn(
          "w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-8",
          className,
        )}
      />
    )
  }

  if (variant === "dots") {
    return (
      <div className={cn("w-full flex justify-center my-8", className)}>
        <div className="flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600" />
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
    )
  }

  // Default line divider
  return <div className={cn("w-full h-px bg-gray-200 dark:bg-gray-800 my-8", className)} />
}
