import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between">
          <div className="flex items-center justify-start gap-1">
            <Skeleton className="size-7 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>

          <div className="flex items-center justify-end gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="size-6" />
          </div>
        </div>

        <Skeleton className="mt-3.5 h-10 w-full" />
      </div>

      <div className="mt-5 mb-8 flex flex-wrap gap-2">
        <Skeleton className="h-6 w-30" />
        <Skeleton className="h-6 w-18" />
        <Skeleton className="h-6 w-18" />
      </div>

      <Skeleton className="h-64 w-full" />

      <div className="mt-8 flex flex-wrap gap-2">
        {[1, 2, 3].map((item) => (
          <Skeleton key={item} className="h-6 w-20" />
        ))}
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-18" />
          <Skeleton className="h-8 w-36" />
        </div>

        <div className="mt-5 flex w-full flex-col gap-6">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-48 w-full rounded-[10px]" />
          ))}
        </div>
      </div>

      <div className="my-5">
        <Skeleton className="mb-5 h-10 w-48" />
        <Skeleton className="h-64 w-full" />
        <div className="mt-5 flex justify-end">
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
    </>
  );
};

export default Loading;
