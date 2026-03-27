import { UserLevel } from "@/schemas/career-sessions.schema";
import { Role } from "./common.type";
import { EducationLevel } from "@/schemas/onboarding.schema";

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
  id: string,
  name: string,
  desc: string,
  priority: number,
  requiredLevel: UserLevel
}