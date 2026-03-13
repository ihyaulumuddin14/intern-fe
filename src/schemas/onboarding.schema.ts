import { z } from "zod";

export const EducationSchema = z
  .object({
    education_level: z.enum(
      ["SMA", "SMK", "Diploma 3", "Diploma 4", "Sarjana (S1)"],
      { message: "Pilih salah satu tingkat pendidikan" },
    ),
    major: z.string().trim().optional(),
    institution: z.string().trim().optional(),
  })
  .superRefine((data, context) => {
    const needMajorAndInstitution = [
      "Diploma 3",
      "Diploma 4",
      "Sarjana (S1)",
    ].includes(data.education_level);

    if (needMajorAndInstitution && !data.major) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["major"],
        message: "Jurusan wajib diisi",
      });
    }

    if (needMajorAndInstitution && !data.institution) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["institution"],
        message: "Institusi wajib diisi",
      });
    }
  });

export const OnboardingSchema = z.object({
  full_name: z.string().min(1, "Nama lengkap wajib diisi"),
  education: EducationSchema,
  career: z.string().min(1, "Minat karir wajib diisi"),
});

export type OnboardingCredentials = z.infer<typeof OnboardingSchema>
export type EducationCredentials = z.infer<typeof EducationSchema>
