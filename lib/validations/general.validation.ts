import { z } from "zod";

export const PaginatedSearchParamsSchema = z.object({
  page: z.number().positive().default(1),
  pageSize: z.number().positive().default(10),
  query: z.string().optional(),
  filter: z.string().optional(),
  sort: z.string().optional(),
});

export const GlobalSearchParamsSchema = z.object({
  query: z.string(),
  type: z.string().nullable().optional(),
});
