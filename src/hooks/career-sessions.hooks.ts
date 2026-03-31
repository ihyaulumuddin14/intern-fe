import { SelfAssessmentCredentials } from "@/schemas/career-sessions.schema";
import {
  createCareerSession,
  createSelfAssessment,
  startQuiz,
} from "@/services/career-session.services";
import { useOnboardingFormStore } from "@/stores/useOnboardingFormStore";
import { useQuizStore } from "@/stores/useQuizStore";
import { useSelfAssessmentFormStore } from "@/stores/useSelfAssessmentFormStore";
import { useSelfAssessmentStepStore } from "@/stores/useSelfAssessmentStepStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useFormContext, UseFormReset } from "react-hook-form";
import { toast } from "sonner";

export const useCreateCareerSession = () => {
  const { resetForm } = useOnboardingFormStore();

  return useMutation({
    mutationFn: createCareerSession,
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(data.message);
      /**
       * Reset onboarding rhf on memory and localStorage
       * when the session successfully created
       */
      resetForm();
      return;
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message || "Terjadi kesalahan sistem"
          : (error as Error).message,
      );
    },
  });
};

export const useCreateSelfAssessment = () => {
  const router = useRouter();
  const { resetForm } = useSelfAssessmentFormStore();
  const { setStep } = useSelfAssessmentStepStore();

  return useMutation({
    mutationFn: ({
      credentials,
      careerSessionId
    }: {
      credentials: SelfAssessmentCredentials["skillRatings"];
      careerSessionId: string;
    }) => createSelfAssessment(credentials, careerSessionId),
    onSuccess: (data) => {
      const careerSessionId = data.data.careerSessionId;

      /**
       * Reset onboarding rhf on memory and localStorage
       * when the session successfully created
       */
      localStorage.removeItem("self-assessment-form");
      resetForm();
      setStep(1);
      router.replace(`/assessment/${careerSessionId}/quiz`);
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message || "Terjadi kesalahan sistem"
          : (error as Error).message,
      );
    },
  });
};

export const useStartQuiz = () => {
  const setQuizSession = useQuizStore((state) => state.setQuizSession);

  return useMutation({
    mutationFn: startQuiz,
    onSuccess: (data) => {
      const { quizSessionId, questions } = data.data;

      setQuizSession(quizSessionId, questions);
      toast.success(data.message || "Quiz dimulai");
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message || "Terjadi kesalahan sistem"
          : (error as Error).message,
      );
    },
  });
};
