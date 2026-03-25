'use client'

import privateApi from "@/api/axiosInstance";
import Loader from "@/components/shared/Loader";
import { toSnake } from "@/lib/case";
import { CreateCareerSessionCredentials } from "@/schemas/career-sessions.schema";
import { useOnboardingFormStore } from "@/stores/useOnboardingFormStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const AssessmentGate = () => {
  const router = useRouter();
  const { resetForm } = useOnboardingFormStore()

  useEffect(() => {
    const initSession = async () => {
      const data = JSON.parse(localStorage.getItem("onboarding-form") || "");
      const careerId = data?.state.formStore.career.id as string;

      if (careerId) {
        try {
          const credentials = {
            careerId,
          } as CreateCareerSessionCredentials;

          const response = await privateApi.post("/api/career-sessions", toSnake(credentials));
          const session = toSnake(response.data.data)

          /**
           * Reset onboarding rhf on memory and localStorage
           * when the session successfully created
           */
          resetForm()

          router.replace(`/assessment/${session.id}/self`)
        } catch (error) {}
      } else {
        toast.error("Belum ada karir dipilih");
        return router.replace("/dashboard");
      }
    };

    initSession();
  }, []);

  return (
    <section className="w-full h-dvh p-[clamp(12px,5vw,56px)] flex flex-col justify-center items-center">
      <Loader size="lg" />
      <p className="text-sm sm:text-lg">Membuat sesi..</p>
    </section>
  );
};

export default AssessmentGate;
