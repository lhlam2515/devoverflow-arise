import { Author } from "./user";
import { Tag } from "./tag";

/**
 * Hydrated Question entity (for display purposes)
 */
export interface Question {
  _id: string;
  title: string;
  content: string;
  tags: Tag[];
  author: Author;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  answers: number;
  views: number;
}
