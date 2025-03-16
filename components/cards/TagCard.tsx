import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";
import { getDeviconClassName } from "@/lib/utils";

import { Badge } from "../ui/badge";

interface Props {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
}

const TagCard = ({ _id, name, questions, showCount, compact }: Props) => {
  const iconClass = getDeviconClassName(name);

  return (
    <Link href={ROUTES.TAGS(_id)} className="flex justify-between gap-2">
      <Badge className="subtle-medium! bg-light800-dark300! text-light400-light500! rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2">
          <i className={iconClass}></i>
          <span>{name}</span>
        </div>
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500-light700">{questions}</p>
      )}
    </Link>
  );
};

export default TagCard;
