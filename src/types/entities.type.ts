import { UserLevel } from "@/schemas/career-sessions.schema";
import { Role } from "./common.type";
import { EducationLevel } from "@/schemas/onboarding.schema";
import { AnswerOption } from "@/schemas/quiz.schema";

export type User = {
  fullName: string;
  userName: string;
  email: string;
  role: Role;
  educationLevel: EducationLevel;
  major?: string;
  institution?: string;
  graduationYear?: number;
  isPremium: boolean;
};

export type Career = {
  id: string,
  name: string,
  description: string
}

export type Skill = {
  id: string,
  name: string,
  description: string
}

export type SkillRaw = {
  skillId: string,
  name: string,
  desc: string,
  priority: number,
  requiredLevel: UserLevel
}

export type Option = {
  code: AnswerOption,
  content: string
}

export type Question = {
  quizAnswerId: string,
  questionId: string,
  skillId: string,
  skillName: string,
  questionContent: string,
  options: {
    optionA: Option,
    optionB: Option,
    optionC: Option,
    optionD: Option,
  }
}