/**
 * Params for job search filtering
 */
export interface JobFilterParams {
  query: string;
  page: string;
}

/**
 * Params for global search
 */
export interface GlobalSearchParams {
  query: string;
  type: string | null;
}
