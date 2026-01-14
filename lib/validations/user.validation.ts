import { z } from "zod";

import { PaginatedSearchParamsSchema } from "./general.validation";

export const UserSchema = z.object({
  name: z.string().min(1, { error: "Name is required." }),
  username: z
    .string()
    .min(3, { error: "Username must be at least 3 characters long." }),
  email: z.email({ error: "Please provide a valid email address." }),
  bio: z.string().optional(),
  image: z.url({ error: "Please provide a valid URL." }).optional(),
  location: z.string().optional(),
  portfolio: z.url({ error: "Please provide a valid URL." }).optional(),
  reputation: z.number().optional(),
});

export const GetUserSchema = z.object({
  userId: z.string().min(1, { error: "User ID is required." }),
});

export const GetUserQuestionsSchema = PaginatedSearchParamsSchema.extend({
  userId: z.string().min(1, { error: "User ID is required." }),
});

export const GetUserAnswersSchema = PaginatedSearchParamsSchema.extend({
  userId: z.string().min(1, { error: "User ID is required." }),
});

export const GetUserTagsSchema = z.object({
  userId: z.string().min(1, { error: "User ID is required." }),
});

export const ProfileSchema = z.object({
  name: z
    .string()
    .min(3, {
      error: "Name must be at least 3 characters.",
    })
    .max(130, { error: "Name musn't be longer then 130 characters." }),
  username: z
    .string()
    .min(3, { error: "username musn't be longer then 100 characters." }),
  portfolio: z.url({ error: "Please provide valid URL" }),
  location: z.string().min(3, { error: "Please provide proper location" }),
  bio: z.string().min(3, {
    error: "Bio must be at least 3 characters.",
  }),
});

export const UpdateUserSchema = z.object({
  name: z
    .string()
    .min(3, {
      error: "Name must be at least 3 characters.",
    })
    .max(130, { error: "Name musn't be longer then 130 characters." }),
  username: z
    .string()
    .min(3, { error: "username musn't be longer then 100 characters." }),
  portfolio: z.url({ error: "Please provide valid URL" }),
  location: z.string().min(3, { error: "Please provide proper location" }),
  bio: z.string().min(3, {
    error: "Bio must be at least 3 characters.",
  }),
});
