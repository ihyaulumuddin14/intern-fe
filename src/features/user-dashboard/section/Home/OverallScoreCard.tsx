'use client'

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/animation.hooks";
import { useUser } from "@/hooks/users.hooks";
import { Briefcase } from "iconsax-reactjs";
import { ClipboardList } from "lucide-react";

export function OverallScoreCard() {
  const { user } = useUser()
  const isMobile = useIsMobile()

  return (
    <div className={`w-full h-fit rounded-2xl border border-neutral-40 shadow-xs px-8 py-7 flex flex-col gap-4 ${isMobile ? "" : "sticky top-30"}`}>
      <div className="flex items-center gap-2 text-[20px] font-medium text-neutral-100">
        <span>Overall Score</span>
      </div>
 
      <div>
        <div className="flex items-end gap-3">
          <span className="text-[64px] font-medium text-primary-hover leading-none">
            90%
          </span>
        </div>
        <p className="mt-5 text-base max-w-2/3 text-neutral-70">
          Hasil tes terakhir: 22 April 2026
        </p>
      </div>
 
      <div className="flex flex-col gap-2 mt-1">
        <Button size={"lg"} className="w-full gap-2 text-sm">
          <ClipboardList size={15} />
          Tes Lagi
        </Button>
        <Button size={"lg"} variant="outline" className="w-full gap-2 text-sm">
          <Briefcase size={15} />
          Ganti Karir
        </Button>
      </div>
    </div>
  )
}