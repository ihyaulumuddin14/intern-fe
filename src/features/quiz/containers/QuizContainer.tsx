"use client";

import Loader from "@/components/shared/Loader";
import { useStartQuiz } from "@/hooks/career-sessions.hooks";
import { useQuizStore } from "@/stores/useQuizStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const QuizContainer = ({ careerSessionId }: { careerSessionId: string }) => {
  const params = useSearchParams();
  const careerSessionStatus = params.get("career_session_status");
  const { mutateAsync, isPending, isIdle } = useStartQuiz();
  const setQuizSession = useQuizStore((state) => state.setQuizSession);
  const [isChecking, setIsChecking] = useState(true);
  const { questions, hasHydrated } = useQuizStore();

  useEffect(() => {
    if (!hasHydrated) return;

    const checkQuizSession = async () => {
      setIsChecking(true);

      if (!questions.length) {
        /**
         * If there is no quiz session in the store, start a new quiz session.
         */
        try {
          await mutateAsync(careerSessionId);
        } catch (error) {}
      } else {
        /**
         * Toast only no one params `career_session_status`
         * and there is quiz session in the store
         */
        if (!careerSessionStatus) {
          toast.success("Mari lanjutkan kuis terakhirmu");
        }
      }

      setIsChecking(false);
    };

    checkQuizSession();
  }, [careerSessionId, hasHydrated]);

  useEffect(() => {
    if (careerSessionStatus === "on_quiz") {
      toast.warning("Mari lanjutkan kuis terakhirmu");
    }
  }, []);

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
    <section className="w-full h-dvh p-[clamp(12px,5vw,56px)] flex flex-col justify-center items-center">
      {isChecking && (
        <>
          <Loader size="lg" />
          <p className="text-sm sm:text-lg">Memeriksa sesi kuis..</p>
        </>
      )}
      {!isChecking && isPending && (
        <>
          <Loader size="lg" />
          <p className="text-sm sm:text-lg">Memulai kuis baru..</p>
        </>
      )}
      {questions.length > 0 && !isPending && (
        <p>{JSON.stringify(questions)}</p>
      )}
    </section>
  );
};

export default QuizContainer;
