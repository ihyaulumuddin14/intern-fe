"use client";

import { CareerSessionSelectionModal } from "@/components/shared/CareerSessionSelectionModal";
import { useCareerSessionsList } from "@/hooks/career-sessions.hooks";

export default function CareerSessionSelectionModalRoute() {
  const { sessions, isPending } = useCareerSessionsList();

  return (
    <CareerSessionSelectionModal sessions={sessions} isLoading={isPending} />
  );
}
