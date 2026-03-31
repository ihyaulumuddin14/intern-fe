import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from '@/components/ui/field';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { UserLevel } from '@/schemas/career-sessions.schema';

const RadioLevel = ({
  title,
  description,
  userLevel
}: {
  title: string;
  description?: string | undefined;
  userLevel: Exclude<UserLevel, "no_experience">;
}) => {
  return (
    <FieldLabel
      key={userLevel}
      htmlFor={userLevel}
      className="py-2 md:py-4 px-5 md:px-10 border border-neutral-40 rounded-xl! md:rounded-2xl! cursor-pointer"
    >
      <Field
        orientation={"horizontal"}
        className="gap-7 flex items-center! w-full p-0!"
      >
        <RadioGroupItem className="size-5 border-2 border-neutral-60" value={userLevel} id={userLevel}/>
        <FieldContent className="flex flex-col gap-1">
          <FieldTitle className="font-medium text-xs sm:text-base md:text-xl text-neutral-100">{title}</FieldTitle>
          {description && (
            <FieldDescription className="font-normal text-xs sm:text-base md:text-xl text-neutral-60 ">{description}</FieldDescription>
          )}
        </FieldContent>
      </Field>
    </FieldLabel>
  )
}

export default RadioLevel