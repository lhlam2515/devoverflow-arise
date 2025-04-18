import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <h1 className="h1-bold text-dark100-light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-full sm:max-w-36" />
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
