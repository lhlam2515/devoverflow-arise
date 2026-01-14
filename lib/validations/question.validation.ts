import { z } from "zod";

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(1, { error: "Title is required" })
    .max(100, { error: "Title cannot exceed 100 characters." }),
  content: z.string().min(1, { error: "Content is required" }),
  tags: z
    .array(
      z
        .string()
        .min(1, { error: "Tag cannot be empty." })
        .max(30, { error: "Tag cannot exceed 30 characters." })
    )
    .min(1, { error: "At least one tag is required." })
    .max(3, { error: "You can only select up to 3 tags." }),
});

export const EditQuestionSchema = AskQuestionSchema.extend({
  questionId: z.string().min(1, { error: "Question ID is required." }),
});

export const GetQuestionSchema = z.object({
  questionId: z.string().min(1, { error: "Question ID is required." }),
});

export const IncreaseViewsSchema = z.object({
  questionId: z.string().min(1, { error: "Question ID is required." }),
});

export const DeleteQuestionSchema = z.object({
  questionId: z.string().min(1, { error: "Question ID is required." }),
});
