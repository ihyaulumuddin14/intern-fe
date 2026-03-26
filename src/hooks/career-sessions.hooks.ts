import privateApi from "@/api/axiosInstance";
import { toCamel, toSnake } from "@/lib/case";
import { CreateCareerSessionCredentials, SelfAssessmentCredentials } from "@/schemas/career-sessions.schema";
import { useOnboardingFormStore } from "@/stores/useOnboardingFormStore";
import { useSelfAssessmentFormStore } from "@/stores/useSelfAssessmentFormStore";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateCareerSession = () => {
  const router = useRouter();
  const { resetForm } = useOnboardingFormStore();

  return useMutation({
    mutationFn: async (credentials: CreateCareerSessionCredentials) => {
      const response = await privateApi.post("/api/career-sessions", toSnake(credentials));
      return toCamel(response.data.data);
    },
    onSuccess: (data) => {
      const careerSessionId = data.userCareerSessionId
      /**
       * Reset onboarding rhf on memory and localStorage
       * when the session successfully created
       */
      resetForm();
      router.replace(`/assessment/${careerSessionId}/self`);
    },
    onError: (error) => {
      toast.error("Gagal membuat sesi, silakan coba lagi.");
      router.replace("/dashboard");
    }
  })
}


export const useCreateSelfAssessment = () => {
  const router = useRouter()
  const params = useParams()
  const careerSessionId = params.id
  const { resetForm } = useSelfAssessmentFormStore()

  return useMutation({
    mutationFn: async (credentials: SelfAssessmentCredentials["skillRatings"]) => {
      const response = await privateApi.post(`/api/career-sessions/${careerSessionId}/assessment`, toSnake(credentials))
      return toCamel(response.data.data)
    },
    onSuccess: (data) => {
      const careerSessionId = data.userCareerSessionId

      /**
       * Reset onboarding rhf on memory and localStorage
       * when the session successfully created
       */
      resetForm()
      router.replace(`/assessment/${careerSessionId}/quiz`)
    },
    onError: (error) => {
      toast.error("Gagal menyimpan data assessment, silakan coba lagi")
      router.back()
    }
  })
}