import SelfAssessmentContainer from "@/features/assessment/containers/SelfAssessmentContainer"
import { getSkillsByCareerSessionId } from "@/services/career-session.services"
import { Skill } from "@/types/entities.type"

const SelfAssessmentPage = async ({
  params
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const skills: Skill[] = await getSkillsByCareerSessionId(id)

  return <SelfAssessmentContainer careerSessionId={id} skills={skills} />
}

export default SelfAssessmentPage