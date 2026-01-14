import { z } from "zod";

import { PaginatedSearchParamsSchema } from "./general.validation";

export const AnswerSchema = z.object({
  content: z
    .string()
    .min(100, { error: "Answer has to have more than 100 characters." }),
});

export const CreateAnswerSchema = AnswerSchema.extend({
  questionId: z.string().min(1, { error: "Question ID is required." }),
});

export const GetAnswersSchema = PaginatedSearchParamsSchema.extend({
  questionId: z.string().min(1, { error: "Question ID is required." }),
});

export const DeleteAnswerSchema = z.object({
  answerId: z.string().min(1, { error: "Answer ID is required." }),
});

export const AIAnswerSchema = z.object({
  question: z
    .string()
    .min(5, { error: "Question is required." })
    .max(130, { error: "Question cannot exceed 130 characters." }),
  content: z
    .string()
    .min(100, { error: "Answer has to have more than 100 characters." }),
  userAnswer: z.string().optional(),
});
