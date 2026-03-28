import { SelfAssessmentCredentials } from "@/schemas/career-sessions.schema";
import { createCareerSession, createSelfAssessment } from "@/services/career-session.services";
import { useOnboardingFormStore } from "@/stores/useOnboardingFormStore";
import { useSelfAssessmentFormStore } from "@/stores/useSelfAssessmentFormStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateCareerSession = () => {
  const router = useRouter();
  const { resetForm } = useOnboardingFormStore();

  return useMutation({
    mutationFn: createCareerSession,
    onSuccess: (data) => {
      toast.dismiss()
      toast.success(data.message)
      const careerSessionId = data.data.id
      /**
       * Reset onboarding rhf on memory and localStorage
       * when the session successfully created
       */
      resetForm();
      router.replace(`/assessment/${careerSessionId}/self`);
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message || "Terjadi kesalahan sistem"
          : (error as Error).message,
      );
    }
  })
}


export const useCreateSelfAssessment = () => {
  const router = useRouter()
  const { resetForm } = useSelfAssessmentFormStore()

  return useMutation({
    mutationFn: ({
      credentials,
      careerSessionId
    }: {
      credentials: SelfAssessmentCredentials["skillRatings"],
      careerSessionId: string
    }) =>  createSelfAssessment(credentials, careerSessionId),
    onSuccess: (data) => {
      const careerSessionId = data.data.userCareerSessionId

      /**
       * Reset onboarding rhf on memory and localStorage
       * when the session successfully created
       */
      resetForm()
      router.replace(`/assessment/${careerSessionId}/quiz`)
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message || "Terjadi kesalahan sistem"
          : (error as Error).message,
      );
    }
  })
}