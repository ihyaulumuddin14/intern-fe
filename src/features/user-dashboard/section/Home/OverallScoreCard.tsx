'use client'

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/animation.hooks";
import { useStartQuiz } from "@/hooks/quiz.hooks";
import { Briefcase } from "iconsax-reactjs";
import { ClipboardList } from "lucide-react";
import { useRouter } from "next/navigation";

export function OverallScoreCard({
  totalScore,
  selectedId
}: {
  totalScore: number,
  selectedId: string
}) {
  const isMobile = useIsMobile()
  const router = useRouter()

  const handleRetakeQuiz = () => {
    if (!selectedId) return
    router.push(`/assessment/${selectedId}/quiz`)
  }

  const handleChangeCareer = () => {
    localStorage.removeItem("selected-career-session-id")
    window.location.reload()
  }

  return (
    <div className={`w-full h-fit rounded-2xl border border-neutral-40 shadow-xs px-8 py-7 flex flex-col gap-4 ${isMobile ? "" : "sticky top-30"}`}>
      <div className="flex items-center gap-2 text-[20px] font-medium text-neutral-100">
        <span>Overall Score</span>
      </div>
 
      <div>
        <div className="flex items-end gap-3">
          <span className="text-[64px] font-medium text-primary-hover leading-none">
            {totalScore}%
          </span>
        </div>
      </div>
 
      <div className="flex flex-col gap-2 mt-1">
        <Button onClick={handleRetakeQuiz} size={"lg"} className="w-full gap-2 text-sm">
          <ClipboardList size={15} />
          Tes Lagi
        </Button>
        <Button onClick={handleChangeCareer} size={"lg"} variant="outline" className="w-full gap-2 text-sm">
          <Briefcase size={15} />
          Ganti Karir
        </Button>
      </div>
    </div>
  )
}