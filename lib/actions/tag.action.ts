import { FilterQuery } from "mongoose";

import { Question, Tag } from "@/database";
import action from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import dbConnect from "@/lib/mongoose";
import {
  GetTagQuestionsSchema,
  PaginatedSearchParamsSchema,
} from "@/lib/validations";
import { GetTagQuestionsParams } from "@/types/action";
import {
  PaginatedSearchParams,
  ActionResponse,
  _Tag,
  ErrorResponse,
  _Question,
} from "@/types/global";

export async function getTags(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ tags: _Tag[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = validationResult.params!;
  const skip = (page - 1) * pageSize;
  const limit = pageSize;

  const filterQuery: FilterQuery<typeof Tag> = {};

  if (query) {
    filterQuery.$or = [
      {
        name: { $regex: query, $options: "i" },
      },
    ];
  }

  let sortCriteria = {};

  switch (filter) {
    case "popular":
      sortCriteria = { questions: -1 };
      break;
    case "recent":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "name":
      sortCriteria = { name: 1 };
      break;
    default:
      sortCriteria = { questions: -1 };
      break;
  }

  try {
    const totalTags = await Tag.countDocuments(filterQuery);

    const tags = await Tag.find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalTags > skip + tags.length;

    return {
      success: true,
      data: {
        tags: JSON.parse(JSON.stringify(tags)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getTagQuestions(
  params: GetTagQuestionsParams
): Promise<
  ActionResponse<{ tag: _Tag; questions: _Question[]; isNext: boolean }>
> {
  const validationResult = await action({
    params,
    schema: GetTagQuestionsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { tagId, page = 1, pageSize = 10, query } = validationResult.params!;
  const skip = (page - 1) * pageSize;
  const limit = pageSize;

  try {
    const tag = await Tag.findById(tagId);
    if (!tag) throw new Error("Tag not found");

    const filterQuery: FilterQuery<typeof Question> = {
      tags: { $in: [tagId] },
    };

    if (query) {
      filterQuery.title = { $regex: query, $options: "i" };
    }

    const totalQuestions = await Question.countDocuments(filterQuery);

    const questions = await Question.find(filterQuery)
      .select("_id title views answers upvotes downvotes author createdAt")
      .populate([
        { path: "author", select: "name image" },
        { path: "tags", select: "name" },
      ])
      .skip(skip)
      .limit(limit);

    const isNext = totalQuestions > skip + questions.length;

    return {
      success: true,
      data: {
        tag: JSON.parse(JSON.stringify(tag)),
        questions: JSON.parse(JSON.stringify(questions)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getTopTags(): Promise<ActionResponse<_Tag[]>> {
  try {
    await dbConnect();

    const tags = await Tag.find().sort({ questions: -1 }).limit(5);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(tags)),
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
