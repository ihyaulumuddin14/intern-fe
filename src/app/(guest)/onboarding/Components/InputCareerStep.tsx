"use client";

import { DropdownTrigger } from "@/components/shared/DropdownTrigger";
import FormStepCard from "@/components/shared/FormStepCard";
import Skeleton from "@/components/shared/Skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { OnboardingCredentials } from "@/schemas/onboarding.schema";
import { getCareers } from "@/services/career.services";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

export default function InputCareerStep() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    control,
    trigger,
    formState: { errors, touchedFields, dirtyFields },
  } = useFormContext<OnboardingCredentials>();

  const career = useWatch({
    control,
    name: "career",
  });

  useEffect(() => {
    if (dirtyFields.career || touchedFields.career) {
      trigger("career");
    }
  }, [trigger, dirtyFields.career, touchedFields.career]);

  const {
    data: careers,
    isPending,
    error,
  } = useQuery({
    queryKey: ["careers"],
    queryFn: getCareers,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <FormStepCard
      title={
        <>
          Karir Apa yang Ingin Kamu <span className="text-primary">Capai?</span>
        </>
      }
    >
      <FieldGroup>
        <Field>
          <Controller
            name="career"
            control={control}
            render={({ field }) => (
              <DropdownMenu
                open={isOpen}
                onOpenChange={setIsOpen}
              >
                <DropdownMenuTrigger
                  asChild
                  className="text-start relative cursor-pointer"
                >
                  <DropdownTrigger
                    value={career}
                    placeholder="Pilih minat karir kamu"
                    isOpen={isOpen}
                  >
                    <ChevronDown className="h-5 w-5 opacity-50" />
                  </DropdownTrigger>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-(--radix-dropdown-menu-trigger-width) p-0 rounded-t-none"
                  align="start"
                  avoidCollisions={false}
                >
                  {error && (
                    <div className="border border-error-border bg-error-surface p-4 text-error text-base">
                      {error.message}
                    </div>
                  )}

                  {isPending ? (
                    <>
                      {[...Array(3)].map(_ => (
                        <div className="w-full h-14 border-b flex items-center px-4">
                          <Skeleton />
                        </div>
                      ))}
                    </>
                  ) : (
                    careers?.map((career) => (
                      <DropdownMenuItem
                        key={career.id}
                        className={cn(
                          "px-4 py-4 text-base md:text-lg cursor-pointer transition-colors",
                          "focus:bg-accent focus:text-accent-foreground border-b",
                        )}
                        onSelect={() => field.onChange(career.name)}
                      >
                        {career.name}
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          ></Controller>
          {errors.career && <FieldError>{errors.career.message}</FieldError>}
        </Field>
        <Field>
          <Button
            disabled={!career || !!errors.career}
            size="lg"
            className="max-w-fit mx-auto"
            type="submit"
          >
            Lanjut
            <ArrowRight />
          </Button>
        </Field>
      </FieldGroup>
    </FormStepCard>
  );
}
