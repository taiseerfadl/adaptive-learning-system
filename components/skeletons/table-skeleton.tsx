import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface TableSkeletonProps {
  className?: string;
  rows?: number;
  columns?: number;
}
export function TableSkeleton({
  className,
  rows = 6,
  columns = 5,
}: TableSkeletonProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-[var(--color-border)]",
        className,
      )}
    >
      <div className="flex gap-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      <div className="divide-y divide-slate-800 bg-[var(--color-surface)]">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-4 p-4">
            {Array.from({ length: columns }).map((_, c) => (
              <Skeleton
                key={c}
                className={cn("h-4 flex-1", c === 0 && "max-w-40")}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
