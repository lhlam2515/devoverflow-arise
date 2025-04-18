import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <section className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Skeleton className="size-[140px] rounded-full" />

          <div className="mt-3">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="mt-2 h-6 w-32" />

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-6 w-36" />
            </div>

            <Skeleton className="mt-8 h-20 w-full max-w-lg" />
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <Skeleton className="h-10 w-36" />
        </div>
      </section>

      {/* Stats section */}
      <div className="mt-3">
        <Skeleton className="h-6 w-20" />

        <div className="xs:grid-cols-2 mt-10 grid grid-cols-1 gap-5 md:grid-cols-4">
          <Skeleton className="h-28 rounded-md" />
          <Skeleton className="h-28 rounded-md" />
          <Skeleton className="h-28 rounded-md" />
          <Skeleton className="h-28 rounded-md" />
        </div>
      </div>

      <section className="mt-10 flex gap-10">
        <div className="flex flex-2 flex-col">
          <div className="flex">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>

          <div className="mt-5 flex w-full flex-col gap-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton key={item} className="h-40 w-full rounded-[10px]" />
            ))}
          </div>
        </div>

        <div className="flex w-full min-w-[250px] flex-1 flex-col max-lg:hidden">
          <Skeleton className="h-7 w-36" />
          <div className="mt-7 flex flex-col gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton key={item} className="h-14 w-full rounded-md" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Loading;
