import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { globalSearch } from "@/lib/actions/general.action";
import { GlobalSearchedItem } from "@/types/global";

import GlobalFilter from "./GlobalFilter";

const GlobalResult = () => {
  const searchParams = useSearchParams();

  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchData = async () => {
      setResult([]);
      setIsLoading(true);

      try {
        const res = await globalSearch({
          query: global as string,
          type,
        });

        setResult(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setResult([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (global) {
      fetchData();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/questions/${id}`;
      case "answer":
        return `/questions/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;
      default:
        return "/";
    }
  };

  return (
    <div className="bg-light-800 dark:bg-dark-400 absolute top-full z-10 mt-3 w-full rounded-xl py-5 shadow-sm">
      <GlobalFilter />
      <div className="bg-light-700/50 dark:bg-dark-500/50 my-5 h-[1px]" />

      <div className="space-y-5">
        <p className="text-dark400-light900 paragraph-semibold px-5">
          Top Match
        </p>

        {isLoading ? (
          <div className="flex-center flex-col px-5">
            <ReloadIcon className="text-primary-500 my-2 h-10 w-10 animate-spin" />
            <p className="text-dark200-light800 body-normal">
              Browsing the whole database..
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {result?.length > 0 ? (
              result?.map((item: GlobalSearchedItem, index) => (
                <Link
                  href={renderLink(item.type, item.id)}
                  key={item.type + item.id + index}
                  className="hover:bg-light-700/50 dark:hover:bg-dark-500/50 flex w-full cursor-pointer items-start gap-3 px-5 py-2.5"
                >
                  <Image
                    src="/icons/tag.svg"
                    alt="tags"
                    width={18}
                    height={18}
                    className="invert-colors mt-1 object-contain"
                  />

                  <div className="flex flex-col">
                    <p className="body-medium text-dark200-light800 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-light400-light500 small-medium mt-1 font-bold capitalize">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-5xl">🫣</p>
                <p className="text-dark200-light800 body-normal px-5 py-2.5">
                  Oops, no results found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
