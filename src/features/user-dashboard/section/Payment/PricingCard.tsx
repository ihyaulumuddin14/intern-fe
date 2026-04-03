'use client'

import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type Feature = {
  label: string
  active: boolean
}

type Props = {
  title: string
  price: string
  period: string
  features: Feature[]
  isPremium?: boolean
  isCurrent?: boolean
  onClick?: () => void
}

export default function PricingCard({
  title,
  price,
  period,
  features,
  isPremium,
  isCurrent,
  onClick,
}: Props) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 flex flex-col gap-5",
        isPremium
          ? "bg-[#0F766E] text-white shadow-xl relative"
          : "bg-[#DFF5F2]"
      )}
    >
      {isPremium && (
        <Badge className="absolute top-4 right-4 bg-cyan-300 text-teal-900 text-xs px-3 py-1">
          RECOMMENDED
        </Badge>
      )}

      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">
          {price}{" "}
          <span className="text-sm font-normal">{period}</span>
        </p>
      </div>

      <div className="flex flex-col gap-3 text-sm">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-2">
            {f.active ? (
              <Check size={16} className={isPremium ? "text-white" : "text-green-600"} />
            ) : (
              <X size={16} className="text-gray-400" />
            )}
            <span className={cn(!f.active && "text-gray-400")}>
              {f.label}
            </span>
          </div>
        ))}
      </div>

      {isCurrent && (
        <button className="border border-black/20 rounded-xl py-3 text-sm font-medium">
          Current Plan
        </button>
      )}

      {isPremium && !isCurrent && (
        <button
          onClick={onClick}
          disabled={isCurrent}
          className={cn(
            "rounded-xl py-3 font-semibold",
            isPremium
              ? "bg-cyan-300 text-teal-900"
              : "bg-primary text-white"
          )}
        >
          Upgrade to Pro
        </button>
      )}
    </div>
  )
}