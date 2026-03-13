"use client";

import { Button } from "@/components/ui/button";
import {
  OnboardingCredentials,
  OnboardingSchema,
} from "@/schemas/onboarding.schema";
import { useOnboardingStep } from "@/stores/useOnboardingStep";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "motion/react";
import { useForm, FormProvider } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import InputNameStep from "../Components/InputNameStep";
import InputEducationStep from "../Components/InputEducationStep";
import InputCareerStep from "../Components/InputCareerStep";
import { Career } from "@/types/type";
import { useEffect } from "react";
import { useOnboardingForm } from "@/stores/useOnboardingForm";

export default function OnboardingClient({ careers }: { careers: Career[] }) {
  const { noStep, nextStep, prevStep } = useOnboardingStep(
    useShallow((state) => ({
      noStep: state.noStep,
      nextStep: state.nextStep,
      prevStep: state.prevStep,
    })),
  );
  const { formStore, setForm, resetForm, hasHydrated } = useOnboardingForm()

  const form = useForm<OnboardingCredentials>({
    resolver: zodResolver(OnboardingSchema),
    mode: "onChange",
    defaultValues: formStore
  });

  useEffect(() => {
    if (hasHydrated) {
      form.reset(formStore as OnboardingCredentials)
    }
  }, [hasHydrated])

  useEffect(() => {
    const subscription = form.watch((values) => {
      setForm(values as OnboardingCredentials)
    })

    return () => subscription.unsubscribe()
  }, [form, setForm])

  const handleOnboardingSubmit = (credentials: OnboardingCredentials) => {
    console.log(credentials);

    form.reset()
    resetForm()
  };

  return (
    <>
      <main className="w-full">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnboardingSubmit)}
          >
            <AnimatePresence mode="wait">
              {noStep == 1 && <InputNameStep/>}
              {noStep == 2 && <InputEducationStep/>}
              {noStep == 3 && <InputCareerStep careers={careers}/>}
            </AnimatePresence>
          </form>
        </FormProvider>
      </main>
      <footer className="flex gap-10">
        <Button onClick={prevStep}>Prev</Button>
        <Button onClick={nextStep}>Next</Button>
      </footer>
    </>
  );
}
