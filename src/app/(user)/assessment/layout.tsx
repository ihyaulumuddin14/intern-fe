import StepFlowLayout from "@/components/layouts/StepFlowLayout";
import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Penilaian Kompetensi | SkillGap",
  description:
    "Ikuti penilaian kompetensi diri untuk mendapatkan diagnosis kesiapan karier dan rekomendasi pengembangan yang disesuaikan.",
  keywords: ["penilaian", "kompetensi", "diagnosis", "assessment"],
};

const AssessmentLayout = ({ children }: { children: ReactNode }) => {
  return <StepFlowLayout>{children}</StepFlowLayout>;
};

export default AssessmentLayout;
