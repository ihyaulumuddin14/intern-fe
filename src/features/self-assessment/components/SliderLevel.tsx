"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

const SliderLevel = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, defaultValue, value, onValueChange, ...props }, ref) => {
  
  const [internalValue, setInternalValue] = React.useState(defaultValue ? defaultValue[0] : 1);
  
  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value[0]);
    }
  }, [value]);

  const handleValueChange = (newValues: number[]) => {
    setInternalValue(newValues[0]);
    if (onValueChange) {
      onValueChange(newValues);
    }
  };

  const levels = ["Beginner", "Intermediate", "Expert"]
  const min = 1
  const max = 3

  const percentage = ((internalValue - min) / (max - min)) * 100;

  return (
    <div className="relative w-full px-4 py-10">
      <SliderPrimitive.Root
        ref={ref}
        min={min}
        max={max}
        step={1}
        value={[internalValue]}
        onValueChange={handleValueChange}
        className={cn(
          "relative flex w-full cursor-pointer touch-none items-center select-none",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-4 w-full grow overflow-hidden rounded-full bg-slate-200">
          
          <div className="absolute inset-0 flex justify-between z-10">
            {[1, 2, 3].map((tick, index) => (
              <div 
                key={tick} 
                className={cn(
                  "h-full w-1",
                  index === 0 ? "ml-3" : "",
                  index === 2 ? "mr-3" : "",
                  tick <= internalValue ? "bg-white/60" : "bg-slate-300"
                )} 
              />
            ))}
          </div>
          
          <SliderPrimitive.Range className="absolute h-full bg-primary transition-all duration-300 ease-out z-0" />
        </SliderPrimitive.Track>

        <SliderPrimitive.Thumb className="block h-10 w-10 opacity-0 cursor-pointer active:cursor-pointer z-30 focus:outline-none" />

        <div
          aria-hidden
          className="absolute block h-8 w-8 rounded-full border-4 border-primary bg-white shadow-xl z-20 pointer-events-none transition-all duration-300 ease-out focus-within:ring-4 focus-within:ring-violet-200"
          style={{ 
            left: `calc(${percentage}% + (0.75rem - ${percentage / 100} * 1.5rem))`,
            transform: 'translateX(-50%)'
          }}
        />

      </SliderPrimitive.Root>

      <div className="mt-5 relative h-6 w-full"> 
        {levels.map((level, i) => {
          return (
            <div 
              key={i} 
              className={cn(
                "absolute flex flex-col items-center",
                i === 0 && "left-0 -translate-x-4",
                i === 1 && "left-1/2 -translate-x-1/2",
                i === 2 && "right-0 translate-x-2.5"
              )}
            >
              <span className={cn(
                  "text-sm font-semibold transition-all duration-300 whitespace-nowrap",
                  (i + 1) === internalValue ? "text-primary scale-110" : "text-muted-foreground"
              )}>
                  {level}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
})
SliderLevel.displayName = "SliderLevel"

export { SliderLevel }