import { z } from "zod"
import { OnboardingSchema } from "./onboarding.schema";

export const ProfileSchema = OnboardingSchema.pick({
  fullName: true
});

export type ProfileCredentials = z.infer<typeof ProfileSchema>