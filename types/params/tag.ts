import { PaginatedSearchParams } from "../api";

/**
 * Params for getting questions by tag
 */
export interface GetTagQuestionsParams extends Omit<
  PaginatedSearchParams,
  "filter"
> {
  tagId: string;
}
