import QuizContainer from "@/features/quiz/containers/QuizContainer";
import { toCamel } from "@/lib/case";
import { serverApi } from "@/lib/serverApi";
import { CareerSessionStatus } from "@/types/common.type";

const getCareerSessionStatus = async (
  careerSessionId: string,
): Promise<CareerSessionStatus> => {
  const api = await serverApi();
  const { data: careerSessionData } = await api.get(
    `/career-sessions/${careerSessionId}`,
  );
  const { status: careerSessionStatus } = toCamel(careerSessionData.data);
  return careerSessionStatus;
};

const QuizPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const careerSessionStatus = await getCareerSessionStatus(id);

  return <QuizContainer careerSessionId={id} careerSessionStatus={careerSessionStatus} />;
};

export default QuizPage;
