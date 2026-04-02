"use client";

import privateApi from "@/api/axiosInstance";
import { useStartQuiz } from "@/hooks/quiz.hooks";
import { toCamel } from "@/lib/case";
import { useQuizStore } from "@/stores/useQuizStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import LoadingCheckingQuizSession from "../components/LoadingCheckingQuizSession";
import LoadingStartingNewQuiz from "../components/LoadingStartingNewQuiz";
import QuestionAnswer from "../components/Question";

const QuizContainer = ({ careerSessionId }: { careerSessionId: string }) => {
  const params = useSearchParams();
  const careerSessionStatus = params.get("career_session_status");
  const { mutateAsync: mutateStartQuiz, isPending } = useStartQuiz();
  const [isChecking, setIsChecking] = useState(true);
  const { questions, setCareerId, hasHydrated } = useQuizStore(useShallow((state) => ({
    questions: state.questions,
    setCareerId: state.setCareerId,
    hasHydrated: state.hasHydrated,
  })));

  useEffect(() => {
    if (!hasHydrated) return;

    const checkQuizSession = async () => {
      setIsChecking(true);

      if (!questions.length) {
        setIsChecking(false);
        /**
         * If there is no quiz session in the store, start a new quiz session.
         */
        await mutateStartQuiz(careerSessionId);
        const [, careerSessionData] = await Promise.all([
          mutateStartQuiz(careerSessionId),
          privateApi.get(`/career-sessions/${careerSessionId}`)
        ])

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
  }, [careerSessionId, hasHydrated]);

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

      {!!questions.length && !isPending && <QuestionAnswer /> }
    </section>
  );
};

export default QuizContainer;
