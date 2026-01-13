import Link from "next/link";
import { Suspense } from "react";

import { UserActions } from "@/components/features/user";
import { VoteAction } from "@/components/features/vote";
import { UserAvatar } from "@/components/shared";
import { EditorPreview } from "@/components/shared/editor";
import ROUTES from "@/constants/routes";
import { hasVoted } from "@/lib/actions/vote.action";
import { cn, getTimeStamp } from "@/lib/utils";
import { _Answer } from "@/types/global";

interface Props extends _Answer {
  containerClasses?: string;
  showReadMore?: boolean;
  showActionBtns?: boolean;
}

const AnswerCard = ({
  _id,
  author,
  content,
  createdAt,
  upvotes,
  downvotes,
  question,
  containerClasses,
  showReadMore = false,
  showActionBtns = false,
}: Props) => {
  const hasVotedPromise = hasVoted({
    targetId: _id,
    targetType: "answer",
  });

  return (
    <article
      className={cn(
        "border-light800-dark300 relative border-b py-10",
        containerClasses
      )}
    >
      <span id={`answer-${_id}`} className="hash-span" />

      {showActionBtns && (
        <div className="bg-light800 flex-center absolute -top-5 -right-2 size-9 rounded-full">
          <UserActions type="answer" itemId={_id} />
        </div>
      )}

      <div className="mb-5 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <div className="flex flex-1 items-start gap-1 sm:items-center">
          <UserAvatar
            id={author._id}
            name={author.name}
            imageUrl={author.image}
            className="size-5 rounded-full object-cover max-sm:mt-2"
          />

          <Link
            href={ROUTES.PROFILE(author._id)}
            className="flex flex-col max-sm:ml-1 sm:flex-row sm:items-center"
          >
            <p className="body-semibold text-dark300-light700">
              {author.name ?? "Anonymous"}
            </p>

            <p className="small-normal text-light400-light500 mt-0.5 ml-0.5 line-clamp-1">
              <span className="max-sm:hidden"> • </span>
              answer {getTimeStamp(createdAt)}
            </p>
          </Link>
        </div>

        <div className="flex justify-end">
          <Suspense fallback={<div>Loading...</div>}>
            <VoteAction
              targetId={_id}
              targetType="answer"
              upvotes={upvotes}
              downvotes={downvotes}
              hasVotedPromise={hasVotedPromise}
            />
          </Suspense>
        </div>
      </div>

      <EditorPreview content={content} />

      {showReadMore && (
        <Link
          href={`${ROUTES.QUESTION(question)}#answer-${_id}`}
          className="body-semibold font-space-grotesk text-primary-500 relative"
        >
          <p className="mt-1">Read more...</p>
        </Link>
      )}
    </article>
  );
};

export default AnswerCard;
