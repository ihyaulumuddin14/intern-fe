"use client";

import privateApi from "@/api/axiosInstance";
import { useStartQuiz } from "@/hooks/quiz.hooks";
import { toCamel } from "@/lib/case";
import { useQuizStore } from "@/stores/useQuizStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import LoadingCheckingQuizSession from "../components/LoadingCheckingQuizSession";
import LoadingStartingNewQuiz from "../components/LoadingStartingNewQuiz";
import QuestionAnswer from "../components/Question";

import { CareerSessionStatus } from "@/types/common.type";

const QuizContainer = ({
  careerSessionId,
  careerSessionStatus,
}: {
  careerSessionId: string;
  careerSessionStatus: CareerSessionStatus;
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const urlStatus = params.get("status");
  const { mutateAsync, isPending } = useStartQuiz();
  const [isChecking, setIsChecking] = useState(true);
  const { questions, setCareerId, hasHydrated, quizSessionId } = useQuizStore(
    useShallow((state) => ({
      questions: state.questions,
      setCareerId: state.setCareerId,
      hasHydrated: state.hasHydrated,
      quizSessionId: state.quizSessionId,
    })),
  );

  useEffect(() => {
    if (!hasHydrated) return;

    if (urlStatus === "confirmation" || urlStatus === "result") {
      return;
    }

    if (careerSessionStatus === "on_learning") {
      if (!quizSessionId) {
        router.replace("/dashboard");
        return;
      }
    }

    const checkQuizSession = async () => {
      setIsChecking(true);

      if (!questions.length) {
        setIsChecking(false);
        /**
         * If there is no quiz session in the store, start a new quiz session.
         */
        const [, careerSessionData] = await Promise.all([
          mutateAsync(careerSessionId),
          privateApi.get(`/career-sessions/${careerSessionId}`),
        ]);

        setCareerId(toCamel(careerSessionData.data).data.careerId);
      } else {
        /**
         * Toast only no one params `career_session_status`
         * and there is quiz session in the store
         */
        if (!careerSessionStatus) {
          toast.success("Mari lanjutkan sesi kuis kamu");
        }
        setIsChecking(false);
      }
    };

    checkQuizSession();
  }, [
    careerSessionId,
    hasHydrated,
    urlStatus,
    careerSessionStatus,
  ]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        "Kuis sedang berjalan. Keluar sekarang akan mengulang kuis dari awal.";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <section className="w-full h-dvh p-[clamp(12px,5vw,56px)] md:p-0 flex flex-col justify-center items-center">
      {isChecking && <LoadingCheckingQuizSession />}
      {!isChecking && isPending && <LoadingStartingNewQuiz />}

      {!!questions.length && !isPending && (
        <QuestionAnswer careerSessionId={careerSessionId} />
      )}
    </section>
  );
};

export default QuizContainer;
