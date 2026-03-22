"use client";

import FormStepCard from "@/components/shared/FormStepCard";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { OnboardingCredentials } from "@/schemas/onboarding.schema";
import { useOnboardingStepStore } from "@/stores/useOnboardingStepStore";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export default function InputNameStep() {
  const {
    register,
    trigger,
    control,
    formState: { errors, touchedFields, dirtyFields },
  } = useFormContext<OnboardingCredentials>();
  const { nextStep } = useOnboardingStepStore();

  const fullName = useWatch({
    control,
    name: "fullName",
  });

  useEffect(() => {
    if (dirtyFields.fullName || touchedFields.fullName) {
      trigger("fullName");
    }
  }, [trigger, dirtyFields.fullName, touchedFields.fullName]);

  return (
    <FormStepCard
      title={
        <>
          Mari Mulai dari <span className="text-primary">Namamu</span>
        </>
      }
    >
      <FieldGroup>
        <Field>
          <Input
            className="w-full"
            id="name-input"
            placeholder="Masukkan nama lengkap kamu..."
            {...register("fullName")}
          />
          {errors.fullName && (
            <FieldError>{errors.fullName.message}</FieldError>
          )}
        </Field>
        <Field>
          <Button
            size="lg"
            className="max-w-fit mx-auto"
            type="button"
            disabled={!fullName || !!errors.fullName}
            onClick={nextStep}
          >
            Lanjut
            <ArrowRight />
          </Button>
        </Field>
      </FieldGroup>
    </FormStepCard>
  );
}
