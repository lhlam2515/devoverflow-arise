import { z } from "zod";

export const CreateVoteSchema = z.object({
  targetId: z.string().min(1, { error: "Target ID is required." }),
  targetType: z.enum(["question", "answer"]),
  voteType: z.enum(["upvote", "downvote"]),
});

export const UpdateVoteCountSchema = CreateVoteSchema.extend({
  change: z.number().int().min(-1).max(1),
});

export const HasVotedSchema = CreateVoteSchema.pick({
  targetId: true,
  targetType: true,
});
