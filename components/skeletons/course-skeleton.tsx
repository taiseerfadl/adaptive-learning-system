import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function CourseSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-5", className)}>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Skeleton className="h-40 w-full rounded-xl sm:w-64" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
      </div>
    </div>
  );
}
