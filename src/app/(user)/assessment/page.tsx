'use client'

import Loader from "@/components/shared/Loader";
import { useCreateCareerSession } from "@/hooks/career-sessions.hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const AssessmentGate = () => {
  const router = useRouter();
  const { mutate: createCareerSession } = useCreateCareerSession();

  useEffect(() => {
    const dataString = localStorage.getItem("onboarding-form");
    if (!dataString) {
      toast.error("Data tidak ditemukan");
      return router.replace("/dashboard");
    }

    const data = JSON.parse(dataString);
    const careerId = data?.state?.formStore?.career?.id;

    if (careerId) {
      createCareerSession({ careerId }, {
        onSuccess: (data) => {
          const careerSessionId = data.data.id;
          router.replace(`/assessment/${careerSessionId}/self`);
        }
      });
    } else {
      toast.error("Belum ada karir dipilih");
      router.replace("/dashboard");
    }
  }, [createCareerSession, router]);

  return (
    <section className="w-full h-dvh p-[clamp(12px,5vw,56px)] flex flex-col justify-center items-center">
      <Loader size="lg" />
      <p className="text-sm sm:text-lg">Membuat sesi..</p>
    </section>
  );
};

export default AssessmentGate;
