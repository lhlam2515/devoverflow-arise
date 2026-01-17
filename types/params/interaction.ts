import mongoose from "mongoose";

import { IInteractionDoc } from "@/database/interaction.model";

/**
 * Params for creating an interaction
 */
export interface CreateInteractionParams {
  action:
    | "view"
    | "upvote"
    | "downvote"
    | "bookmark"
    | "post"
    | "edit"
    | "delete"
    | "search";
  actionTarget: "question" | "answer";
  actionId: string;
  authorId: string;
}

/**
 * Params for updating user reputation
 */
export interface UpdateReputationParams {
  interaction: IInteractionDoc;
  session: mongoose.ClientSession;
  performerId: string;
  authorId: string;
}
