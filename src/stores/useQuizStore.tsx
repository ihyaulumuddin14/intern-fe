import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface QuizStore {
  quizSessionId: string | null;
  questions: any[];
  setQuizSession: (id: string, questions: any[]) => void;
  resetQuiz: () => void;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      quizSessionId: null,
      questions: [],
      setQuizSession: (id, questions) => set({ 
        quizSessionId: id, 
        questions 
      }),
      resetQuiz: () => set({ quizSessionId: null, questions: [] }),
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'quiz-session-storage',
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);