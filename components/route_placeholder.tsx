"use client";

import { Card, CardContent } from "@/components/ui/card";

export function RoutePlaceholder({
  label = "لا توجد بيانات بعد",
}: {
  label?: string;
}) {
  return (
    <Card className="border-[var(--color-border)] bg-[var(--color-surface-hover)]">
      <CardContent className="flex min-h-[200px] items-center justify-center text-center">
        <p className="text-sm text-[var(--color-text-muted)]">{label}</p>
      </CardContent>
    </Card>
  );
}
