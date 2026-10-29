"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Progress,
  Skeleton,
} from "@/components/ui";
interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  loading?: boolean;
  children?: React.ReactNode;
}
export function RecommendationCard({
  title = "recommendation card",
  description,
  children,
  className,
  loading,
  ...props
}: ComponentProps) {
  return (
    <Card
      className={cn(
        "w-full transition-colors hover:border-[var(--color-border-strong)]",
        className,
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle className="capitalize">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-12 w-full" />
        ) : (
          children || (
            <>
              <div className="mb-3 flex justify-between text-sm text-[var(--color-text-secondary)]">
                <span>التقدم</span>
                <span>0%</span>
              </div>
              <Progress value={0} />
            </>
          )
        )}
      </CardContent>
    </Card>
  );
}
