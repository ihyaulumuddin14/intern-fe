import StepFlowLayout from "@/components/layouts/StepFlowLayout";
import { ReactNode } from "react";

const AssessmentLayout = ({ children }: { children: ReactNode }) => {
  return <StepFlowLayout>{children}</StepFlowLayout>;
};

export default AssessmentLayout;
