"use client";

import { CareerSessionItem } from "@/types/common.type";
import { create } from "zustand";

interface CareerSessionSelectionState {
  isModalOpen: boolean;
  selectedSession: CareerSessionItem | null;
  
  openModal: () => void;
  closeModal: () => void;
  selectSession: (session: CareerSessionItem) => void;
  setSelectedSessionFromStorage: () => void;
}

export const useCareerSessionSelectionStore = create<CareerSessionSelectionState>((set) => ({
  isModalOpen: false,
  selectedSession: null,

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  
  selectSession: (session: CareerSessionItem) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("careerSessionId", session.careerSessionId);
    }
    set({ selectedSession: session, isModalOpen: false });
  },

  setSelectedSessionFromStorage: () => {
    if (typeof window !== "undefined") {
      const storedSessionId = localStorage.getItem("careerSessionId");
      if (storedSessionId) {
        set({ selectedSession: { careerSessionId: storedSessionId } as CareerSessionItem });
      }
    }
  },
}));
