// Params types barrel export
export type { SignInWithOAuthParams, AuthCredentials } from "./auth";
export type {
  CreateQuestionParams,
  EditQuestionParams,
  GetQuestionParams,
  IncreaseViewsParams,
  DeleteQuestionParams,
  RecommendationParams,
} from "./question";
export type {
  CreateAnswerParams,
  GetAnswersParams,
  DeleteAnswerParams,
} from "./answer";
export type {
  GetUserParams,
  GetUserQuestionsParams,
  GetUserAnswersParams,
  GetUserTagsParams,
  UpdateUserParams,
} from "./user";
export type {
  CreateVoteParams,
  UpdateVoteCountParams,
  HasVotedParams,
  HasVotedResponse,
} from "./vote";
export type { CollectionBaseParams } from "./collection";
export type { GetTagQuestionsParams } from "./tag";
export type {
  CreateInteractionParams,
  UpdateReputationParams,
} from "./interaction";
export type { JobFilterParams, GlobalSearchParams } from "./search";
