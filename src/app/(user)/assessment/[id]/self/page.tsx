import SelfAssessmentContainer from "@/features/self-assessment/containers/SelfAssessmentContainer";
import { getSkillsByCareerSessionId } from "@/services/career-session.services";
import { redirect } from "next/navigation";

const SelfAssessmentPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { skillsMapped, status, careerName } = await getSkillsByCareerSessionId(id);

  if (status === "on_assessment") {
    return (
      <SelfAssessmentContai
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

  const targetPath = redirectPaths[status] || "/dashboard";
  const query = new URLSearchParams({ career_session_status: status }).toString();

  redirect(`${targetPath}?${query}`);
};

export default SelfAssessmentPage;