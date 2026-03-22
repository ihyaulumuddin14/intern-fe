import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getValidStep } from "@/features/onboarding/containers/OnboardingClient";

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

export function useActiveSection (sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return activeSection
}