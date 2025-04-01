import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/routes";
import { EMPTY_COLLECTIONS } from "@/constants/states";
import { getSavedQuestions } from "@/lib/actions/collection.action";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Collections = async ({ searchParams }: SearchParams) => {
  const { page = 1, pageSize = 1, query, filter } = await searchParams;

  const { success, data, error } = await getSavedQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { collection } = data || {};

  return (
    <>
      <h1 className="h1-bold text-dark100-light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={ROUTES.COLLECTION}
          imgSrc="/icons/search.svg"
          placeholder="Search quesitons..."
          otherClasses="flex-1"
        />
      </div>

      <DataRenderer
        success={success}
        error={error}
        data={collection}
        empty={EMPTY_COLLECTIONS}
        render={(collection) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {collection.map((item) => (
              <QuestionCard key={item._id} question={item.quesiton} />
            ))}
          </div>
        )}
      />
    </>
  );
};

export default Collections;
