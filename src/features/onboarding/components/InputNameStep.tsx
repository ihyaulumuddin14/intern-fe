"use client";

import FormStepCard from "@/components/shared/FormStepCard";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { OnboardingCredentials } from "@/schemas/onboarding.schema";
import { useOnboardingStepStore } from "@/stores/useOnboardingStepStore";
import { ArrowRight } from "lucide-react";
import {
  Controller,
  useFormContext,
  useFormState,
  useWatch
} from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

export default function InputNameStep() {
  const { control } = useFormContext<OnboardingCredentials>();
  const { errors } = useFormState({ control, name: "fullname" });
  const { nextStep, direction } = useOnboardingStepStore(useShallow(state => ({
    nextStep: state.nextStep,
    direction: state.direction
  })));

  const fullname = useWatch({
    control,
    name: "fullname",
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && fullname && !errors.fullname) {
      e.preventDefault()
      nextStep()
    }
  }

  return (
    <FormStepCard
      direction={direction}
      title={
        <div className="w-full max-w-3xl text-center">
          Mari Mulai dari <span className="text-primary">Namamu</span>
        </div>
      }
    >
      <FieldGroup className="w-full max-w-137.75 flex flex-col gap-8">
        <Field>
          <Controller
            control={control}
            name="fullname"
            render={({ field }) => (
              <Input
                className="w-full"
                id="name-input"
                placeholder="Masukkan nama lengkap kamu..."
                onKeyDown={handleKeyDown}
                {...field}
              />
            )}
          />
          {errors.fullname && (
            <FieldError>{errors.fullname.message}</FieldError>
          )}
        </Field>
        <Field>
          <Button
            size="lg"
            className="max-w-fit mx-auto"
            type="button"
            disabled={!fullname || !!errors.fullname}
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
