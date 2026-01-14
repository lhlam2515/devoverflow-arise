"use server";

import { Question, Answer, User, Tag } from "@/database";
import action from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import { GlobalSearchParamsSchema } from "@/lib/validations";
import { GlobalSearchParams } from "@/types/action";
import { ErrorResponse } from "@/types/global";

export async function globalSearch(params: GlobalSearchParams) {
  const validationResult = await action({
    params,
    schema: GlobalSearchParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { query, type } = validationResult.params!;
  const regexQuery = new RegExp(query, "i");

  let results = [];

  const modelsAndTypes = [
    { model: Question, searchField: "title", type: "question" },
    { model: User, searchField: "name", type: "user" },
    { model: Answer, searchField: "content", type: "answer" },
    { model: Tag, searchField: "name", type: "tag" },
  ];

  const typeLower = type?.toLowerCase();

  const SearchableTypes = ["question", "answer", "user", "tag"];

  try {
    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // If no type is specified, search in all models
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title:
              type === "answer"
                ? `Answers containing ${query}`
                : item[searchField],
            type,
            id: type === "answer" ? item.question : item._id,
          }))
        );
      }
    } else {
      // Search in the specified model type
      const modelInfo = modelsAndTypes.find((item) => item.type === type);

      if (!modelInfo) {
        throw new Error("Invalid search type");
      }

      const queryResults = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(8);

      results = queryResults.map((item) => ({
        title:
          type === "answer"
            ? `Answers containing ${query}`
            : item[modelInfo.searchField],
        type,
        id: type === "answer" ? item.question : item._id,
      }));
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(results)),
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
