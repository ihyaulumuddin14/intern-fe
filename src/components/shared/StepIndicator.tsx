import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FieldValues,
  Path,
  useFormContext,
  useFormState,
} from "react-hook-form";

interface StepIndicatorProps<T extends FieldValues> {
  stateKey: Path<T>;
  index: number;
  currentStep: number;
  setStep: (step: number) => void;
}

export function StepIndicator<T extends FieldValues>({
  stateKey,
  index,
  currentStep,
  setStep,
}: StepIndicatorProps<T>) {

  const { control } = useFormContext<T>();
  const { errors } = useFormState({
    control,
    name: stateKey
  });
  const pathname = usePathname()
  const stepNumber = index + 1
  const isAccessible = stepNumber <= currentStep

  const hasError = !!errors[stateKey]

  return (
    <Link
      className={`
        w-4 aspect-square rounded-full
        ${!isAccessible ? "bg-primary-surface pointer-events-none" : "bg-primary-pressed hover:bg-primary-hover"} 
        hover:scale-110 transition-all duration-100 ease-in-out 
        ${hasError ? "outline-2 outline-error bg-primary-surface animate-bounce" : ""}
      `}
      replace
      href={pathname}
      onClick={() => setStep(stepNumber)}
    />
  );
}
