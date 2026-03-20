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
import { getCareers } from "@/services/career.services";
import { useQuery } from "@tanstack/react-query";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { ArrowRight, ChevronDown } from 'lucide-react';
import { StepDirection } from "@/types/common.type";
import { cn } from "@/lib/utils";
import { DropdownTrigger } from "@/components/shared/DropdownTrigger";
import { useState } from "react";
import { OnboardingCredentials } from "@/schemas/onboarding.schema";

export default function InputCareerStep({
  direction
}: {
  direction: StepDirection
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { control } = useFormContext<OnboardingCredentials>()
  const career = useWatch({ control, name: "career" })
  const { data: careers, isPending, error } = useQuery({
    queryKey: ["careers"],
    queryFn: getCareers,
    retry: false,
    refetchOnWindowFocus: false
  })

  return (
    <FormStepCard direction={direction} title={
      <>Karir Apa yang Ingin Kamu <span className="text-primary">Capai</span>?</>
    }
        >
          <FieldGroup>
            <Field>
              <Controller
                name="career"
                control={control}
                render={({ field }) => (
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild className="text-start relative cursor-pointer">
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
                      <div className="w-full h-14 border-b flex items-center px-4">
                        <div className="bg-neutral-50 w-1/2 h-6 rounded-md animate-pulse"/>
                      </div>
                      <div className="w-full h-14 border-b flex items-center px-4">
                        <div className="bg-neutral-50 w-1/2 h-6 rounded-md animate-pulse"/>
                      </div>
                      <div className="w-full h-14 border-b flex items-center px-4">
                        <div className="bg-neutral-50 w-1/2 h-6 rounded-md animate-pulse"/>
                      </div>
                    </>
                  ) : (
                    careers?.map((career) => (
                        <DropdownMenuItem
                        key={career.id}
                        className={cn(
                          "px-4 py-4 text-base md:text-lg cursor-pointer transition-colors",
                          "focus:bg-accent focus:text-accent-foreground border-b"
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
            </Field>
            <Field>
          <Button
            size="lg"
            className="max-w-fit mx-auto"
            type="submit"
          >
              Lanjut
              <ArrowRight/>
          </Button>
            </Field>
          </FieldGroup>
    </FormStepCard>
  )
}


