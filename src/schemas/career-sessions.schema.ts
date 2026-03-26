import { z } from "zod"

export const SkillLevelEnum = z.enum([
  "no_experience",
  "beginner",
  "intermediate",
  "expert"
])

export const SKILL_LEVEL_LABELS: Record<z.infer<typeof SkillLevelEnum>, string> = {
  no_experience: "No Experience",
  beginner: "Beginner",
  intermediate: "Intermediate",
  expert: "Expert",
}

export const SKILL_LEVEL_TO_NUMBER: Record<string, number> = {
  beginner: 1,
  intermediate: 2,
  expert: 3,
};

export const NUMBER_TO_SKILL_LEVEL: Record<number, SkillLevel> = {
  1: "beginner",
  2: "intermediate",
  3: "expert",
};

export const CreateCareerSessionSchema = z.object({
  careerId: z
    .string()
})

export const SelfAssessmentSchema = z.object({
  selectedSkills: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string()
      })
    )
    .min(1, "Pilih minimal 1 skill"),
  skillRatings: z
    .array(
      z.object({
        skillId: z.string(),
        level: SkillLevelEnum
      })
    )
}).refine(data => {
  const selectedIds = data.selectedSkills.map(s => s.id);
  const ratedIds = data.skillRatings.map(r => r.skillId);
  return selectedIds.every(id => ratedIds.includes(id));
}, {
  message: "Semua skill wajib diberikan penilaian tingkat keahlian",
  path: ["skillRatings"],
})

export type CreateCareerSessionCredentials = z.infer<typeof CreateCareerSessionSchema>
export type SelfAssessmentCredentials = z.infer<typeof SelfAssessmentSchema>
export type SkillRating = SelfAssessmentCredentials["skillRatings"][number]
export type SkillLevel = z.infer<typeof SkillLevelEnum>