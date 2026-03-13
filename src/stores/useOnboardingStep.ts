import { create } from "zustand"
import { persist } from "zustand/middleware"

type OnboardingStepType = {
  noStep: number,
  direction: "forward" | "backward"
  nextStep: () => void,
  prevStep: () => void,
}

export const useOnboardingStep = create<OnboardingStepType>()(
  persist(
    (set) => ({
      noStep: 1,
      direction: "forward",
      nextStep: () => set(state => ({
        noStep: state.noStep === 3 ? state.noStep : state.noStep + 1,
        direction: state.noStep === 3 ? state.direction : "forward"
      })),
      prevStep: () => set(state => ({
        noStep: state.noStep === 1 ? state.noStep : state.noStep - 1,
        direction: state.noStep === 1 ? state.direction : "backward"
      })),
    }),
    {
      name: "onboarding-step",
      partialize: state => ({
        noStep: state.noStep
      })
    }
  )
)