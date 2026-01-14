// Authentication schemas
export {
  SignInSchema,
  SignUpSchema,
  AccountSchema,
  SigninWithOAuthSchema,
} from "./auth.validation";

// Question schemas
export {
  AskQuestionSchema,
  EditQuestionSchema,
  GetQuestionSchema,
  IncreaseViewsSchema,
  DeleteQuestionSchema,
} from "./question.validation";

// Answer schemas
export {
  AnswerSchema,
  CreateAnswerSchema,
  GetAnswersSchema,
  DeleteAnswerSchema,
  AIAnswerSchema,
} from "./answer.validation";

// User schemas
export {
  UserSchema,
  GetUserSchema,
  GetUserQuestionsSchema,
  GetUserAnswersSchema,
  GetUserTagsSchema,
  ProfileSchema,
  UpdateUserSchema,
} from "./user.validation";

// Vote schemas
export {
  CreateVoteSchema,
  UpdateVoteCountSchema,
  HasVotedSchema,
} from "./vote.validation";

// Collection schemas
export { CollectionBaseSchema } from "./collection.validation";

// Tag schemas
export { GetTagQuestionsSchema } from "./tag.validation";

// Interaction schemas
export { CreateInteractionSchema } from "./interaction.validation";

// General/shared schemas
export {
  PaginatedSearchParamsSchema,
  GlobalSearchParamsSchema,
} from "./general.validation";
