import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";

import TagCard from "../cards/TagCard";

const hotQuestions = [
  { _id: "1", title: "How to use React Hooks?" },
  { _id: "2", title: "What is the difference between props and state?" },
  { _id: "3", title: "How to manage state in React?" },
  { _id: "4", title: "What is the use of useEffect hook?" },
  { _id: "5", title: "How to handle forms in React?" },
];

const popularTags = [
  { _id: "1", name: "react", questions: 100 },
  { _id: "2", name: "javascript", questions: 200 },
  { _id: "3", name: "typescript", questions: 150 },
  { _id: "4", name: "nextjs", questions: 50 },
  { _id: "5", name: "react-query", questions: 75 },
];

const RightSidebar = () => {
  return (
    <section className="custom-scrollbar bg-light900-dark200 border-light800-dark300 sticky right-0 top-0 p-6 pt-36 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l shawdow-light-300 dark:shadow-non max-xl:hidden ">
      <div>
        <h3 className="h3-bold text-dark200-light900">Top Questions</h3>
        <div className="mt-7 w-full flex flex-col gap-[30px]">
          {hotQuestions.map(({ _id, title }) => (
            <Link
              key={_id}
              href={ROUTES.PROFILE(_id)}
              className="flex-between cursor-pointer gap-7"
            >
              <p className="body-medium text-dark500-light700">{title}</p>

              <Image
                src="/icons/chevron-right.svg"
                alt="Chevron"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200-light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <TagCard key={tag._id} {...tag} showCount compact />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
