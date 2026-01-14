"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { cn, formUrlQuery, removeKeysFromUrlQuery } from "@/lib/utils";

const HomeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramsFilter = searchParams.get("filter");

  const handleTypeClick = (filter: string) => {
    let newUrl = "";

    if (filter === paramsFilter) {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter,
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.name}
          className={cn(
            `body-medium cursor-pointer rounded-lg px-6 py-3 capitalize shadow-none`,
            paramsFilter === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 dark:bg-dark-400 text-dark-500 dark:text-light-500 hover:bg-light-800 dark:hover:bg-dark-300"
          )}
          onClick={() => {
            handleTypeClick(filter.value);
          }}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
