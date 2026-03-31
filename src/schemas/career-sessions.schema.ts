import { z } from "zod"

export const UserLevelEnum = z.enum([
  "no_experience",
  "beginner",
  "intermediate",
  "expert"
])

export const USER_LEVEL_LABELS: Record<Exclude<UserLevel, "no_experience">, {
  title: string;
  description?: string;
}> = {
  beginner: {
    title: "Pemula",
    description: "Baru saja mulai menjelajahi"
  },
  intermediate: {
    title: "Menengah",
    description: "Menguasai dasar-dasarnya, sedang mengerjakan proyek"
  },
  expert: {
    title: "Berpengalaman",
    description: "Sangat berpengalaman, ingin mengkhususkan diri dalam bidang tertentu"
  }
}

export const USER_LEVEL_OPTIONS = Object.entries(USER_LEVEL_LABELS).map(([key, value]) => ({
  userLevel: key as Exclude<UserLevel, "no_experience">,
  ...value
}))

export const USER_LEVEL_TO_NUMBER: Record<string, number> = {
  beginner: 1,
  intermediate: 2,
  expert: 3,
};

export const NUMBER_TO_USER_LEVEL: Record<number, UserLevel> = {
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
        userLevel: UserLevelEnum
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
export type UserLevel = z.infer<typeof UserLevelEnum>