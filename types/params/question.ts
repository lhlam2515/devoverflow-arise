/**
 * Params for creating a new question
 */
export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
}

/**
 * Params for editing an existing question
 */
export interface EditQuestionParams extends CreateQuestionParams {
  questionId: string;
}

/**
 * Params for getting a single question
 */
export interface GetQuestionParams {
  questionId: string;
}

/**
 * Params for increasing question views
 */
export interface IncreaseViewsParams {
  questionId: string;
}

/**
 * Params for deleting a question
 */
export interface DeleteQuestionParams {
  questionId: string;
}

/**
 * Params for recommendation engine
 */
export interface RecommendationParams {
  userId: string;
  query?: string;
  skip: number;
  limit: number;
}
