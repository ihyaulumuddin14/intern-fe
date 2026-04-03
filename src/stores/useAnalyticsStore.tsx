import { UserLevel } from "@/schemas/career-sessions.schema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Recommendation {
  skillId: string;
  skillName: string;
  currentLevel: UserLevel;
  targetLevel: UserLevel;
  priority: number;
}

export interface SkillResult {
  skillId: string;
  skillName: string;
  userLevel: UserLevel;
  finalUserLevel: UserLevel;
  requiredLevel: UserLevel;
  gapLevel: number;
  skillScore: number;
  status: string;
  suggestionLevel: UserLevel[];
}

export interface CareerSession {
  careerSessionId: string;
  recommendations: Recommendation[];
  skillsResult: SkillResult[];
  totalScore: number;
}

interface CareerState extends CareerSession {
  hasHydrated: boolean;

  setHasHydrated: (state: boolean) => void;
  setCareerSession: (data: CareerSession) => void;
  setRecommendations: (recommendations: Recommendation[]) => void;
  setSkillsResult: (skillsResult: SkillResult[]) => void;
  setTotalScore: (score: number) => void;

  getRecommendationBySkillId: (skillId: string) => Recommendation | undefined;
  getSkillResultBySkillId: (skillId: string) => SkillResult | undefined;
  reset: () => void;
}

const initialState: CareerSession = {
  careerSessionId: "",
  recommendations: [],
  skillsResult: [],
  totalScore: 0,
};


export const useCareerStore = create<CareerState>()(
  persist(
    (set, get) => ({
      ...initialState,
      hasHydrated: false,

      setHasHydrated: (state) => set({ hasHydrated: state }),
      setCareerSession: (data) =>
        set({
          careerSessionId: data.careerSessionId,
          recommendations: data.recommendations,
          skillsResult: data.skillsResult,
          totalScore: data.totalScore,
        }),
      setRecommendations: (recommendations) => set({ recommendations }),
      setSkillsResult: (skillsResult) => set({ skillsResult }),
      setTotalScore: (totalScore) => set({ totalScore }),

      getRecommendationBySkillId: (skillId) =>
        get().recommendations.find((r) => r.skillId === skillId),
      getSkillResultBySkillId: (skillId) =>
        get().skillsResult.find((s) => s.skillId === skillId),
      reset: () => set({ ...initialState, hasHydrated: true }),
    }),
    {
      name: "career-session-storage",
      storage: createJSONStorage(() => localStorage),

      // Hanya persist field ini — hasHydrated tidak ikut disimpan
      partialize: (state) => ({
        careerSessionId: state.careerSessionId,
        recommendations: state.recommendations,
        skillsResult: state.skillsResult,
        totalScore: state.totalScore,
      }),

      // Dipanggil setelah rehydration dari localStorage selesai
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);