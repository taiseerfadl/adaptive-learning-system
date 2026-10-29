import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function FormSkeleton({
  className,
  fields = 5,
}: {
  className?: string;
  fields?: number;
}) {
  return (
    <div className={cn("space-y-5", className)}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className={cn("h-10 w-full", i === fields - 1 && "h-24")} />
        </div>
      ))}
      <div className="flex justify-end gap-3 pt-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  );
}
