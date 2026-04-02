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

export type SkillResult = {
  finalUserLevel: UserLevel,
  skillId: string,
  skillName: string,
  skillScore: number,
  userLevel: UserLevel
}

export type QuizResult = {
  quizSessionId: string,
  skillsResult: SkillResult[],
  totalScore: number
}