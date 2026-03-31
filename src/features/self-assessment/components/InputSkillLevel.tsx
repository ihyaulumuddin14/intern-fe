import FormStepCard from "@/components/shared/FormStepCard";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { RadioGroup } from "@/components/ui/radio-group";
import { useIsMobile } from "@/hooks/animation.hooks";
import {
  SelfAssessmentCredentials,
  USER_LEVEL_OPTIONS,
  UserLevel
} from "@/schemas/career-sessions.schema";
import { useSelfAssessmentStepStore } from "@/stores/useSelfAssessmentStepStore";
import { Skill } from "@/types/entities.type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  useFieldArray,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";
import RadioLevel from "./RadioLevel";

export default function InputUserLevel({ skills }: { skills: Skill[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // index of skills
  const [currentIndex, setCurrentIndex] = useState(0);

  // rate for each skill
  const [value, setValue] = useState<Exclude<UserLevel, "no_experience">>("beginner");

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
  const isLastStep = currentIndex === selectedSkills?.length - 1;

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
      // const mappedValue = USER_LEVEL_TO_NUMBER[currentField.userLevel || 1];
      setValue(currentField.userLevel as Exclude<UserLevel, "no_experience">);
    }
  }, [currentIndex, fields]);


  /**
   * Immediately update skill user
   * when the slider has changing value
   */
  const handleUserLevelChange = (userLevel: Exclude<UserLevel, "no_experience">) => {
    /**
     * Search fields index base on current skill id
     * for update the user level
     */
    
    
    update(targetIndex, {
      ...fields[targetIndex],
      userLevel,
    });
  };
  
  const handleSelfAssessmentSubmit = (
    _credentials?: SelfAssessmentCredentials,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", "confirmation");

    router.push(`${pathname}?${params.toString()}`);
  };
  
  return (
    <FormStepCard
      direction={direction}
      title={
        <div className="text-center mx-auto">
          Ukur Tingkat <span className="text-primary">Keahlian</span> Kamu
        </div>
      }
    >
      <FieldGroup className="flex flex-col mx-auto gap-8 max-w-137.5 h-max">
        <p className="text-center text-base sm:text-lg md:text-xl text-neutral-80">Seberapa ahli kamu untuk skill {currentSkill?.name}?</p>

        <RadioGroup defaultValue={value} value={value} className="w-full" onValueChange={handleUserLevelChange}>
          {USER_LEVEL_OPTIONS.map((option) => (
            <RadioLevel key={option.title} title={option.title} description={option.description} userLevel={option.userLevel} />
          ))}
        </RadioGroup>

        <div className="w-full flex! justify-between! items-center">
          <span className="text-xs sm:text-base md:text-xl text-neutral-60">
            {currentIndex + 1} dari {selectedSkills?.length} skill
          </span>
          <Field orientation={"horizontal"} className="gap-2 md:gap-4 w-fit">
            <Button
              type="button"
              size={isMobile ? "default" : "lg"}
              disabled={currentIndex === 0}
              onClick={handlePrev}
            >
              Kembali
            </Button>
            <Button
              type={"button"}
              size={isMobile ? "default" : "lg"}
              onClick={() => {
                isLastStep ? handleSelfAssessmentSubmit() : handleNext()
              }}
            >
              {isLastStep ? "Selesai" : "Lanjut"}
            </Button>
          </Field>
        </div>
      </FieldGroup>
    </FormStepCard>
  );
}
