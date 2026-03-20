import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { getValidStep } from "@/app/(guest)/onboarding/Containers/OnboardingClient";

export function useStepDirection() {
  const searchParams = useSearchParams();
  const requestedStep = getValidStep(searchParams.get("step"));
  const prevStepRef = useRef(requestedStep);

  const direction = requestedStep > prevStepRef.current ? "forward" : "backward";

  useEffect(() => {
    prevStepRef.current = requestedStep;
  }, [requestedStep]);

  return direction;
}