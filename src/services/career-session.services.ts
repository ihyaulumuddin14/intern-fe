import privateApi from "@/api/axiosInstance";
import { toCamel, toSnake } from "@/lib/case";
import {
  CreateCareerSessionCredentials,
  SelfAssessmentCredentials,
} from "@/schemas/career-sessions.schema";


export async function createCareerSession(
  credentials: CreateCareerSessionCredentials,
) {
  const convertedPayload = toSnake(credentials);

  const response = await privateApi.post("/career-sessions", convertedPayload);

  if (!response.data.success)
    throw new Error(
      response.data?.message || "Gagal membuat sesi, silakan coba lagi.",
    );

  return toCamel(response.data);
}

export async function createSelfAssessment(
  credentials: SelfAssessmentCredentials["skillRatings"],
  careerSessionId: string,
) {
  const convertedPayload = {
    skills: Object.values(credentials).map((skill) => toSnake(skill)),
  };

  const response = await privateApi.post(
    `/career-sessions/${careerSessionId}/assessment`,
    convertedPayload,
  );

  if (!response.data.success)
    throw new Error(
      response.data?.message ||
        "Gagal menyimpan data assessment, silakan coba lagi",
    );

  return toCamel(response.data);
}

export async function getAnalytics(
  careerSessionId: string
) {
  const response = await privateApi.get(`/career-sessions/${careerSessionId}/analytics`)

  if (!response.data.success)
    throw new Error(
      response.data?.message ||
        "Gagal mengambil data analitik, silakan coba lagi",
    );

  return toCamel(response.data);
}