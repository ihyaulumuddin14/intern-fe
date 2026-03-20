import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 hover:cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 active:translate-y-0.5 font-semibold",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover focus:bg-primary-focus active:bg-primary-pressed",
          destructive:
          "bg-error text-error-foreground hover:bg-error-hover focus:bg-error-focus active:bg-error-pressed",
        outline:
          "border-primary border-[1.5px] bg-transparent hover:bg-primary-surface text-primary disabled:border-muted-foreground disabled:bg-transparent",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "bg-transparent hover:bg-primary-surface focus:shadow-input text-primary disabled:bg-transparent",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        tn: "h-3 gap-1.5 rounded-md p-3 text-[10px] has-[>svg]:px-2.5",
        sm: "h-8 gap-1 rounded-md px-3 py-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        default: "h-10 rounded-lg px-4 py-3 has-[>svg]:px-3",
        lg: "h-12 rounded-xl px-5 py-3.5 text-base has-[>svg]:px-4",
        gt: "h-14 rounded-xl px-6 py-4 text-lg",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
