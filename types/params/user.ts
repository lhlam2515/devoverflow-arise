import { PaginatedSearchParams } from "../api";

/**
 * Params for getting a single user
 */
export interface GetUserParams {
  userId: string;
}

/**
 * Params for getting user's questions
 */
export interface GetUserQuestionsParams extends Omit<
  PaginatedSearchParams,
  "query" | "filter" | "sort"
> {
  userId: string;
}

/**
 * Params for getting user's answers
 */
export interface GetUserAnswersParams extends Omit<
  PaginatedSearchParams,
  "query" | "filter" | "sort"
> {
  userId: string;
}

/**
 * Params for getting user's tags
 */
export interface GetUserTagsParams {
  userId: string;
}

/**
 * Params for updating user profile
 */
export interface UpdateUserParams {
  name?: string;
  username?: string;
  email?: string;
  image?: string;
  password?: string;
}
