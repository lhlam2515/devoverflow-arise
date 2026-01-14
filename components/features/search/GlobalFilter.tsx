"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { GlobalSearchFilters } from "@/constants/filters";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/utils";

const GlobalFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParams = searchParams.get("type");

  const handleTypeClick = (item: string) => {
    let newUrl = "";

    if (item === typeParams) {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["type"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: item.toLowerCase(),
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark400-light900 body-medium">Type:</p>
      <div className="flex gap-3">
        {GlobalSearchFilters.map((item) => (
          <button
            type="button"
            key={item.value}
            className={`border-light700-dark400 small-medium rounded-2xl px-5 py-2 capitalize ${
              typeParams === item.value
                ? "bg-primary-500 text-light-900"
                : "bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-500 dark:text-light-800 dark:hover:text-primary-500"
            }`}
            onClick={() => handleTypeClick(item.value)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilter;
