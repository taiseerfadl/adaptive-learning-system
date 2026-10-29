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
export function RoleForm({
  title = "role form",
  description,
  children,
  className,
  loading,
  ...props
}: ComponentProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader className="flex-row items-start justify-between">
        <div>
          <CardTitle className="capitalize">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <Badge variant="secondary">إدارة</Badge>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          children || (
            <div className="rounded-lg border border-dashed border-[var(--color-border)] p-6 text-center text-sm text-[var(--color-text-muted)]">
              لا توجد بيانات للعرض
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
}
