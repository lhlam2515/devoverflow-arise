import Link from "next/link";

import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import CommonFilter from "@/components/filters/CommonFilter";
import HomeFilter from "@/components/filters/HomeFilter";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import ROUTES from "@/constants/routes";
import { EMPTY_QUESTION } from "@/constants/states";
import { getQuestions } from "@/lib/actions/question.action";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { questions, isNext } = data || {};

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100-light900">All Questions</h1>

        <Button
          className="bg-primary-gradient text-light-900 min-h-[46px] px-4 py-3"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a question</Link>
        </Button>
      </section>
      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search a question..."
          otherClasses="flex-1"
        />

        <CommonFilter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] w-full sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </section>
      <HomeFilter />

      <DataRenderer
        success={success}
        error={error}
        data={questions}
        empty={EMPTY_QUESTION}
        render={(questions) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))}
          </div>
        )}
      />

      <Pagination page={page} isNext={isNext || false} />
    </>
  );
};

export default Home;
