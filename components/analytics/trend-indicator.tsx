"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Skeleton,
} from "@/components/ui";
interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  loading?: boolean;
  children?: React.ReactNode;
}
export interface TrendIndicatorProps extends ComponentProps {
  values?: number[];
  labels?: string[];
}
export function TrendIndicator({
  title = "trend indicator",
  description,
  values = [42, 68, 54, 86, 72, 91],
  labels,
  className,
  loading,
  ...props
}: TrendIndicatorProps) {
  const max = Math.max(...values, 1);
  return (
    <Card className={cn("w-full overflow-hidden", className)} {...props}>
      <CardHeader>
        <CardTitle className="capitalize">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-52 w-full" />
        ) : (
          <div
            className="flex h-52 items-end gap-2"
            role="img"
            aria-label={title}
          >
            {values.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-blue-500/70"
                  style={{ height: `${Math.max(8, (v / max) * 100)}%` }}
                />
                <span className="text-[10px] text-[var(--color-text-muted)]">
                  {labels?.[i] ?? i + 1}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
