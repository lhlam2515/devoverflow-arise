import { z } from "zod";

export const CreateInteractionSchema = z.object({
  action: z.enum([
    "view",
    "upvote",
    "downvote",
    "bookmark",
    "post",
    "edit",
    "delete",
    "search",
  ]),
  actionTarget: z.enum(["question", "answer"]),
  actionId: z.string().min(1, { error: "Action ID is required." }),
  authorId: z.string().min(1, { error: "Author ID is required." }),
});
