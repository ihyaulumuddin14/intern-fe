import { EducationLevel, Role } from "./common.type";

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