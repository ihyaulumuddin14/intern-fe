import privateApi from "@/api/axiosInstance"
import { API_URL } from "@/config/env"
import SelfAssessmentContainer from "@/features/assessment/containers/SelfAssessmentContainer"
import { toCamel } from "@/lib/case"
import { Skill } from "@/types/entities.type"

const getSkillsByCareerSessionId = async (id: string) => {
  const response = await privateApi.get(`${API_URL}/api/career-sessions/${id}`)
  return toCamel(response.data.data)
}

const SelfAssessmentPage = async ({
  params
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const skills: Skill[] = await getSkillsByCareerSessionId(id)

  return <SelfAssessmentContainer skills={skills} />
}

export default SelfAssessmentPage