import * as React from "react"
import { cn } from "@/lib/utils"

const DropdownTrigger = React.forwardRef<
  HTMLDivElement, 
  { value?: string; placeholder?: string; isOpen?: boolean } & React.HTMLAttributes<HTMLDivElement>
>(({ className, value, placeholder, isOpen, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "h-13 md:h-15.5 w-full rounded-xl border border-input bg-transparent px-4 py-4",
        "flex items-center justify-between cursor-pointer transition-all outline-none",
        "text-base md:text-lg dark:bg-input/30",
        isOpen && "rounded-b-none border-ring ring-1 ring-ring",
        className
      )}
      {...props}
    >
      <span className={cn("truncate", !value && "text-muted-foreground")}>
        {value || placeholder}
      </span>
      {children}
    </div>
  )
})
DropdownTrigger.displayName = "DropdownTrigger"

export { DropdownTrigger }