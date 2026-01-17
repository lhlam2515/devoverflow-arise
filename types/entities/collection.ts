import { Author } from "./user";
import { Question } from "./question";

/**
 * Hydrated Collection entity (for display purposes)
 */
export interface Collection {
  _id: string;
  author: string | Author;
  question: Question;
}
