import SelfAssessmentContainer from "@/features/self-assessment/containers/SelfAssessmentContainer";
import { toCamel } from "@/lib/case";
import { serverApi } from "@/lib/serverApi";
import { CareerSessionStatus } from "@/types/common.type";
import { Skill, SkillRaw } from "@/types/entities.type";
import { redirect } from "next/navigation";

export const getSkillsByCareerSessionId = async (careerSessionId: string): Promise<{ 
  careerSessionStatus: CareerSessionStatus,
  skillsMapped: Skill[],
  careerName: string
}> => {
  const api = await serverApi()

  const { data: careerSessionData } = await api.get(`/career-sessions/${careerSessionId}`)
  const { status: careerSessionStatus, careerId } = toCamel(careerSessionData.data)
  const { data: careerData } = await api.get(`/careers/${careerId}`)
  const { skills, name: careerName } = toCamel(careerData.data)

  const skillsMapped = skills.map((skill: SkillRaw): Skill => ({
    id: skill.skillId,
    name: skill.name,
    description: skill.desc
  }))

  return { careerSessionStatus, skillsMapped, careerName }
}


const SelfAssessmentPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { skillsMapped, careerSessionStatus, careerName } = await getSkillsByCareerSessionId(id);

  if (careerSessionStatus === "on_assessment") {
    return (
      <SelfAssessmentContainer
        careerSessionId={id}
        skills={skillsMapped}
        careerName={careerName}
      />
    );
  }

  const redirectPaths: Record<string, string> = {
    on_quiz: `/assessment/${id}/quiz`,
    not_started: "/dashboard",
    on_learning: "/dashboard",
    complete: "/dashboard",
  };

  const targetPath = redirectPaths[careerSessionStatus] || "/dashboard";
  const query = new URLSearchParams({ career_session_status: careerSessionStatus }).toString();

  redirect(`${targetPath}?${query}`);
};

export default SelfAssessmentPage;
