"use client";

import FormStepCard from "@/components/shared/FormStepCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { OnboardingCredentials } from "@/schemas/onboarding.schema";
import { useOnboardingStep } from "@/stores/useOnboardingStep";
import { useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { ArrowRight, ChevronDown } from 'lucide-react';
import { StepDirection } from "@/types/common.type";
import { cn } from "@/lib/utils";
import { DropdownTrigger } from "@/components/shared/DropdownTrigger";

const educationLevels = [
  "SMA / SMK",
  "Diploma 3",
  "Diploma 4",
  "Sarjana (S1)",
];

export default function InputEducationStep({
  direction
}: {
  direction: StepDirection
}) {
  const { nextStep } = useOnboardingStep()
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    control,
    trigger,
    formState: { errors }
  } = useFormContext<OnboardingCredentials>();

  const educationData = useWatch({
    control,
    name: "education",
  });

  useEffect(() => {
    if (educationData) {
      trigger("education");
    }
  }, [educationData, trigger]);

  return (
    <FormStepCard direction={direction} title={
      <>Apa Tingkat <span className="text-primary">Pendidikan</span> Terakhirmu</>
    }>
          <FieldGroup>
            <Field>
              <Controller
            name="education.educationLevel"
                control={control}
                render={({ field }) => (
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild tabIndex={1} className="text-start relative cursor-pointer">
                  <DropdownTrigger 
                    value={educationData.educationLevel} 
                    placeholder="Pilih tingkat pendidikan kamu" 
                    isOpen={isOpen}
                  >
                    <ChevronDown className="h-5 w-5 opacity-50" />
                  </DropdownTrigger>
                    </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-(--radix-dropdown-menu-trigger-width) p-0 rounded-t-none"
                  align="start"
                >
                  {educationLevels.map((level) => (
                        <DropdownMenuItem
                          key={level}
                      className={cn(
                        "px-4 py-4 text-base md:text-lg cursor-pointer transition-colors",
                        "focus:bg-accent focus:text-accent-foreground border-b"
                      )}
                          onSelect={() => field.onChange(level)}
                        >
                          {level}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              ></Controller>
              <Input
                className="w-full"
                id="major-input"
            placeholder="Jurusan"
                {...register("education.major")}
              />
              <Input
                className="w-full"
                id="institution-input"
            placeholder="Nama Sekolah / Universitas"
                {...register("education.institution")}
              />

          {errors.education && (
            <p className="text-base text-right text-error-hover -mt-1">
              *{errors.education.educationLevel?.message || 
                errors.education.major?.message || 
                errors.education.institution?.message}
            </p>
          )}

            </Field>
        <Field>
          <Button
            size="lg"
            className="max-w-fit mx-auto"
            type="button"
            disabled={!!errors.education}
            onClick={nextStep}
          >
              Lanjut
              <ArrowRight/>
          </Button>
        </Field>
          </FieldGroup>
    </FormStepCard>
  );
}
