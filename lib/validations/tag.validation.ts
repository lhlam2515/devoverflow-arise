import { z } from "zod";

import { PaginatedSearchParamsSchema } from "./general.validation";

export const GetTagQuestionsSchema = PaginatedSearchParamsSchema.extend({
  tagId: z.string().min(1, { error: "Tag ID is required." }),
});
