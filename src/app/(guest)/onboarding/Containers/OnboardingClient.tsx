"use client";

import { Button } from "@/components/ui/button";
import {
  OnboardingCredentials,
  OnboardingSchema,
} from "@/schemas/onboarding.schema";
import { useOnboardingForm } from "@/stores/useOnboardingForm";
import { useOnboardingStep } from "@/stores/useOnboardingStep";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, Path, useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import ConfirmationCallbackModal from "../Components/ConfirmationCallbackModal";
import InputCareerStep from "../Components/InputCareerStep";
import InputEducationStep from "../Components/InputEducationStep";
import InputNameStep from "../Components/InputNameStep";

export const MAX_ONBOARDING_STEP = 3;

export function getValidStep(raw: string | null): number {
  const parsed = Number(raw);
  if (!raw || isNaN(parsed) || parsed < 1 || parsed > MAX_ONBOARDING_STEP)
    return 1;
  return parsed;
}

export default function OnboardingClient() {
  const router = useRouter();
  const pathname = usePathname();

  // manage params
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  // syncronize RHF form and zustand state
  const {
    formStore,
    setForm,
    hasHydrated: formHasHydrated,
  } = useOnboardingForm(
    useShallow((state) => ({
      formStore: state.formStore,
      setForm: state.setForm,
      hasHydrated: state.hasHydrated,
    })),
  );

  const {
    noStep,
    direction,
    setStep,
    hasHydrated: stepHasHydrated,
  } = useOnboardingStep(
    useShallow((state) => ({
      noStep: state.noStep,
      direction: state.direction,
      setStep: state.setStep,
      hasHydrated: state.hasHydrated,
    })),
  );

  const form = useForm<OnboardingCredentials>({
    resolver: zodResolver(OnboardingSchema),
    mode: "onChange",
    defaultValues: formStore,
  });

  /**
   * Auto hydrate form field from zustand persist at mount
   */
  useEffect(() => {
    if (formHasHydrated) {
      form.reset(formStore);
    }
  }, [formHasHydrated]);

  /**
   * This only set to zustand persist
   * when user navigate to another step,
   * reducing parent rerender
   */
  useEffect(() => {
    const handleStepChange = (noStep: number) => {
      setForm(form.getValues());
      setStep(noStep);
    };
    handleStepChange(noStep);
  }, [noStep]);

  /**
   * Edge case of step url hacking
   * set it into state management zustand
   */
  useEffect(() => {
    if (!stepHasHydrated) return;

    const fullNameField = form.getValues("fullName");
    if (!fullNameField?.trim() && noStep > 1) {
      router.replace(`${pathname}?step=1`);
      return;
    }

    const educationField = form.getValues("education");
    if (!educationField?.educationLevel && noStep > 2) {
      router.replace(`${pathname}?step=2`);
      return;
    }

    setStep(noStep);
  }, [stepHasHydrated]);

  /**
   * Make sure that ui has rendered from the same data
   * as zustand persist localStorage
   */
  if (!formHasHydrated || !stepHasHydrated) return null;

  const getConfirmationCallback = (credentials: OnboardingCredentials) => {
    setForm(form.getValues());
    router.push(`${pathname}?${searchParams.toString()}&status=confirmation`);
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(getConfirmationCallback)}
          className="w-fit h-full flex items-center"
        >
          <AnimatePresence
            mode="wait"
            custom={direction}
          >
            {noStep == 1 && <InputNameStep key="step-1" />}
            {noStep == 2 && <InputEducationStep key="step-2" />}
            {noStep == 3 && <InputCareerStep key="step-3" />}
          </AnimatePresence>
        </form>
      </FormProvider>

      <nav className="mx-auto my-10">
        <ol className="w-full flex gap-3">
          {(Object.keys(formStore) as Array<keyof OnboardingCredentials>).map(
            (state, index) => {
              return (
                <Link
                  className={`
                  w-4 aspect-square rounded-full
                  ${index + 1 > noStep ? "bg-primary-surface pointer-events-none" : "bg-primary hover:bg-primary-hover"} hover:scale-110 transition-all duration-100 ease-in-out 
                   ${form.formState.errors[state] ? "outline-2 outline-error bg-primary-surface animate-bounce" : ""}
                `}
                  key={index}
                  replace
                  href={pathname}
                  onClick={() => setStep(index + 1)}
                />
              );
            },
          )}
        </ol>
      </nav>

      {status === "confirmation" && (
        <ConfirmationCallbackModal namePlaceholder={form.watch("fullName")} />
      )}
    </>
  );
}
