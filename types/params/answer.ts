import { PaginatedSearchParams } from "../api";

/**
 * Params for creating a new answer
 */
export interface CreateAnswerParams {
  questionId: string;
  content: string;
}

/**
 * Params for getting answers with pagination
 */
export interface GetAnswersParams extends PaginatedSearchParams {
  questionId: string;
}

/**
 * Params for deleting an answer
 */
export interface DeleteAnswerParams {
  answerId: string;
}
