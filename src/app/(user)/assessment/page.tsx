'use client'

import Loader from "@/components/shared/Loader";
import UpdateProfileConfirmation, { getOnboardingData } from "@/components/shared/UpdateProfileConfirmation";
import { useCreateCareerSession } from "@/hooks/career-sessions.hooks";
import { useUser } from "@/hooks/users.hooks";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const AssessmentGate = () => {
  const router = useRouter();
  const { mutate: createCareerSession } = useCreateCareerSession();
  const { user } = useUser()
  const [isUpdated, setIsUpdated] = useState(false);
  const hasChecked = useRef(false);
  
  useEffect(() => {
    if (!user) return
    if (hasChecked.current) return;

    hasChecked.current = true;

    const formStore = getOnboardingData()
    if (!formStore) return

    const {
      career: { id },
      education: {
        educationLevel,
        major,
        institution
      },
      fullName
    } = formStore

    if (id) {
      if (educationLevel || major || institution || fullName) {
        setIsUpdated(true)
      }
    } else {
      toast.error("Belum ada karir dipilih");
      router.replace("/dashboard");
    }
  }, [createCareerSession, router, user]);


  const handleCreateCareerSession = () => {
    if (isUpdated) setIsUpdated(false)

    const formStore = getOnboardingData()
    if (!formStore) return

    const { career: { id: careerId } } = formStore

    if (careerId) {
      createCareerSession({ careerId }, {
        onSuccess: (data) => {
          toast.dismiss()
          toast.success(data.message);
          const careerSessionId = data.data.careerSessionId;
          router.replace(`/assessment/${careerSessionId}/self`);
        },
        onError: (error) => {
          toast.error(
            error instanceof AxiosError
            ? error.response?.data?.message || "Terjadi kesalahan sistem"
            : (error as Error).message,
          );
          router.replace("/dashboard");
        }
      });
    }
  }

  return (
    <>
      <section className="w-full h-dvh p-[clamp(12px,5vw,56px)] flex flex-col justify-center items-center">
        <Loader size="lg" />
        <p className="text-sm sm:text-lg">Membuat sesi..</p>
      </section>

      <UpdateProfileConfirmation
        onNextStep={handleCreateCareerSession}
        isUpdated={isUpdated}
      />
    </>
  );
};

export default AssessmentGate;
