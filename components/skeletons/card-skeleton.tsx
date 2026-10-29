import * as React from "react";
import { Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";
export interface CardSkeletonProps {
  className?: string;
  showImage?: boolean;
  lines?: number;
}
export function CardSkeleton({
  className,
  showImage = true,
  lines = 2,
}: CardSkeletonProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]",
        className,
      )}
    >
      {showImage && <Skeleton className="h-40 w-full rounded-none" />}
      <div className="space-y-3 p-5">
        <Skeleton className="h-5 w-3/4" />
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn("h-3", i === lines - 1 ? "w-1/2" : "w-full")}
          />
        ))}
      </div>
    </div>
  );
}
