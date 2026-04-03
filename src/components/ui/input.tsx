'use client'

import { cn } from "@/lib/utils"
import { Eye } from "iconsax-reactjs"
import { EyeOff } from "lucide-react"
import React from "react"

export function Input({
  className,
  type,
  leftIcon,
  ...props
}: React.ComponentProps<"input"> & { leftIcon?: React.ReactNode }) {
  const [showPassword, setShowPassword] = React.useState(false)
 
  const isPassword = type === "password"
  const togglePassword = () => setShowPassword((prev) => !prev)
  const inputType = isPassword ? (showPassword ? "text" : "password") : type
 
  return (
    <div className="relative w-full" data-slot="input-wrapper">
      {leftIcon && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none flex items-center">
          {leftIcon}
        </span>
      )}
      <input
        type={inputType}
        data-slot="input"
        className={cn(
          "h-13 md:h-15.5 w-full min-w-0 rounded-xl border border-input bg-transparent px-4 py-4 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-lg dark:bg-input/30",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          leftIcon && "pl-11",
          isPassword && "pr-12",
          className
        )}
        {...props}
      />
 
      {isPassword && (
        <button
          type="button"
          onClick={togglePassword}
          className="cursor-pointer p-2 absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none disabled:opacity-50 transition-colors"
          aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
        >
          {showPassword
            ? <EyeOff className="size-6" strokeWidth={1.5} />
            : <Eye className="size-6" strokeWidth={1.5} />
          }
        </button>
      )}
    </div>
  )
}