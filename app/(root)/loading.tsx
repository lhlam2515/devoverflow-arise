import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100-light900">All Questions</h1>

        <Skeleton className="min-h-[46px] w-32 rounded-lg" />
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="hidden h-14 w-full max-sm:block sm:max-w-36" />
      </div>

      <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} className="h-9 w-36" />
        ))}
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {[1, 2, 3, 4, 5].map((item) => (
          <Skeleton key={item} className="h-40 w-full rounded-[10px]" />
        ))}
      </div>
    </>
  );
};

export default Loading;
