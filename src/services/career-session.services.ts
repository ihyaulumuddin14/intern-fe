import privateApi from "@/api/axiosInstance"
import { toCamel, toSnake } from "@/lib/case"
import { CreateCareerSessionCredentials, SelfAssessmentCredentials } from "@/schemas/career-sessions.schema"
import { CareerSessionStatus } from "@/types/common.type"
import { Skill, SkillRaw } from "@/types/entities.type"

export async function createCareerSession(credentials: CreateCareerSessionCredentials) {
  const convertedPayload = toSnake(credentials)

  const response = await privateApi.post(
    "/career-sessions",
    convertedPayload
  )

  if (!response.data.success) throw new Error(response.data?.message || "Gagal membuat sesi, silakan coba lagi.")

  return toCamel(response.data)
}


export async function createSelfAssessment(credentials: SelfAssessmentCredentials["skillRatings"], careerSessionId: string) {
  const convertedPayload = toSnake({
    skills: credentials
  })

  const response = await privateApi.post(
    `/career-sessions/${careerSessionId}/assessment`,
    convertedPayload
  )

  if (!response.data.success) throw new Error(response.data?.message || "Gagal menyimpan data assessment, silakan coba lagi")

  return toCamel(response.data)
}


export const startQuiz = async (careerSessionId: string) => {
  const response = await privateApi.post(`/career-sessions/quiz/${careerSessionId}/start`)
  if (!response.data.success) throw new Error(response.data?.message || "Gagal memulai kuis, silakan coba lagi")

  return toCamel(response.data)
}


export const getSkillsByCareerSessionId = async (careerSessionId: string): Promise<{ 
  status: CareerSessionStatus,
  skillsMapped: Skill[],
  careerName: string
}> => {
  const { data: sessionData } = await privateApi.get(`/career-sessions/${careerSessionId}`)
  const { status, careerId } = toCamel(sessionData.data)

  const { data: careerData } = await privateApi.get(`/careers/${careerId}`)
  const { skills, name: careerName } = toCamel(careerData.data)

  const skillsMapped = skills.map((skill: SkillRaw): Skill => ({
    id: skill.id,
    name: skill.name,
    description: skill.desc
  }))

  return { status, skillsMapped, careerName }
}