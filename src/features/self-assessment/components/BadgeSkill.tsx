import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/animation.hooks";
import { SelfAssessmentCredentials } from "@/schemas/career-sessions.schema";
import { Skill } from "@/types/entities.type";
import { useMemo } from "react";
import { useController, useFormContext } from "react-hook-form";

const BadgeSkill = ({ skill }: { skill: Skill }) => {
  const isMobile = useIsMobile()
  const { control } = useFormContext<SelfAssessmentCredentials>();
  const { field } = useController({
    name: "selectedSkills",
    control,
  });

  const currentSelected = field.value || [];

  const isSelected = useMemo(() => {
    return currentSelected.some((item) => item.id === skill.id);
  }, [currentSelected, skill.id]);

  const toggleSelection = () => {
    if (isSelected) {
      field.onChange(currentSelected.filter((item) => item.id !== skill.id));
    } else {
      field.onChange([...currentSelected, skill]);
    }
  };

  return (
    <Button
      type="button"
      size={isMobile ? "sm" : 'lg'}
      onClick={toggleSelection}
      variant={isSelected ? "outline" : "muted"}
    >
      { skill.name }
    </Button>
  )
};


export default BadgeSkill