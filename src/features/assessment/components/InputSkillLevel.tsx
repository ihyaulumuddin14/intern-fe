import FormStepCard from "@/components/shared/FormStepCard";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  NUMBER_TO_USER_LEVEL,
  SelfAssessmentCredentials,
  USER_LEVEL_TO_NUMBER,
  UserLevel,
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

export default function InputUserLevel({ skills }: { skills: Skill[] }) {
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

  // Search field index base on current skill id
  const targetIndex = useMemo(
    () => fields.findIndex((field) => field.skillId === currentSkill.id),
    [currentSkill, fields]
  );

  const handleNext = () => {
    if (!isLastStep) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    const selectedSkillIds = selectedSkills.map((skill) => skill.id);

    if (fields.length === 0) {
      const initialRatings = skills.map((skill) => ({
        skillId: skill.id,
        userLevel: selectedSkillIds.includes(skill.id)
          ? "beginner"
          : ("no_experience" as UserLevel),
      }));
      replace(initialRatings);
    } else {
        const newFields = fields.map((field) => ({
          ...field,
          userLevel: selectedSkillIds.includes(field.skillId)
            ? field.userLevel === "no_experience"
              ? "beginner"
              : field.userLevel  // still user the previous user level
            : "no_experience" as UserLevel,   // reset user level for removed skill
        }));

        const hasChanged = fields.some(
          (field, i) => field.userLevel !== newFields[i].userLevel
        );

        if (hasChanged) replace(newFields);
    }
  }, [selectedSkills, replace]);

  /**
   * Synchronizing slider value
   * when the current index has change
   */
  useEffect(() => {
    const currentField = fields[targetIndex];
    if (currentField?.userLevel) {
      const mappedValue = USER_LEVEL_TO_NUMBER[currentField.userLevel || 1];
      setValue([mappedValue]);
    }
  }, [currentIndex, fields]);


  /**
   * Immediately update skill user
   * when the slider has changing value
   */
  const handleSliderChange = (newValue: number[]) => {
    setValue(newValue);
    const UserLevel = NUMBER_TO_USER_LEVEL[newValue[0]];

    /**
     * Search fields index base on current skill id
     * for update the user level
     */

    update(targetIndex, {
      ...fields[targetIndex],
      userLevel: UserLevel,
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
              !!errors.skillRatings || currentIndex !== selectedSkills.length - 1
            }
          >
            Mulai Kuis
          </Button>
        </Field>
      </FieldGroup>
    </FormStepCard>
  );
}
