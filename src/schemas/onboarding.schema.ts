import { z } from "zod";

export const EducationSchema = z
  .object({
    educationLevel: z.enum(
      ["sma", "smk", "d3", "d4", "s1"],
      { message: "Tingkat pendidikan harus diisi" },
    ),
    major: z.string().trim().optional(),
    institution: z.string().trim().optional(),
  })
  .superRefine((data, context) => {
    const needMajorAndInstitution = [
      "d3",
      "d4",
      "s1",
    ].includes(data.educationLevel);

    if (needMajorAndInstitution && !data.major) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["major"],
        message: "Jurusan harus diisi",
      });
    }

    if (needMajorAndInstitution && !data.institution) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["institution"],
        message: "Institusi harus diisi",
      });
    }
  });

export const OnboardingSchema = z.object({
  fullname: z.string().min(1, "Nama lengkap harus diisi"),
  education: EducationSchema,
  career: z.object({
    id: z.string().min(1, "Id karier harus ada"),
    name: z.string().min(1, "Nama karier harus ada"),
    description: z.string().min(1, "Deskripsi karier harus ada")
  }),
});

export type OnboardingCredentials = z.infer<typeof OnboardingSchema>
export type EducationCredentials = z.infer<typeof EducationSchema>
export type EducationLevel = z.infer<typeof EducationSchema.shape.educationLevel>;

export const EDUCATION_LEVEL_LABEL: Record<EducationLevel, string> = {
  sma: "SMA",
  smk: "SMK",
  d3: "Diploma 3 (D3)",
  d4: "Diploma 4 (D4)",
  s1: "Sarjana (S1)",
};

export const EDUCATION_LEVEL_OPTIONS = EducationSchema.shape.educationLevel.options;
