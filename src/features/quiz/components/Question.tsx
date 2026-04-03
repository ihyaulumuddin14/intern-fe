"use client";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/animation.hooks";
import { useCareerById } from "@/hooks/careers.hooks";
import {
  AnswerOption,
  QuizFormCredentials,
  QuizFormSchema,
} from "@/schemas/quiz.schema";
import { useQuizStore } from "@/stores/useQuizStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "iconsax-reactjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import Answers from "./Answers";
import ConfirmationSubmitQuiz from "./ConfirmationSubmitQuiz";
import QuizResult from "./QuizResult";

const Question = ({ careerSessionId }: { careerSessionId: string }) => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  // get questions from quiz store
  const { questions, careerId, formStore } = useQuizStore(
    useShallow((state) => ({
      questions: state.questions,
      formStore: state.formStore,
      careerId: state.careerId,
    })),
  );
  const { data: career } = useCareerById(careerId || "");

  // index of current question
  const [currentIndex, setCurrentIndex] = useState(0);

  // selected answer for current question
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerOption | null>(
    null,
  );

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleNext = () => {
    if (selectedAnswer) {
      setSelectedAnswer(null);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedAnswer(null);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const form = useForm<QuizFormCredentials>({
    resolver: zodResolver(QuizFormSchema),
    mode: "onChange",
    defaultValues: { answers: formStore } as QuizFormCredentials,
  });

  const handleQuizSubmit = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", "confirmation");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col justify-between">
        <header className="w-full">
          <h2 className="text-right text-sm sm:text-base md:text-xl text-neutral-60">
            {career?.name} - {currentQuestion?.skillName}
          </h2>
        </header>

        <div className="w-full max-w-xl mx-auto flex flex-col gap-8">
          <h3 className="text-xl sm:text-3xl md:text-[40px] font-semibold text-center">
            <span className="text-primary">Pertanyaan </span>
            Nomor {currentIndex + 1}
          </h3>
          <p className="text-sm sm:text-base md:text-xl font-normal text-neutral-80 text-center">
            {currentQuestion?.questionContent}
          </p>

          <div className="w-full max-w-111 mx-auto flex flex-col gap-4">
            <FormProvider {...form}>
              <Answers
                currentIndex={currentIndex}
                setSelectedAnswer={setSelectedAnswer}
                currentQuestion={currentQuestion}
                selectedAnswer={selectedAnswer}
              />
            </FormProvider>
          </div>
        </div>

        <footer className="w-full flex gap-4 justify-end">
          <Button
            disabled={currentIndex === 0}
            size={isMobile ? "lg" : "gt"}
            onClick={handlePrev}
          >
            <ArrowLeft className="size-4 md:size-5" />
          </Button>
          <Button
            disabled={selectedAnswer === null}
            size={isMobile ? "lg" : "gt"}
            onClick={() => {
              isLastQuestion ? handleQuizSubmit() : handleNext();
            }}
          >
            {isLastQuestion ? (
              "Selesaikan"
            ) : (
              <ArrowRight className="size-4 md:size-5" />
            )}
          </Button>
        </footer>
      </div>

      {status === "confirmation" && <ConfirmationSubmitQuiz />}
      {status === "result" && <QuizResult careerSessionId={careerSessionId} />}
    </>
  );
};

export default Question;
