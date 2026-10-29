"use client";

import { Bell, X } from "lucide-react";
import { cn } from "@/lib/utils";
export interface PushNotificationProps {
  title: string;
  message: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClick?: () => void;
  className?: string;
}
export function PushNotification({
  title,
  message,
  open = true,
  onOpenChange,
  onClick,
  className,
}: PushNotificationProps) {
  if (!open) return null;
  return (
    <div
      role="status"
      className={cn(
        "fixed inset-x-4 top-4 z-[100] mx-auto flex max-w-md items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-2xl sm:end-6 sm:start-auto sm:w-96",
        className,
      )}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
        <Bell className="h-4 w-4" />
      </span>
      <button
        type="button"
        onClick={onClick}
        className="min-w-0 flex-1 text-start"
      >
        <strong className="block text-sm font-semibold text-[var(--color-text)]">
          {title}
        </strong>
        <span className="mt-1 block text-sm leading-5 text-[var(--color-text-secondary)]">
          {message}
        </span>
      </button>
      <button
        type="button"
        onClick={() => onOpenChange?.(false)}
        className="rounded-md p-1 text-[var(--color-text-muted)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]"
        aria-label="إغلاق"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
