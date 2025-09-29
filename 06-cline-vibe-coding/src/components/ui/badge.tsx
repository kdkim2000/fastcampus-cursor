import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors"

    const variants = {
      default: "bg-blue-100 text-blue-800 border-blue-200",
      secondary: "bg-gray-100 text-gray-800 border-gray-200",
      destructive: "bg-red-100 text-red-800 border-red-200",
      outline: "border-gray-300 text-gray-700",
      success: "bg-green-100 text-green-800 border-green-200",
      warning: "bg-yellow-100 text-yellow-800 border-yellow-200"
    }

    return (
      <div
        ref={ref}
        className={cn(baseClasses, variants[variant], className)}
        {...props}
      />
    )
  }
)

Badge.displayName = "Badge"

export { Badge }
