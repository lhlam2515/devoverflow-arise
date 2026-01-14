import { z } from "zod";

export const CollectionBaseSchema = z.object({
  questionId: z.string().min(1, { error: "Question ID is required." }),
});
