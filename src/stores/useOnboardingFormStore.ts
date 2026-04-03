import { EducationLevel } from "@/schemas/onboarding.schema";
import { Career } from "@/types/entities.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OnboardingFormType = {
  fullName: string;
  education: {
    educationLevel?: EducationLevel
    major?: string;
    institution?: string;
  };
  career: Career;
};

type Store = {
  formStore: OnboardingFormType;
  hasHydrated: boolean;
  setForm: (data: Partial<OnboardingFormType>) => void;
  resetForm: () => void;
  setHasHydrated: (state: boolean) => void;
};

export const useOnboardingFormStore = create<Store>()(
  persist(
    (set) => ({
      formStore: {
        fullName: "",
        education: {},
        career: {
          id: "",
          name: "",
          description: ""
        },
      },
      hasHydrated: false,

      setForm: (data) =>
        set((state) => ({
          formStore: { ...state.formStore, ...data },
        })),

      resetForm: () => set({
        formStore: {
          fullName: "",
          education: {},
          career: {
            id: "",
            name: "",
            description: ""
          },
        }
      }),

      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "onboarding-form",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
