import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="mt-9">
        <div className="flex flex-col gap-8">
          {/* Title Field */}
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-12 w-full" />
          </div>

          {/* Explanation / Content Editor */}
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-64 w-full" />
          </div>

          {/* Tags Input */}
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-12 w-full" />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
