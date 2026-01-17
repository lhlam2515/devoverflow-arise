import { Author } from "./user";

/**
 * Hydrated Answer entity (for display purposes)
 */
export interface Answer {
  _id: string;
  author: Author;
  content: string;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  question: string;
}
