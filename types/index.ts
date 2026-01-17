// Main types barrel export
// Entity types
export type {
  Author,
  User,
  BadgeCounts,
  Tag,
  Question,
  Answer,
  Collection,
  Job,
  Country,
  GlobalSearchedItem,
} from "./entities";

// API types
export type { RouteParams, PaginatedSearchParams } from "./api";

// Response types
export type {
  ActionResponse,
  SuccessResponse,
  ErrorResponse,
  APIErrorResponse,
  APIResponse,
  Badges,
} from "./global";

// Params types
export type {
  SignInWithOAuthParams,
  AuthCredentials,
  CreateQuestionParams,
  EditQuestionParams,
  GetQuestionParams,
  IncreaseViewsParams,
  DeleteQuestionParams,
  RecommendationParams,
  CreateAnswerParams,
  GetAnswersParams,
  DeleteAnswerParams,
  GetUserParams,
  GetUserQuestionsParams,
  GetUserAnswersParams,
  GetUserTagsParams,
  UpdateUserParams,
  CreateVoteParams,
  UpdateVoteCountParams,
  HasVotedParams,
  HasVotedResponse,
  CollectionBaseParams,
  GetTagQuestionsParams,
  CreateInteractionParams,
  UpdateReputationParams,
  JobFilterParams,
  GlobalSearchParams,
} from "./params";
