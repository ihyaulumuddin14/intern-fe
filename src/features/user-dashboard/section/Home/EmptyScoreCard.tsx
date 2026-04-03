'use client'

import { useSearch } from '@/components/providers/SearchProvider'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/animation.hooks'
import { CareerSessionStatus } from '@/types/common.type'
import { NotepadText } from 'lucide-react'
import { useRouter } from 'next/navigation'

const EmptyScoreCard = ({
  careerSessionStatus,
  length,
  selectedId
}: {
  careerSessionStatus: CareerSessionStatus,
  length?: number,
  selectedId: string
}) => {
  const isMobile = useIsMobile()
  const { focusInput } = useSearch()
  const router = useRouter()

  const handleSearchCareer = () => {
    focusInput()
  }

  const handleResumeAssesment = () => {
    if (!selectedId) return 
    router.push(`/assessment/${selectedId}/self`)
  }

  const handleResumeQuiz = () => {
    if (!selectedId) return
    router.push(`/assessment/${selectedId}/quiz`)
  }

  return (
    <div className={`w-full h-fit rounded-2xl border border-neutral-40 shadow-xs px-8 py-7 flex flex-col gap-4 ${isMobile ? "" : "sticky top-30"}`}>
      <div className="flex items-center gap-2 text-[20px] font-medium text-neutral-100">
        <span>Overall Score</span>
      </div>
 
      <div>
        <div className="flex items-end gap-3">
          <span className="text-[64px] font-medium text-neutral-50 leading-none">
            --%
          </span>
        </div>
      </div>

      <p className='text-neutral-60'>Belum ada data asesmen</p>
 
      <div className="flex flex-col gap-2 mt-1">
        {(careerSessionStatus === "not_started" || length === 0) && (
          <Button onClick={handleSearchCareer} size={"lg"} variant="outline" className="w-full gap-2 text-sm">
            <NotepadText size={15} />
              Mulai sesi karir
          </Button>
        )}

        {careerSessionStatus === "on_assessment" && (
          <Button onClick={handleResumeAssesment} size={"lg"} variant="outline" className="w-full gap-2 text-sm">
            <NotepadText size={15} />
              Lanjutkan Asesmen
          </Button>
        )}

        {careerSessionStatus === "on_quiz" && (
          <Button onClick={handleResumeQuiz} size={"lg"} variant="outline" className="w-full gap-2 text-sm">
            <NotepadText size={15} />
              Lanjutkan Kuis
          </Button>
        )}
      </div>
    </div>
  )
}

export default EmptyScoreCard