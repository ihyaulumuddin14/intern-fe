import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAnswerQuestion } from "@/hooks/quiz.hooks";
import { AnswerOption, QuizFormCredentials } from "@/schemas/quiz.schema";
import { useQuizStore } from "@/stores/useQuizStore";
import { Option, Question } from "@/types/entities.type";
import { useEffect, useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";

const Answers = ({
  currentQuestion,
  selectedAnswer,
  currentIndex,
  setSelectedAnswer,
}: {
  currentQuestion: Question;
  selectedAnswer: AnswerOption | null;
  currentIndex: number;
  setSelectedAnswer: (userAnswer: AnswerOption | null) => void;
}) => {
  const { questions, setAnswer, quizSessionId, removeAnswerFromStore } =
    useQuizStore(
      useShallow((state) => ({
        questions: state.questions,
        setAnswer: state.setAnswer,
        quizSessionId: state.quizSessionId,
        removeAnswerFromStore: state.removeAnswerFromStore,
      })),
    );
  const { control } = useFormContext<QuizFormCredentials>();
  const { replace, fields, update } = useFieldArray({
    control,
    name: "answers",
  });
  const { mutate: mutateAnswer } = useAnswerQuestion();

  const handleSelectAnswer = (userAnswer: AnswerOption) => {
    const quizAnswerId = currentQuestion.quizAnswerId;

    // Find the target index dynamically to avoid stale closure
    const currentTargetIndex = fields.findIndex(
      (field) => field.quizAnswerId === quizAnswerId,
    );

    // Safety check if field not found and trigger to initialize it
    if (currentTargetIndex === -1) {
      return;
    }

    const previousAnswer = fields[currentTargetIndex]?.userAnswer;

    // update rhf
    update(currentTargetIndex, {
      ...fields[currentTargetIndex],
      userAnswer,
    });

    // update Zustand Store (Optimistic)
    setAnswer(quizAnswerId, userAnswer);

    // hit answer endpoint, using react-query mutation, rollback when error
    if (quizSessionId) {
      mutateAnswer(
        {
          quizSessionId,
          credentials: {
            quizAnswerId,
            userAnswer,
          },
        },
        {
          onError: () => {
            // ROLLBACK
            update(currentTargetIndex, {
              ...fields[currentTargetIndex],
              userAnswer: previousAnswer,
            });

            // back to the previous answer
            if (previousAnswer) {
              setAnswer(quizAnswerId, previousAnswer);
            } else {
              // remove the first answer
              removeAnswerFromStore(quizAnswerId);
            }

            toast.error("Gagal menyimpan jawaban, silakan coba lagi.");
          },
        },
      );
    }
  };

  const targetIndex = useMemo(
    () =>
      fields.findIndex(
        (field) => field.quizAnswerId === currentQuestion.quizAnswerId,
      ),
    [currentQuestion.quizAnswerId, fields],
  );

  useEffect(() => {
    const questionAnswerIds = questions.map((q) => q.quizAnswerId);

    if (fields.length === 0 && questionAnswerIds.length > 0) {
      /**
       * Initialize fields only if empty
       */
      const initialQuizAnswers = questions.map((question) => ({
        quizAnswerId: question.quizAnswerId,
        userAnswer: undefined,
      }));
      replace(initialQuizAnswers);
    } else if (fields.length > 0 && questionAnswerIds.length > 0) {
      /**
       * Sync fields with questions, preserve existing answers
       */
      const newFields = questionAnswerIds.map((quizAnswerId) => {
        const existingField = fields.find(
          (field) => field.quizAnswerId === quizAnswerId,
        );
        return {
          quizAnswerId,
          userAnswer: existingField?.userAnswer ?? undefined,
        };
      });

      // Only replace if actual changes detected
      const hasStructureChanged =
        newFields.length !== fields.length ||
        newFields.some(
          (field, i) => field.quizAnswerId !== fields[i]?.quizAnswerId,
        );

      if (hasStructureChanged) {
        replace(newFields);
      }
    }
  }, [questions, replace, fields.length]);

  useEffect(() => {
    const currentField = fields[targetIndex];
    if (currentField?.userAnswer) {
      setSelectedAnswer(currentField.userAnswer);
    }
  }, [currentIndex, fields]);

  return (
    <RadioGroup
      value={selectedAnswer}
      onValueChange={handleSelectAnswer}
    >
      {Object.values(currentQuestion?.options).map((option: Option) => {
        return (
          <FieldLabel
            key={option.code}
            htmlFor={option.code}
            className="cursor-pointer w-full px-5 py-3 rounded-3xl border border-neutral-40"
          >
            <Field className="p-0!">
              <RadioGroupItem
                className="hidden"
                value={option.code}
                id={option.code}
              />
              <FieldContent>
                <FieldDescription className="text-neutral-60 leading-1.5 text-sm sm:text-base md:text-xl">
                  {option.code.toUpperCase()}. {option.content}
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldLabel>
        );
      })}
    </RadioGroup>
  );
};

export default Answers;
