import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";
import { _Question, _Tag } from "@/types/global";

import TagCard from "./TagCard";
import Metric from "../Metric";
import EditDeleteAction from "../user/EditDeleteAction";

interface Props {
  question: _Question;
  showActionBtns?: boolean;
}

const QuestionCard = ({
  question: { _id, title, tags, author, createdAt, upvotes, answers, views },
  showActionBtns = false,
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-6 sm:px-11">
      <div className="flex flex-col-reverse items-center justify-between gap-5 sm:flex-row">
        <div className="flex-1">
          <span className="subtle-normal text-dark400-light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>

          <Link href={ROUTES.QUESTION(_id)}>
            <h3 className="sm:h3-semibold base-semibold text-dark200-light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>

        {showActionBtns && <EditDeleteAction type="question" itemId={_id} />}
      </div>

      <div className="mt-3.5 flex w-full flex-wrap gap-2">
        {tags.map((tag: _Tag) => (
          <TagCard key={tag._id} {...tag} compact />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.image}
          alt={author.name}
          value={author.name}
          title={`• asked ${getTimeStamp(createdAt)}`}
          href={ROUTES.PROFILE(author._id)}
          textStyles="body-medium text-dark400-light700"
          isAuthor
          titleStyles="max-sm:hidden"
        />

        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/icons/upvote.svg"
            alt="upvotes"
            value={upvotes}
            title=" Votes"
            textStyles="small-medium text-dark400-light800"
          />
          <Metric
            imgUrl="/icons/message.svg"
            alt="answers"
            value={answers}
            title=" Answers"
            textStyles="small-medium text-dark400-light800"
          />
          <Metric
            imgUrl="/icons/eye.svg"
            alt="views"
            value={views}
            title=" Views"
            textStyles="small-medium text-dark400-light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
