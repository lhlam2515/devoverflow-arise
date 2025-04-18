import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <h1 className="h1-bold text-dark100-light900">Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-full sm:max-w-36" />
      </div>

      <div className="mt-10 flex w-full flex-wrap gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Skeleton
            key={item}
            className="h-60 w-full rounded-2xl sm:w-[250px]"
          />
        ))}
      </div>
    </>
  );
};

export default Loading;
