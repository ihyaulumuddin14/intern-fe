'use client'

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import React, { useEffect, useState, useTransition } from "react"
import { Search } from "lucide-react"
import { useCareers } from "@/hooks/careers.hooks"

type Career = {
  id: string
  name: string
  description: string
}

type Props = {
  inputRef?: React.RefObject<HTMLInputElement | null>
  onSelect?: (career: Career) => void
  placeholder?: string
  className?: string
}

export default function CareerSearchInput({
  inputRef,
  onSelect,
  placeholder = "Cari career...",
  className
}: Props) {
  const { data, isLoading } = useCareers()
  const [isOpen, setIsOpen] = useState(false)

  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Career[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)

  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (!data) return

    startTransition(() => {
      if (!query) {
        setResults(data)
        return
      }

      const filtered = data.filter((item: Career) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )

      setResults(filtered)
      setActiveIndex(-1)
    })
  }, [query, data])

  const handleSelect = (career: Career) => {
    onSelect?.(career)
    setQuery(career.name)
    setActiveIndex(-1)
  }

  const highlight = (text: string) => {
    if (!query) return text

    const regex = new RegExp(`(${query})`, "gi")
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="font-semibold text-primary">
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          setTimeout(() => setIsOpen(false), 150)
        }}
        placeholder={placeholder}
        rightIcon={<Search size={18} />}
        className={className}
        onKeyDown={(e) => {
          if (!results.length) return

          if (e.key === "ArrowDown") {
            e.preventDefault()
            setActiveIndex((prev) =>
              prev < results.length - 1 ? prev + 1 : -1
            )
          }

          if (e.key === "ArrowUp") {
            e.preventDefault()
            setActiveIndex((prev) =>
              prev > -1 ? prev - 1 : results.length - 1
            )
          }

          if (e.key === "Enter") {
            if (activeIndex >= 0) {
              handleSelect(results[activeIndex])
            }
          }
        }}
      />

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border rounded-xl shadow-lg z-50 max-h-72 overflow-auto">
          {(isLoading || isPending) && (
            <div className="p-3 text-sm text-neutral-500">
              Loading...
            </div>
          )}

          {!isLoading && results.length === 0 && (
            <div className="p-3 text-sm text-neutral-500">
              Tidak ditemukan
            </div>
          )}

          {results.map((item, index) => (
            <div
              key={item.id}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => handleSelect(item)}
              className={cn(
                "px-4 py-3 cursor-pointer transition-colors flex flex-col",
                index === activeIndex
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-neutral-50"
              )}
            >
              <span className="text-sm font-medium">
                {highlight(item.name)}
              </span>
              <span className="text-xs text-neutral-500 line-clamp-1">
                {item.description}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}