import { MAX_SELF_ASSESSMENT_STEP } from "@/features/self-assessment/constants";
import { StepDirection } from "@/types/common.type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SelfAssessmentStepType = {
  noStep: number;
  direction: StepDirection;
  hasHydrated: boolean;
  setStep: (noStep: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setHasHydrated: (state: boolean) => void;
};

export const useSelfAssessmentStepStore = create<SelfAssessmentStepType>()(
  persist(
    (set) => ({
      noStep: 1,
      direction: "forward",
      hasHydrated: false,

      setStep: (noStep) =>
        set((state) => ({
          noStep,
          direction: state.noStep > noStep ? "backward" : "forward",
        })),
      nextStep: () =>
        set((state) => ({
          noStep:
            state.noStep === MAX_SELF_ASSESSMENT_STEP
              ? state.noStep
              : state.noStep + 1,
          direction: "forward",
        })),
      prevStep: () =>
        set((state) => ({
          noStep: state.noStep === 1 ? state.noStep : state.noStep - 1,
          direction: "backward",
        })),

      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "self-assessment-step",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
