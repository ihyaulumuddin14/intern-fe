import { UserLevel } from "@/schemas/career-sessions.schema";
import { Skill } from "@/types/entities.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SelfAsssessmentFormType = {
  selectedSkills: Skill[]
  skillRatings: {
    skillId: string,
    userLevel: UserLevel
  }[]
};

type Store = {
  formStore: SelfAsssessmentFormType;
  hasHydrated: boolean;
  setForm: (data: Partial<SelfAsssessmentFormType>) => void;
  resetForm: () => void;
  setHasHydrated: (state: boolean) => void;
};

export const useSelfAssessmentFormStore = create<Store>()(
  persist(
    (set) => ({
      formStore: {
        selectedSkills: [],
        skillRatings: []
      },
      hasHydrated: false,

      setForm: (data) =>
        set((state) => ({
          formStore: { ...state.formStore, ...data },
        })),

      resetForm: () => set({
        formStore: {
          selectedSkills: [],
          skillRatings: []
        }
      }),

      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "self-assessment-form",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
