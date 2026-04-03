import StepFlowLayout from "@/components/layouts/StepFlowLayout";
import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding | SkillGap",
  description:
    "Lengkapi profil Anda dan mulai perjalanan pengembangan karier bersama SkillGap dengan diagnosis kesiapan yang akurat.",
};

const OnboardingLayout = ({ children }: { children: ReactNode }) => {
  return <StepFlowLayout>{children}</StepFlowLayout>;
};

export default OnboardingLayout;
