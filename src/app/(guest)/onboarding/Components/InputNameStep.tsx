"use client";

import FormStepCard from "@/components/shared/FormStepCard";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { OnboardingCredentials } from "@/schemas/onboarding.schema";
import { useOnboardingStep } from "@/stores/useOnboardingStep";
import { StepDirection } from "@/types/common.type";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export default function InputNameStep({
  direction
}: {
  direction: StepDirection
}) {
  const {
    register,
    trigger,
    control,
    formState: { errors }
  } = useFormContext<OnboardingCredentials>()
  const { nextStep } = useOnboardingStep()

  const fullName = useWatch({
    control,
    name: "fullName",
  })

  useEffect(() => {
    trigger("fullName");
  }, [])


  return (
    <FormStepCard direction={direction} title={
      <>Mari Mulai dari <span className="text-primary">Namamu</span></>
    }>
          <FieldGroup>
            <Field>
              <Input
                className="w-full"
                id="name-input"
            placeholder="Masukkan nama lengkap kamu..."
            value={fullName}
            {...register("fullName")}
              />
          {errors.fullName && (
            <p className="text-base text-right text-error-hover -mt-1">*{errors.fullName.message}</p>
          )}
            </Field>
        <Field>
          <Button
            size="lg"
            className="max-w-fit mx-auto"
            type="button"
            disabled={!!errors.fullName}
            onClick={nextStep}
          >
              Lanjut
              <ArrowRight/>
          </Button>
        </Field>
          </FieldGroup>
    </FormStepCard>
  )
}
