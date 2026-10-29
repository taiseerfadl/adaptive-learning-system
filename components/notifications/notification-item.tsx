"use client";

import {
  Award,
  Bell,
  CheckCircle2,
  CreditCard,
  Radio,
  UserRoundSearch,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { cn } from "@/lib/utils";
import type { Notification, NotificationType } from "@/types";

const icons: Record<NotificationType, LucideIcon> = {
  course_approved: CheckCircle2,
  course_rejected: XCircle,
  student_needs_support: UserRoundSearch,
  payment_success: CreditCard,
  new_certificate: Award,
  live_session_reminder: Radio,
};
const colors: Record<NotificationType, string> = {
  course_approved: "bg-emerald-500/10 text-emerald-400",
  course_rejected: "bg-red-500/10 text-red-400",
  student_needs_support: "bg-amber-500/10 text-amber-400",
  payment_success: "bg-blue-500/10 text-blue-400",
  new_certificate: "bg-blue-500/10 text-blue-400",
  live_session_reminder: "bg-amber-500/10 text-amber-400",
};
export interface NotificationItemProps {
  notification: Notification;
  onClick?: (notification: Notification) => void;
  className?: string;
}
export function NotificationItem({
  notification,
  onClick,
  className,
}: NotificationItemProps) {
  const Icon = icons[notification.type] ?? Bell;
  return (
    <button
      type="button"
      onClick={() => onClick?.(notification)}
      className={cn(
        "flex w-full items-start gap-3 rounded-lg px-3 py-3 text-start transition-colors hover:bg-[var(--color-surface-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
        !notification.isRead && "bg-blue-500/5",
        className,
      )}
      aria-label={notification.message}
    >
      <span
        className={cn(
          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
          colors[notification.type] ??
            "bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)]",
        )}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block text-sm leading-6",
            notification.isRead
              ? "text-[var(--color-text-secondary)]"
              : "text-[var(--color-text)]",
          )}
        >
          {notification.message}
        </span>
        <span className="mt-1 block text-xs text-[var(--color-text-muted)]">
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
            locale: ar,
          })}
        </span>
      </span>
      {!notification.isRead && (
        <span
          className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500"
          aria-label="غير مقروء"
        />
      )}
    </button>
  );
}
