"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn, formUrlQuery } from "@/lib/utils";

interface Props {
  page: number | undefined | string;
  isNext: boolean;
  containerClasses?: string;
}

const Pagination = ({ page = 1, isNext, containerClasses }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (type: "prev" | "next") => {
    const nextPageNumber =
      type === "prev" ? Number(page) - 1 : Number(page) + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      className={cn(
        "mt-5 flex w-full items-center justify-center gap-2",
        containerClasses
      )}
    >
      {/* Previous Page Button */}
      {Number(page) > 1 && (
        <Button
          className="border-light700-dark400 btn-primary! min-h[36px] flex cursor-pointer items-center justify-center gap-2 border"
          onClick={() => handleNavigation("prev")}
        >
          <p className="body-medium text-dark200-light800">Prev</p>
        </Button>
      )}

      <div className="bg-primary-500 flex items-center justify-center rounded-md px-3.5 py-2">
        <p className="body-semibold text-light-900">{page}</p>
      </div>

      {/* Next Page Button */}
      {isNext && (
        <Button
          className="border-light700-dark400 btn-primary! min-h[36px] flex cursor-pointer items-center justify-center gap-2 border"
          onClick={() => handleNavigation("next")}
        >
          <p className="body-medium text-dark200-light800">Next</p>
        </Button>
      )}
    </div>
  );
};

export default Pagination;
