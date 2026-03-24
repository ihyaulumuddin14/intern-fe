import StepFlowLayout from "@/components/layouts/StepFlowLayout";
import { ReactNode } from "react";

const OnboardingLayout = ({ children }: { children: ReactNode }) => {
  return <StepFlowLayout>{children}</StepFlowLayout>;
};

export default OnboardingLayout;
