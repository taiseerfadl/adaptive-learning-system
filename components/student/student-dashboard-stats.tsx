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
import { useLanguage } from "@/context/language-context";

interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  loading?: boolean;
  children?: React.ReactNode;
}

export function StudentDashboardStats({
  title,
  description,
  children,
  className,
  loading,
  ...props
}: ComponentProps) {
  const { t } = useLanguage();
  const displayTitle = title ?? t("studentDashboard.statsTitle", undefined, "إحصائيات الطالب");

  return (
    <Card
      className={cn(
        "w-full transition-colors hover:border-[var(--color-border-strong)]",
        className,
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle>{displayTitle}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-12 w-full" />
        ) : (
          children || (
            <>
              <div className="mb-3 flex justify-between text-sm text-[var(--color-text-secondary)]">
                <span>{t("common.progress", undefined, "التقدم")}</span>
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
