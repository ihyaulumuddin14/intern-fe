import privateApi from "@/api/axiosInstance";
import { toCamel, toSnake } from "@/lib/case";
import { AnswerOption } from "@/schemas/quiz.schema";

export const startQuiz = async (careerSessionId: string) => {
  const response = await privateApi.post(
    `/career-sessions/${careerSessionId}/quiz/start`,
  );

  if (!response.data.success)
    throw new Error(
      response.data?.message || "Gagal memulai kuis, silakan coba lagi",
    );

  const camelData = toCamel(response.data);
  const questions = camelData.data.questions || [];

  const mappedQuestions = questions.map((question: any) => ({
    quizAnswerId: question.quizAnswerId,
    questionId: question.questionId,
    skillId: question.skillId,
    skillName: question.skillName,
    questionContent: question.questionContent,
    options: {
      optionA: {
        code: "a",
        content: question.optionA,
      },
      optionB: {
        code: "b",
        content: question.optionB,
      },
      optionC: {
        code: "c",
        content: question.optionC,
      },
      optionD: {
        code: "d",
        content: question.optionD,
      },
    },
  }));

  return {
    ...camelData,
    data: {
      ...camelData.data,
      questions: mappedQuestions,
    },
  };
};

export const answerQuestion = async (
  quizSessionId: string,
  credentials: {
    quizAnswerId: string;
    answer: AnswerOption;
  },
) => {
  const convertedPayload = toSnake(credentials);

  const response = await privateApi.patch(
    `/career-sessions/quiz/${quizSessionId}/answer`,
    convertedPayload,
  );

  if (!response.data.success)
    throw new Error(
      response.data?.message ||
        "Gagal menyimpan jawaban sementara, silakan coba lagi",
    );

  return toCamel(response.data);
};


export const submitQuiz = async (
  quizSessionId: string
) => {
  const response = await privateApi.post(
    `/career-sessions/quiz/${quizSessionId}/submit`
  )

  if (!response.data.success)
    throw new Error(
      response.data?.message ||
        "Gagal mengumpulkan kuis, silakan coba lagi",
    );

  return toCamel(response.data);
}