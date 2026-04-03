import { SelfAssessmentCredentials } from "@/schemas/career-sessions.schema";
import {
  createCareerSession,
  createSelfAssessment,
  getAnalytics,
  getCareerSessionsList,
} from "@/services/career-session.services";
import { useOnboardingFormStore } from "@/stores/useOnboardingFormStore";
import { useSelfAssessmentFormStore } from "@/stores/useSelfAssessmentFormStore";
import { useSelfAssessmentStepStore } from "@/stores/useSelfAssessmentStepStore";
import { CareerSession, CareerSessionItem } from "@/types/common.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateCareerSession = () => {
  const { resetForm } = useOnboardingFormStore();

  return useMutation({
    mutationFn: createCareerSession,
    // onSuccess: () => {
    //   toast.dismiss();
    // },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data?.message || "Terjadi kesalahan sistem"
          : (error as Error).message,
      );
    },
    onSettled: () => {
      resetForm();
      /**
       * Reset onboarding rhf on memory and localStorage
       * when the session successfully created
       */
      return;
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
      careerSessionId,
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

export const useAnalytics = (careerSessionId: string) => {
  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["analytics", careerSessionId],
    queryFn: () => getAnalytics(careerSessionId),
    enabled: !!careerSessionId,
  });

  return {
    analytics: data?.data as CareerSession,
    isPending,
    isFetching,
    error,
  };
};

export const useCareerSessionsList = () => {
  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["career-sessions-list"],
    queryFn: getCareerSessionsList,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    sessions: data as CareerSessionItem[] | undefined,
    isPending,
    isFetching,
    error,
  };
};
