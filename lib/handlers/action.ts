"use server";

import { Session } from "next-auth";
import z, { ZodError, ZodType } from "zod";

import { auth } from "@/auth";
import { UnauthorizedError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";

type ActionOption<T> = {
  params?: T;
  schema?: ZodType<T>;
  authorize?: boolean;
};

// 1. Checking whether the schema and params are provided and validated.
// 2. Checking whether the user is authorized
// 3. Connecting to the database.
// 4. Returning the params and session if everything is successful.

async function action<T>({
  params,
  schema,
  authorize = false,
}: ActionOption<T>) {
  if (schema && params) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(
          z.flattenError(error).fieldErrors as Record<string, string[]>
        );
      } else {
        return new Error("Schema validation failed");
      }
    }
  }

  let session: Session | null = null;

  if (authorize) {
    session = await auth();

    if (!session) {
      return new UnauthorizedError();
    }
  }

  await dbConnect();

  return { params, session };
}

export default action;
