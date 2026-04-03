import { CareerSessionStatus } from "@/types/common.type";
import { create } from "zustand";

type CareerSessionStore = {
  careerSessionStatus: CareerSessionStatus | null,
  setCareerSessionStatus: (status: CareerSessionStatus) => void,
}


export const useCareerSessionStore = create<CareerSessionStore>(set => ({
  careerSessionStatus: "not_started",
  setCareerSessionStatus: (status: CareerSessionStatus | null) => set({
    careerSessionStatus: status
  })
}))