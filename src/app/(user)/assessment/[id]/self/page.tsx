import privateApi from "@/api/axiosInstance"
import { API_URL } from "@/config/env"
import SelfAssessmentContainer from "@/features/assessment/containers/SelfAssessmentContainer"
import { Skill } from "@/types/entities.type"

const getSkillsByCareerSessionId = async (id: string) => {
  const response = await privateApi.get(`${API_URL}/api/career-sessions/${id}`)
  return response.data.data
}


const skills: Skill[] = [
  { id: "1", name: "HTML", description: "Lorem ipsum" },
  { id: "2", name: "CSS", description: "Lorem ipsum" },
  { id: "3", name: "JavaScript Programming", description: "Lorem ipsum" },
  { id: "4", name: "React.js", description: "Lorem ipsum" },
  { id: "5", name: "Next.js", description: "Lorem ipsum" },
  { id: "6", name: "Responsive Design", description: "Lorem ipsum" },
  { id: "7", name: "Git Version Control", description: "Lorem ipsum" },
  { id: "8", name: "REST API", description: "Lorem ipsum" },
  { id: "9", name: "Debugging", description: "Lorem ipsum" },
  { id: "10", name: "Typescript Programming", description: "Lorem ipsum" },
]

const SelfAssessmentPage = async ({
  params
}: {
  params: Promise<{ id: string }>
}) => {
  // const { id } = await params
  // const skills: Skill[] = await getSkillsByCareerSessionId(id)
  // const skills: Skill[] = 
  await new Promise(res => setTimeout(res, 2000))

  return <SelfAssessmentContainer skills={skills} />
}

export default SelfAssessmentPage