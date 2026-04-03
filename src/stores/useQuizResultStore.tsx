import { QuizResult } from "@/types/common.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type QuizResultStore = {
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  result: QuizResult | null;
  setResult: (result: QuizResult) => void;
  clearResult: () => void;
};

export const useQuizResultStore = create<QuizResultStore>()(
  persist(
    (set) => ({
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),

      result: null,
      setResult: (result) => set({ result }),
      clearResult: () => set({ result: null }),
    }),
    {
      name: "quiz-result",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);