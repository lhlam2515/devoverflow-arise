/**
 * Params for creating a vote
 */
export interface CreateVoteParams {
  targetId: string;
  targetType: "question" | "answer";
  voteType: "upvote" | "downvote";
}

/**
 * Params for updating vote count
 */
export interface UpdateVoteCountParams extends CreateVoteParams {
  change: 1 | -1;
}

/**
 * Params for checking if user has voted
 */
export type HasVotedParams = Pick<CreateVoteParams, "targetId" | "targetType">;

/**
 * Response for has voted check
 */
export interface HasVotedResponse {
  hasUpvoted: boolean;
  hasDownvoted: boolean;
}
