import { OnboardingCredentials } from "@/schemas/onboarding.schema";
import { useOnboardingStepStore } from "@/stores/useOnboardingStepStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFormContext, useFormState } from "react-hook-form";

export function StepIndicator({ stateKey, index }: { stateKey: keyof OnboardingCredentials, index: number }) {
  const { control } = useFormContext<OnboardingCredentials>();
  const { errors } = useFormState({ control, name: stateKey });
  const { noStep, setStep } = useOnboardingStepStore();
  const pathname = usePathname();

  return (
    <Link
      className={`
        w-4 aspect-square rounded-full
        ${index + 1 > noStep ? "bg-primary-surface pointer-events-none" : "bg-primary-pressed hover:bg-primary-hover"} 
        hover:scale-110 transition-all duration-100 ease-in-out 
        ${errors[stateKey] ? "outline-2 outline-error bg-primary-surface animate-bounce" : ""}
      `}
      replace
      href={pathname}
      onClick={() => setStep(index + 1)}
    />
  );
}