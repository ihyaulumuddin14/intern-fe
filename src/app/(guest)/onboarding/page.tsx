import OnboardingContainer from "@/features/onboarding/containers/OnboardingContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding | SkillGap",
  description:
    "Lengkapi profil Anda dan mulai perjalanan pengembangan karier bersama SkillGap dengan diagnosis kesiapan yang akurat.",
  keywords: ["onboarding", "profil", "pengembangan", "karier"],
};

const OnboardingPage = () => {
  return <OnboardingContainer />;
};

export default OnboardingPage;
