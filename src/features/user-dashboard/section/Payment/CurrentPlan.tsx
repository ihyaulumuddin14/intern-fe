'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function CurrentPlanBanner({
  isPremium,
  onUpgrade,
}: {
  isPremium: boolean
  onUpgrade: () => void
}) {
  return (
    <div className="w-full bg-[#F1F5F9] rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex flex-col gap-2">
        <Badge className="w-fit bg-primary/10 text-primary rounded-full px-3 py-1 text-xs">
          PLAN AKTIF
        </Badge>

        <h3 className="text-xl font-semibold text-neutral-800">
          {isPremium
            ? "Premium Plan (plan saat ini)"
            : "Free plan (plan saat ini)"}
        </h3>

        <p className="text-sm text-neutral-500 max-w-md">
          {isPremium
            ? "Saat ini Kamu berada di paket premium. Nikmati semua keuntungan untuk membuka potensi penuh pertumbuhan karier Kamu."
            : "Saat ini Kamu berada di paket gratis dasar. Tingkatkan paket untuk membuka potensi penuh pertumbuhan karier Kamu."}
        </p>
      </div>

      <Button
        onClick={onUpgrade}
        disabled={isPremium}
        withArrow
      >
        Dapatkan Premium
      </Button>
    </div>
  )
}