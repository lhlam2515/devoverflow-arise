"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

import { formatNumber } from "@/lib/utils";

interface Props {
  upvotes: number;
  downvotes: number;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
}

const Votes = ({ upvotes, downvotes, hasUpvoted, hasDownvoted }: Props) => {
  const session = useSession();
  const userId = session?.data?.user?.id;

  const [isLoading, setIsLoading] = useState(false);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!userId) {
      return toast.error("You need to be logged in to vote.");
    }

    setIsLoading(true);

    try {
      const successMessage =
        voteType === "upvote"
          ? `Upvote ${!hasUpvoted ? "added" : "removed"} successfully`
          : `Downvote ${!hasDownvoted ? "added" : "removed"} successfully`;

      toast.success(successMessage, {
        description: "Your vote has been recorded.",
      });
    } catch {
      toast.error("Failed to vote", {
        description: "An error occurred while processing your vote.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-center gap-2.5">
      <div className="flex-center gap-1.5">
        <Image
          src={hasUpvoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"}
          alt="upvote"
          width={18}
          height={18}
          className={`cursor-pointer ${isLoading && "opacity-50"} `}
          aria-label="Upvote"
          onClick={() => !isLoading && handleVote("upvote")}
        />

        <div className="flex-center bg-light700-dark400 min-w-5 rounded-sm p-1">
          <p className="subtle-medium text-dark400-light900">
            {formatNumber(upvotes)}
          </p>
        </div>
      </div>

      <div className="flex-center gap-1.5">
        <Image
          src={hasDownvoted ? "/icons/downvoted.svg" : "/icons/downvote.svg"}
          alt="downvote"
          width={18}
          height={18}
          className={`cursor-pointer ${isLoading && "opacity-50"} `}
          aria-label="Downvote"
          onClick={() => !isLoading && handleVote("downvote")}
        />

        <div className="flex-center bg-light700-dark400 min-w-5 rounded-sm p-1">
          <p className="subtle-medium text-dark400-light900">
            {formatNumber(downvotes)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Votes;
