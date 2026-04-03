import { AnswerOption } from "@/schemas/quiz.schema";
import { Question } from "@/types/entities.type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type QuizAnswer = {
  quizAnswerId: string;
  answer: AnswerOption | undefined;
};

interface QuizStore {
  quizSessionId: string | null;
  questions: Question[];
  setQuizSession: (id: string, questions: Question[]) => void;
  resetQuiz: () => void;
  careerId: string | null;
  setCareerId: (careerId: string) => void;
  formStore: QuizAnswer[];
  setAnswer: (quizAnswerId: string, answer: AnswerOption) => void;
  removeAnswerFromStore: (quizAnswerId: string) => void;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      quizSessionId: null,
      careerId: null,
      setCareerId: (careerId) => set({ careerId }),

      // questions and quiz session data management
      questions: [],
      setQuizSession: (id, questions) =>
        set({
          quizSessionId: id,
          questions
        }),
      resetQuiz: () => set({ quizSessionId: null, questions: [] }),

      // quiz answer management, synchronize with sessionStorage and rhf
      formStore: [],
      setAnswer: (selectedQuizAnswerId, answer) =>
        set((state) => {
          const existingAnswerIndex = state.formStore.findIndex(
            (quizAnswer) => quizAnswer.quizAnswerId === selectedQuizAnswerId,
          );

          // if the answer for the question already exists, update the answer
          if (existingAnswerIndex !== -1) {
            const updatedFormStore = [...state.formStore];
            updatedFormStore[existingAnswerIndex] = {
              quizAnswerId: selectedQuizAnswerId,
              answer,
            };
            return { formStore: updatedFormStore };
          }

          // if doesn't exist, add new answer to formStore
          return {
            formStore: [
              ...state.formStore,
              { quizAnswerId: selectedQuizAnswerId, answer },
            ],
          };
        }),
      removeAnswerFromStore: (selectedQuizAnswerId) =>
      set((state) => ({
        formStore: state.formStore.filter(
          (item) => item.quizAnswerId !== selectedQuizAnswerId
        ),
      })),

      
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "quiz-session-storage",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
