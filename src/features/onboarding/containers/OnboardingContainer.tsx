"use client";

import {
  OnboardingCredentials,
  OnboardingSchema,
} from "@/schemas/onboarding.schema";
import { useOnboardingFormStore } from "@/stores/useOnboardingFormStore";
import { useOnboardingStepStore } from "@/stores/useOnboardingStepStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import ConfirmationCallbackModal from "../components/ConfirmationCallbackModal";
import InputCareerStep from "../components/InputCareerStep";
import InputEducationStep from "../components/InputEducationStep";
import InputNameStep from "../components/InputNameStep";
import { StepIndicator } from "../components/StepIndicator";

export default function OnboardingContainer() {
  const router = useRouter();
  const pathname = usePathname();

  // manage params
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  // synchronize RHF form and zustand state from localStorage
  const {
    formStore,
    setForm,
    hasHydrated: formHasHydrated,
  } = useOnboardingFormStore(
    useShallow((state) => ({
      formStore: state.formStore,
      setForm: state.setForm,
      hasHydrated: state.hasHydrated,
    })),
  );

  // synchronize number of step from sessionStorage persist
  const {
    noStep,
    direction,
    setStep,
    hasHydrated: stepHasHydrated,
  } = useOnboardingStepStore(
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
    defaultValues: formStore as OnboardingCredentials,
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
    if (!formHasHydrated) return

    const handleStepChange = (noStep: number) => {
      setForm(form.getValues());
      setStep(noStep);
    };
    handleStepChange(noStep);
  }, [noStep, formHasHydrated]);

  /**
   * Edge case of step url hacking
   * set it into state management zustand
   */
  useEffect(() => {
    if (!stepHasHydrated) return;

    const fullNameField = form.getValues("fullname");
    if (!fullNameField?.trim() && noStep > 1) {
      setStep(1);
      return;
    }

    const educationField = form.getValues("education");
    if (!educationField?.educationLevel && noStep > 2) {
      setStep(2);
      return;
    }

    setStep(noStep);
  }, [stepHasHydrated]);

  /**
   * Make sure that ui has rendered from the same data
   * as zustand persist localStorage
   */
  if (!formHasHydrated || !stepHasHydrated) return null;

  const getConfirmationCallback = (_credentials: OnboardingCredentials) => {
    setForm(form.getValues());
    router.push(`${pathname}?${searchParams.toString()}&status=confirmation`);
  };

  console.log(Object.keys(formStore))

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

        <nav className="absolute top-10 right-10">
          <ol className="w-full flex gap-3">
            {(Object.keys(formStore) as Array<keyof OnboardingCredentials>).map(
              (state, index) => (
                <StepIndicator<OnboardingCredentials>
                  key={index}
                  stateKey={state}
                  index={index}
                  currentStep={noStep}
                  setStep={setStep}
                />
              ),
            )}
          </ol>
        </nav>
      </FormProvider>

      {status === "confirmation" && (
        <ConfirmationCallbackModal
          namePlaceholder={form.getValues("fullname")}
        />
      )}
    </>
  );
}
