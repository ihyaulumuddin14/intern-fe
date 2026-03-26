import FormStepCard from "@/components/shared/FormStepCard";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  NUMBER_TO_SKILL_LEVEL,
  SelfAssessmentCredentials,
  SKILL_LEVEL_TO_NUMBER,
  SkillLevel,
} from "@/schemas/career-sessions.schema";
import { useSelfAssessmentStepStore } from "@/stores/useSelfAssessmentStepStore";
import { Skill } from "@/types/entities.type";
import { useEffect, useMemo, useState } from "react";
import {
  useFieldArray,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";
import { SliderLevel } from "./SliderLevel";
import { useIsMobile } from "@/hooks/animation.hooks";

export default function InputSkillLevel({ skills }: { skills: Skill[] }) {
  // index of skills
  const [currentIndex, setCurrentIndex] = useState(0);

  // rate for each skill
  const [value, setValue] = useState<number[]>([1]);

  // RHF
  const { control } = useFormContext<SelfAssessmentCredentials>();
  const { errors } = useFormState({ control, name: "skillRatings" });
  const selectedSkills = useWatch({ control, name: "selectedSkills" });
  const { fields, replace, update } = useFieldArray({
    control,
    name: "skillRatings",
  });

  const isMobile = useIsMobile()
  const { direction } = useSelfAssessmentStepStore();

  const currentSkill = selectedSkills[currentIndex];
  const isLastStep = currentIndex === selectedSkills.length - 1;

  const handleNext = () => {
    if (!isLastStep) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  /**
   * Using useMemo and string comparison
   * due to minimum rerender of reference difference
   */
  const selectedIdsString = useMemo(
    () => selectedSkills.map((s) => s.id).join(","),
    [selectedSkills],
  );

  useEffect(() => {
    const selectedSkillIds = selectedSkills.map((skill) => skill.id);

    if (fields.length === 0) {
      const initialRatings = skills.map((skill) => ({
        skillId: skill.id,
        level: selectedSkillIds.includes(skill.id)
          ? "beginner"
          : ("no_experience" as SkillLevel),
      }));
      replace(initialRatings);
    } else {
      // if there is a difference in selectedSkills from the previous step
      const hasChanged = fields.some(
        (skillRating) =>
          selectedSkillIds.includes(skillRating.skillId) &&
          skillRating.level === "no_experience",
      );

      if (hasChanged) {
        const newRatings = fields.map((skillRating) => ({
          ...skillRating,
          level:
            skillRating.level === "no_experience" &&
            selectedSkillIds.includes(skillRating.skillId)
              ? "beginner"
              : skillRating.level,
        }));
        replace(newRatings);
      }
    }
  }, [selectedIdsString, replace]);

  /**
   * Synchronizing slider value
   * when the current index has change
   */
  useEffect(() => {
    const currentField = fields[currentIndex];
    if (currentField?.level) {
      const mappedValue = SKILL_LEVEL_TO_NUMBER[currentField.level] || 1;
      setValue([mappedValue]);
    }
  }, [currentIndex, fields]);

  /**
   * Immediately update skill level
   * when the slider has changing value
   */
  const handleSliderChange = (newValue: number[]) => {
    setValue(newValue);
    const skillLevel = NUMBER_TO_SKILL_LEVEL[newValue[0]];

    update(currentIndex, {
      ...fields[currentIndex],
      level: skillLevel,
    });
  };

  return (
    <FormStepCard
      direction={direction}
      title={
        <div className="">
          Ukur Tingkat <span className="text-primary">Keahlian</span> Kamu
        </div>
      }
    >
      <FieldGroup className="flex flex-col mx-auto gap-8 max-w-181.75 h-max">
        <Field>
          <FieldLabel className="flex flex-col gap-2 sm:gap-4">
            <span className="inline-block self-end text-sm md:text-base">
              {currentIndex + 1}/{selectedSkills?.length} skills
            </span>
            <h2 className="self-start text-base sm:text-lg lg:text-xl text-neutral-70 max-w-219.5 font-normal">
              Untuk skill <strong>{currentSkill?.name}</strong>, seberapa ahli
              kamu?
            </h2>
          </FieldLabel>

          <div className="w-full my-5">
            <SliderLevel
              value={value}
              onValueChange={handleSliderChange}
              defaultValue={[1]}
              max={3}
              min={1}
              step={1}
            />
          </div>
        </Field>
        <Field
          orientation={"horizontal"}
          className="w-full flex justify-between"
        >
          <Button
            type="button"
            size={isMobile ? "default" : "lg"}
            variant={"outline"}
            disabled={currentIndex === 0}
            onClick={handlePrev}
          >
            Sebelumnya
          </Button>
          <Button
            type="button"
            size={isMobile ? "default" : "lg"}
            variant={"outline"}
            disabled={isLastStep}
            onClick={handleNext}
          >
            Selanjutnya
          </Button>
        </Field>
        <Field>
          <Button
            type="submit"
            size={isMobile ? "default" : "lg"}
            disabled={
              !!errors.skillRatings || currentIndex !== fields.length - 1
            }
          >
            Mulai Kuis
          </Button>
        </Field>
      </FieldGroup>
    </FormStepCard>
  );
}
