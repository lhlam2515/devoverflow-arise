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
