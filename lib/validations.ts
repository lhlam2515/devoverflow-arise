import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .email({ error: "Please provide a valid email address." })
    .min(1, { error: "Email is required" }),

  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters long. " })
    .max(100, { error: "Password cannot exceed 100 characters." }),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { error: "Username must be at least 3 characters long." })
    .max(30, { error: "Username cannot exceed 30 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      error: "Username can only contain letters, numbers, and underscores.",
    }),

  name: z
    .string()
    .min(1, { error: "Name is required." })
    .max(50, { error: "Name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, {
      error: "Name can only contain letters and spaces.",
    }),

  email: z
    .email({ error: "Please provide a valid email address." })
    .min(1, { error: "Email is required." }),

  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters long." })
    .max(100, { error: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      error: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      error: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { error: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Password must contain at least one special character.",
    }),
});

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(1, { error: "Title is required" })
    .max(100, { error: "Title cannot exceed 100 characters." }),

  content: z.string().min(1, { error: "Content is required" }),

  tags: z
    .array(
      z
        .string()
        .min(1, { error: "Tag cannot be empty." })
        .max(30, { error: "Tag cannot exceed 30 characters." })
    )
    .min(1, { error: "At least one tag is required." })
    .max(3, { error: "You can only select up to 3 tags." }),
});

export const UserSchema = z.object({
  name: z.string().min(1, { error: "Name is required." }),
  username: z
    .string()
    .min(3, { error: "Username must be at least 3 characters long." }),
  email: z.email({ error: "Please provide a valid email address." }),
  bio: z.string().optional(),
  image: z.string().url({ error: "Please provide a valid URL." }).optional(),
  location: z.string().optional(),
  portfolio: z.url({ error: "Please provide a valid URL." }).optional(),
  reputation: z.number().optional(),
});

export const AccountSchema = z.object({
  userId: z.string().min(1, { error: "User ID is required." }),
  name: z.string().min(1, { error: "Name is required." }),
  image: z.url({ error: "Please provide a valid URL." }).optional(),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters long." })
    .max(100, { error: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      error: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      error: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { error: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Password must contain at least one special character.",
    })
    .optional(),
  provider: z.string().min(1, { error: "Provider is required." }),
  providerAccountId: z
    .string()
    .min(1, { error: "Provider Account ID is required." }),
});

export const SigninWithOAuthSchema = z.object({
  provider: z.enum(["google", "github"]),
  providerAccountId: z
    .string()
    .min(1, { error: "Provider Account ID is required." }),
  user: z.object({
    name: z.string().min(1, { error: "Name is required." }),
    username: z
      .string()
      .min(3, { error: "Username must be at least 3 characters long." }),
    email: z.email({ error: "Please provide a valid email address." }),
    image: z.url({ error: "Invalid image URL." }).optional(),
  }),
});

export const EditQuestionSchema = AskQuestionSchema.extend({
  questionId: z.string().min(1, { error: "Question ID is required." }),
});

export const GetQuestionSchema = z.object({
  questionId: z.string().min(1, { error: "Question ID is required." }),
});

export const PaginatedSearchParamsSchema = z.object({
  page: z.number().positive().default(1),
  pageSize: z.number().positive().default(10),
  query: z.string().optional(),
  filter: z.string().optional(),
  sort: z.string().optional(),
});

export const GetTagQuestionsSchema = PaginatedSearchParamsSchema.extend({
  tagId: z.string().min(1, { error: "Tag ID is required." }),
});

export const IncreaseViewsSchema = z.object({
  questionId: z.string().min(1, { error: "Question ID is required." }),
});

export const AnswerSchema = z.object({
  content: z
    .string()
    .min(100, { error: "Answer has to have more than 100 characters." }),
});

export const CreateAnswerSchema = AnswerSchema.extend({
  questionId: z.string().min(1, { error: "Question ID is required." }),
});

export const GetAnswersSchema = PaginatedSearchParamsSchema.extend({
  questionId: z.string().min(1, { error: "Question ID is required." }),
});

export const AIAnswerSchema = z.object({
  question: z
    .string()
    .min(5, { error: "Question is required." })
    .max(130, { error: "Question cannot exceed 130 characters." }),
  content: z
    .string()
    .min(100, { error: "Answer has to have more than 100 characters." }),
  userAnswer: z.string().optional(),
});

export const CreateVoteSchema = z.object({
  targetId: z.string().min(1, { error: "Target ID is required." }),
  targetType: z.enum(["question", "answer"]),
  voteType: z.enum(["upvote", "downvote"]),
});

export const UpdateVoteCountSchema = CreateVoteSchema.extend({
  change: z.number().int().min(-1).max(1),
});

export const HasVotedSchema = CreateVoteSchema.pick({
  targetId: true,
  targetType: true,
});

export const CollectionBaseSchema = z.object({
  questionId: z.string().min(1, { error: "Question ID is required." }),
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

export const CreateInteractionSchema = z.object({
  action: z.enum([
    "view",
    "upvote",
    "downvote",
    "bookmark",
    "post",
    "edit",
    "delete",
    "search",
  ]),
  actionTarget: z.enum(["question", "answer"]),
  actionId: z.string().min(1, { error: "Action ID is required." }),
  authorId: z.string().min(1, { error: "Author ID is required." }),
});

export const DeleteQuestionSchema = z.object({
  questionId: z.string().min(1, { error: "Question ID is required." }),
});

export const DeleteAnswerSchema = z.object({
  answerId: z.string().min(1, { error: "Answer ID is required." }),
});

export const GlobalSearchParamsSchema = z.object({
  query: z.string(),
  type: z.string().nullable().optional(),
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
