"use client";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NotificationBadgeProps {
  count?: number;
  max?: number;
  className?: string;
  showZero?: boolean;
}
export function NotificationBadge({
  count = 0,
  max = 99,
  className,
  showZero = false,
}: NotificationBadgeProps) {
  if (!showZero && count <= 0) return null;
  const label = count > max ? `${max}+` : String(Math.max(0, count));
  return (
    <span
      className={cn(
        "inline-flex min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white",
        className,
      )}
      aria-label={`${count} إشعارات غير مقروءة`}
    >
      {label}
    </span>
  );
}
export function NotificationBell({
  count = 0,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <span className={cn("relative inline-flex", className)}>
      <Bell className="h-5 w-5" aria-hidden="true" />
      <NotificationBadge count={count} className="absolute -end-2 -top-2" />
    </span>
  );
}
