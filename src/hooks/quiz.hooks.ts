import { AnswerOption } from "@/schemas/quiz.schema";
import { answerQuestion, startQuiz, submitQuiz } from "@/services/quiz.service";
import { useQuizResultStore } from "@/stores/useQuizResultStore";
import { useQuizStore } from "@/stores/useQuizStore";
import { useSelfAssessmentFormStore } from "@/stores/useSelfAssessmentFormStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useStartQuiz = () => {
  const setQuizSession = useQuizStore((state) => state.setQuizSession);

  return useMutation({
    mutationFn: startQuiz,
    onSuccess: (data) => {
      const { quizSessionId, questions } = data.data;

      setQuizSession(quizSessionId, questions);
      toast.dismiss()
      toast.success(data.message || "Sesi baru kuis dimulai!");
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

export const useAnswerQuestion = () => {
  return useMutation({
    mutationFn: ({
      quizSessionId,
      credentials
    }: {
      quizSessionId: string;
      credentials: {
        quizAnswerId: string;
        userAnswer: AnswerOption
      }
    }) => answerQuestion(quizSessionId, credentials),
    onSuccess: (data) => {
      toast.dismiss()
      toast.success(data.message || "Jawaban berhasil disimpan")
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

export const useSubmitQuiz = () => {
  const { resetForm } = useSelfAssessmentFormStore()
  const { setResult } = useQuizResultStore()

  return useMutation({
    mutationFn: submitQuiz,
    onSuccess: (data) => {
      localStorage.removeItem("self-assessment-form")
      resetForm()

      setResult(data.data)
      toast.dismiss()
      toast.success(data.message || "Kuis berhasil diselesaikan")
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