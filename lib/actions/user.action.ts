"use server";

import mongoose, { FilterQuery, PipelineStage } from "mongoose";
import { cache } from "react";

import { Answer, Question, User } from "@/database";
import action from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import { assignBadges } from "@/lib/utils";
import {
  GetUserAnswersSchema,
  GetUserQuestionsSchema,
  GetUserSchema,
  GetUserTagsSchema,
  PaginatedSearchParamsSchema,
  UpdateUserSchema,
} from "@/lib/validations";
import {
  ActionResponse,
  Answer as AnswerType,
  Badges,
  ErrorResponse,
  GetUserAnswersParams,
  GetUserParams,
  GetUserQuestionsParams,
  GetUserTagsParams,
  PaginatedSearchParams,
  Question as QuestionType,
  UpdateUserParams,
  User as UserType,
} from "@/types";

export async function getUsers(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ users: UserType[]; isNext: boolean }>> {
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

  const filterQuery: FilterQuery<typeof User> = {};

  if (query) {
    filterQuery.$or = [
      { name: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } },
    ];
  }

  let sortCriteria = {};

  switch (filter) {
    case "newest":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "popular":
      sortCriteria = { reputation: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalUser = await User.countDocuments(filterQuery);

    const users = await User.find(filterQuery)
      .skip(skip)
      .limit(limit)
      .sort(sortCriteria);

    const isNext = totalUser > skip + users.length;

    return {
      success: true,
      data: { users: JSON.parse(JSON.stringify(users)), isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export const getUser = cache(
  async (
    params: GetUserParams
  ): Promise<ActionResponse<{ user: UserType }>> => {
    const validationResult = await action({
      params,
      schema: GetUserSchema,
    });

    if (validationResult instanceof Error) {
      return handleError(validationResult) as ErrorResponse;
    }

    const { userId } = validationResult.params!;

    try {
      const user = await User.findById(userId);

      if (!user) throw new Error("User not found");

      return {
        success: true,
        data: {
          user: JSON.parse(JSON.stringify(user)),
        },
      };
    } catch (error) {
      return handleError(error) as ErrorResponse;
    }
  }
);

export async function getUserQuestions(params: GetUserQuestionsParams): Promise<
  ActionResponse<{
    questions: QuestionType[];
    isNext: boolean;
  }>
> {
  const validationResult = await action({
    params,
    schema: GetUserQuestionsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, userId } = validationResult.params!;

  const skip = (page - 1) * pageSize;
  const limit = pageSize;

  try {
    const totalQuestions = await Question.countDocuments({ author: userId });

    const questions = await Question.find({ author: userId })
      .populate("tags", "name")
      .populate("author", "name image")
      .skip(skip)
      .limit(limit);

    const isNext = totalQuestions > skip + questions.length;

    return {
      success: true,
      data: {
        questions: JSON.parse(JSON.stringify(questions)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getUserAnswers(params: GetUserAnswersParams): Promise<
  ActionResponse<{
    answers: AnswerType[];
    isNext: boolean;
  }>
> {
  const validationResult = await action({
    params,
    schema: GetUserAnswersSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, userId } = validationResult.params!;

  const skip = (page - 1) * pageSize;
  const limit = pageSize;

  try {
    const totalAnswers = await Answer.countDocuments({ author: userId });

    const answers = await Answer.find({ author: userId })
      .populate("author", "name image")
      .skip(skip)
      .limit(limit);

    const isNext = totalAnswers > skip + answers.length;

    return {
      success: true,
      data: {
        answers: JSON.parse(JSON.stringify(answers)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getUserTopTags(params: GetUserTagsParams): Promise<
  ActionResponse<{
    tags: { _id: string; name: string; count: number }[];
  }>
> {
  const validationResult = await action({
    params,
    schema: GetUserTagsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { userId } = validationResult.params!;

  try {
    const pipeline: PipelineStage[] = [
      { $match: { author: new mongoose.Types.ObjectId(userId) } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      {
        $lookup: {
          from: "tags",
          localField: "_id",
          foreignField: "_id",
          as: "tagInfo",
        },
      },
      { $unwind: "$tagInfo" },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { _id: "$tagInfo._id", name: "$tagInfo.name", count: 1 } },
    ];

    const tags = await Question.aggregate(pipeline);

    return {
      success: true,
      data: { tags: JSON.parse(JSON.stringify(tags)) },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getUserStats(params: GetUserParams): Promise<
  ActionResponse<{
    totalQuestions: number;
    totalAnswers: number;
    badges: Badges;
  }>
> {
  const validationResult = await action({
    params,
    schema: GetUserSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { userId } = validationResult.params!;

  try {
    const [questionStats = null] = await Question.aggregate([
      { $match: { author: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          upvotes: { $sum: "$upvotes" },
          views: { $sum: "$views" },
        },
      },
    ]);

    const [answerStats = null] = await Answer.aggregate([
      { $match: { author: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          upvotes: { $sum: "$upvotes" },
          views: { $sum: "$views" },
        },
      },
    ]);

    const badges = assignBadges({
      criteria: [
        { type: "ANSWER_COUNT", count: answerStats?.count },
        { type: "QUESTION_COUNT", count: questionStats?.count },
        {
          type: "QUESTION_UPVOTES",
          count: questionStats?.upvotes + answerStats?.upvotes,
        },
        { type: "TOTAL_VIEWS", count: questionStats?.views },
      ],
    });

    return {
      success: true,
      data: {
        totalQuestions: questionStats?.count,
        totalAnswers: answerStats?.count,
        badges,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function updateUser(
  params: UpdateUserParams
): Promise<ActionResponse<{ user: UserType }>> {
  const validationResult = await action({
    params,
    schema: UpdateUserSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { user } = validationResult.session!;

  try {
    const updatedUser = await User.findByIdAndUpdate(user?.id, params, {
      new: true,
    });

    return {
      success: true,
      data: { user: JSON.parse(JSON.stringify(updatedUser)) },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
