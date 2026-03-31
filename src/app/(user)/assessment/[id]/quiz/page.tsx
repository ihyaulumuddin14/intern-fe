import QuizContainer from "@/features/quiz/containers/QuizContainer"

const QuizPage = async ({
  params
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;
  return (
    <QuizContainer careerSessionId={id} />
  )
}

export default QuizPage