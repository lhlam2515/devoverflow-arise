import Link from "next/link";

import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const questions = [
  {
    _id: "1",
    title: "How to use Next.js with TypeScript?",
    description:
      "I want to know how to set up a Next.js project with TypeScript.",
    tags: [
      { _id: "1", name: "Next.js" },
      { _id: "2", name: "TypeScript" },
    ],
    author: { _id: "1", name: "John Doe" },
    upvotes: 10,
    answer: 5,
    views: 100,
    date: new Date(),
  },
  {
    _id: "2",
    title: "How to manage state in React?",
    description: "I want to know how to manage state in React using hooks.",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "TypeScript" },
    ],
    author: { _id: "1", name: "John Doe" },
    upvotes: 10,
    answer: 5,
    views: 100,
    date: new Date(),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const { query = "" } = await searchParams;

  const filterQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100-light900">All Questions</h1>

        <Button
          className="bg-primary-gradient text-light-900! min-h-[46px] px-4 py-3"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search a question..."
          otherClasses="flex-1"
        />
      </section>
      {/* HomeFilter */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {filterQuestions.map((question) => (
          <h1 key={question._id}>{question.title}</h1>
        ))}
      </div>
    </>
  );
};

export default Home;
