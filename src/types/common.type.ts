import { UserLevel } from "@/schemas/career-sessions.schema"
import { EducationLevel } from "@/schemas/onboarding.schema"

export type Role = "user" | "admin"

export type StepDirection = "forward" | "backward"

export type CareerSessionStatus = "not_started" | "on_assessment" | "on_quiz" | "on_learning" | "complete"

export const PAYMENT_TYPE_LABEL: Record<string, string> = {
  creditCard: "Kartu Kredit",
  bankTransfer: "Transfer Bank",
  qris: "QRIS",
  gopay: "GoPay",
  shopeepay: "ShopeePay",
  otherQris: "QRIS",
}

export type UpdateProfilePayload = {
  fullName: string,
  educationLevel: EducationLevel,
  major: string,
  institution: string,
  graduationYear: number
}

export type QuizResult = {
  quizSessionId: string,
  skillsResult: SkillResult[],
  totalScore: number
}

export interface Recommendation {
  skillId: string;
  skillName: string;
  currentLevel: UserLevel;
  targetLevel: UserLevel;
  priority: number;
}
 
export interface SkillResult {
  skillId: string;
  skillName: string;
  userLevel: UserLevel;
  finalUserLevel: UserLevel;
  requiredLevel: UserLevel;
  gapLevel: number;
  skillScore: number;
  status: string;
  suggestionLevel: UserLevel[];
}
 
export interface CareerSession {
  careerSessionId: string;
  recommendations: Recommendation[];
  skillsResult: SkillResult[];
  totalScore: number;
}