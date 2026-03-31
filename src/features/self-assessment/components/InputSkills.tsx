"use client";

import FormStepCard from "@/components/shared/FormStepCard";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { SelfAssessmentCredentials } from "@/schemas/career-sessions.schema";
import { useSelfAssessmentStepStore } from "@/stores/useSelfAssessmentStepStore";
import { Skill } from "@/types/entities.type";
import { ArrowRight } from "lucide-react";
import { useFormContext, useFormState, useWatch } from "react-hook-form";
import BadgeSkill from "./BadgeSkill";
import { useShallow } from "zustand/react/shallow";

export default function InputSkills({ skills, careerName }: { skills: Skill[], careerName: string }) {
  const { control } = useFormContext<SelfAssessmentCredentials>();
  const { errors } = useFormState({ control, name: "selectedSkills" });
  const { nextStep, direction } = useSelfAssessmentStepStore(useShallow(state => ({
    nextStep: state.nextStep,
    direction: state.direction
  })));

  const selectedSkills = useWatch({
    control,
    name: "selectedSkills",
  });

  return (
    <FormStepCard
      direction={direction}
      title={
        <div className="max-w-4xl text-2xl sm:text-4xl md:text-5xl text-center mx-auto">
          Sebagai {careerName}, <span className="text-primary">Skill</span> Apa
          Saja yang Sudah Kamu Kuasai?
        </div>
      }
    >
      <FieldGroup className="flex flex-col mx-auto gap-8 max-w-181.75">
        <Field>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-5">
            {skills.map((skill) => (
              <BadgeSkill key={skill.id} skill={skill} />
            ))}
          </div>
          {errors.selectedSkills && (
            <FieldError>{errors.selectedSkills.message}</FieldError>
          )}
        </Field>
        <Field>
          <Button
            size="lg"
            type="button"
            className="max-w-fit mx-auto"
            disabled={selectedSkills.length == 0 || !!errors.selectedSkills}
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