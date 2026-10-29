"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Badge,
  Skeleton,
} from "@/components/ui";
interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  loading?: boolean;
  children?: React.ReactNode;
}
export function LiveScreenShare({
  title = "live screen share",
  description,
  children,
  className,
  loading,
  ...props
}: ComponentProps) {
  return (
    <Card className={cn("w-full overflow-hidden", className)} {...props}>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle className="capitalize">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <Badge>مباشر</Badge>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="aspect-video w-full" />
        ) : (
          children || (
            <div className="flex aspect-video items-center justify-center rounded-lg bg-[var(--color-bg)] text-sm text-[var(--color-text-muted)]">
              منطقة البث المباشر
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
}
