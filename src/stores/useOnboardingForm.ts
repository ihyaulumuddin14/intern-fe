import { create } from "zustand"
import { persist } from "zustand/middleware"

type OnboardingFormType = {
  fullName?: string,
  education?: {
    educationLevel?: "SMA / SMK" | "Diploma 3" | "Diploma 4" | "Sarjana (S1)",
    major?: string,
    institution?: string,
  },
  career?: string
}

type Store = {
  formStore: OnboardingFormType
  hasHydrated: boolean
  setForm: (data: Partial<OnboardingFormType>) => void
  resetForm: () => void
  setHasHydrated: (state: boolean) => void
}

export const useOnboardingForm = create<Store>()(
  persist(
    (set) => ({
      formStore: {
        fullName: "",
        education: {},
        career: ""
      },
      hasHydrated: false,

      setForm: (data) =>
        set((state) => ({
          formStore: { ...state.formStore, ...data }
        })),

      resetForm: () => set({ formStore: {} }),

      setHasHydrated: (state) => set({ hasHydrated: state })
    }),
    {
      name: "onboarding-form",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      }
    }
  )
)