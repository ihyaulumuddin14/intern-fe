import { z } from "zod";

export const AnswerOptionEnum = z.enum(["a", "b", "c", "d"]);

export const QuizAnswerSchema = z.object({
  quizAnswerId: z.string(),
  userAnswer: AnswerOptionEnum.optional().refine(value => value !== undefined, {
    message: "Jawaban tidak boleh kosong"
  })
})

export const QuizFormSchema = z.object({
  answers: z.array(QuizAnswerSchema)
}).refine(data => data.answers.every(answer => answer.userAnswer !== undefined), {
  message: "Semua pertanyaan harus dijawab"
})

export type QuizFormCredentials = z.infer<typeof QuizFormSchema>
export type QuizAnswerCredentials = z.infer<typeof QuizAnswerSchema>
export type AnswerOption = z.infer<typeof AnswerOptionEnum>