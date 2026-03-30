'use client'

import { useCreateCareerSession } from "@/hooks/career-sessions.hooks"
import { getQueryClient } from "@/lib/queryClient"
import { useEffect } from "react"

const OnboardingSync = () => {
  const { mutate: createCareerSession } = useCreateCareerSession()
  const queryClient = getQueryClient()

  useEffect(() => {
    const dataString = localStorage.getItem("onboarding-form")

    if (!dataString) return

    const data = JSON.parse(dataString)
    const careerId = data?.state?.formStore?.career?.id

    if (careerId) {
      createCareerSession({ careerId }, {
        onSuccess: (_data) => {
          queryClient.invalidateQueries({ queryKey: ["career-sessions"] })
        }
      })
    }

  }, [createCareerSession])

  return null
}

export default OnboardingSync