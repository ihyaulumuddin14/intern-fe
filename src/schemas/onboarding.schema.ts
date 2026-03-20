import { z } from "zod";

export const EducationSchema = z
  .object({
    educationLevel: z.enum(
      ["SMA / SMK", "Diploma 3", "Diploma 4", "Sarjana (S1)"],
      { message: "Tingkat pendidikan harus diisi" },
    ),
    major: z.string().trim().optional(),
    institution: z.string().trim().optional(),
  })
  .superRefine((data, context) => {
    const needMajorAndInstitution = [
      "Diploma 3",
      "Diploma 4",
      "Sarjana (S1)",
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
  fullName: z.string().min(1, "Nama lengkap harus diisi"),
  education: EducationSchema,
  career: z.string().min(1, "Minat karir harus diisi"),
});

export type OnboardingCredentials = z.infer<typeof OnboardingSchema>
export type EducationCredentials = z.infer<typeof EducationSchema>
