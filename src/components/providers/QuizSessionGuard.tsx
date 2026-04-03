'use client'

import { usePathname } from "next/navigation"
import { ReactNode, useEffect } from "react"
import { toast } from "sonner"

const QuizSessionGuard = ({ children }:{ children: ReactNode }) => {
  const pathname = usePathname()

  useEffect(() => {
    const dataString = sessionStorage.getItem("quiz-session-storage")  
    if (!dataString) return

    const quizSessionData = JSON.parse(dataString) || ""
    const quizSessionId = quizSessionData?.state?.quizSessionId

    if (quizSessionId) {
      const isQuizPage = pathname.includes("/assessment/") && pathname.includes("/quiz")
      if (!isQuizPage) {
        toast.error("Sesi quiz ditemukan, tetapi Anda tidak berada di halaman quiz. Sesi akan direset.")
        sessionStorage.removeItem("quiz-session-storage")
      }
    }
  }, [pathname])

  return (
    <>{ children }</>
  )
}

export default QuizSessionGuard