import { QuizResult } from "@/types/common.type";
import { create } from "zustand";

type QuizResultStore = {
  result: QuizResult | null;
  setResult: (result: QuizResult) => void;
  clearResult: () => void;
};

export const useQuizResultStore = create<QuizResultStore>((set) => ({
  result: null,
  setResult: (result) => set({ result }),
  clearResult: () => set({ result: null }),
}));