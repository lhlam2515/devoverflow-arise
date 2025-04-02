import Image from "next/image";
import Link from "next/link";

import ROUTES from "@/constants/routes";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getTopTags } from "@/lib/actions/tag.action";

import TagCard from "../cards/TagCard";
import DataRenderer from "../DataRenderer";

const RightSidebar = async () => {
  const [
    { success, data: hotQuestions, error },
    { success: tagSuccess, data: popularTags, error: tagError },
  ] = await Promise.all([getHotQuestions(), getTopTags()]);

  return (
    <section className="custom-scrollbar bg-light900-dark200 border-light800-dark300 shadow-light-300 sticky top-0 right-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 max-xl:hidden dark:shadow-none">
      <div>
        <h3 className="h3-bold text-dark200-light900">Top Questions</h3>

        <DataRenderer
          success={success}
          error={error}
          data={hotQuestions}
          empty={{
            title: "No questions found",
            message: "No questions have been asked yet.",
          }}
          render={(hotQuestions) => (
            <div className="mt-7 flex w-full flex-col gap-[30px]">
              {hotQuestions.map(({ _id, title }) => (
                <Link
                  key={_id}
                  href={ROUTES.QUESTION(_id)}
                  className="flex-between cursor-pointer gap-7"
                >
                  <p className="body-medium text-dark500-light700 line-clamp-2">
                    {title}
                  </p>

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
          )}
        />
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200-light900">Popular Tags</h3>

        <DataRenderer
          success={tagSuccess}
          error={tagError}
          data={popularTags}
          empty={{
            title: "No tags found",
            message: "No tags have been created yet.",
          }}
          render={(popularTags) => (
            <div className="mt-7 flex flex-col gap-4">
              {popularTags.map((tag) => (
                <TagCard key={tag._id} {...tag} showCount compact />
              ))}
            </div>
          )}
        />
      </div>
    </section>
  );
};

export default RightSidebar;
