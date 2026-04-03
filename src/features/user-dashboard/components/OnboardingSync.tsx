'use client'

import UpdateProfileConfirmation, { getOnboardingData } from "@/components/shared/UpdateProfileConfirmation"
import { useCreateCareerSession } from "@/hooks/career-sessions.hooks"
import { useUser } from "@/hooks/users.hooks"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"

const OnboardingSync = () => {
  const [isUpdated, setIsUpdated] = useState(false);
  const { mutate: createCareerSession } = useCreateCareerSession()
  const { user } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const hasChecked = useRef(false);

  useEffect(() => {
    if (!user) return;
    if (hasChecked.current) return;

    hasChecked.current = true;

    const formStore = getOnboardingData();
    if (!formStore) return;

    const {
      career: { id },
      education: { educationLevel, major, institution },
      fullName,
    } = formStore;

    if (id) {
      if (educationLevel || major || institution || fullName) {
        setIsUpdated(true);
      }
    }
  }, [router, user]);


  const handleCreateCareerSession = () => {
    if (isUpdated) setIsUpdated(false)

    const formStore = getOnboardingData()
    if (!formStore) return

    const { career: { id: careerId } } = formStore

    createCareerSession({ careerId }, {
      onSuccess: () => {
        toast.success("Berhasil menyimpan sesi karier")
        queryClient.invalidateQueries({ queryKey: ["career-sessions"] })
      },
      onError: () => {
        toast.error("Gagal menyimpan data karier")
      }
    });
  }

  return (
    <UpdateProfileConfirmation
      setIsUpdated={setIsUpdated}
      isUpdated={isUpdated}
      onNextStep={handleCreateCareerSession}
    />
  )
}

export default OnboardingSync