import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { ArrowRight } from "iconsax-reactjs"

const buttonVariants = cva(
  "inline-flex group relative overflow-hidden shrink-0 hover:cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 active:translate-y-0.5 font-semibold",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover focus:bg-primary-focus active:bg-primary-pressed",
        destructive:
          "bg-error text-error-foreground hover:bg-error-hover focus:bg-error-focus active:bg-error-pressed",
        outline:
          "border-primary border-[1.5px] bg-transparent hover:bg-primary-surface text-primary disabled:border-neutral-40 disabled:bg-transparent disabled:text-muted-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "bg-transparent hover:bg-primary-surface focus:shadow-input text-primary disabled:bg-transparent",
        link: "text-primary underline-offset-4 hover:underline",
        muted: "border-[1.5px] text-muted-foreground border-neutral-40 bg-transparent hover:opacity-70"
      },
      size: {
        tn: "h-3 gap-1.5 rounded-[8px] py-1.5 px-4 text-[10px] has-[>svg]:px-4",
        sm: "h-8 gap-1 rounded-[8px] px-5 py-2 text-xs has-[>svg]:px-5 [&_svg:not([class*='size-'])]:size-3",
        default: "h-10 rounded-[12px] px-6 py-3 has-[>svg]:px-6",
        lg: "h-12 rounded-[12px] px-7 py-3.5 text-base has-[>svg]:px-7",
        gt: "h-14 rounded-[12px] px-8 py-4 text-lg",
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
  withArrow = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean,
    withArrow?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {asChild ? (
        props.children
      ) : (
        <>
          {props.children}
          {withArrow && (
            <>
              <ArrowRight className="opacity-100 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:opacity-0 absolute right-7" />
              <ArrowRight className="opacity-0 -translate-x-3 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:opacity-100 group-hover:translate-x-0" />
            </>
          )}
        </>
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
