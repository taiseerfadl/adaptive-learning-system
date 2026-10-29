import * as React from "react";
import { Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";
export function ChatSkeleton({
  className,
  rows = 6,
}: {
  className?: string;
  rows?: number;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex items-end gap-3",
            i % 3 === 1 && "flex-row-reverse",
          )}
        >
          <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
          <Skeleton
            className={cn("h-12 rounded-2xl", i % 2 ? "w-2/3" : "w-1/2")}
          />
        </div>
      ))}
    </div>
  );
}
