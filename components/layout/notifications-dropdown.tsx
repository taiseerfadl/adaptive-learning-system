"use client";

import * as React from "react";
import { formatDistanceToNow } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import {
  Bell,
  CheckCircle2,
  XCircle,
  UserRoundSearch,
  CreditCard,
  Award,
  Radio,
  type LucideIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Button,
  ScrollArea,
  EmptyState,
  Spinner,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { useLanguage } from "@/context/language-context";
import type { Notification, NotificationType } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

const NOTIFICATION_ICONS: Record<NotificationType, LucideIcon> = {
  course_approved: CheckCircle2,
  course_rejected: XCircle,
  student_needs_support: UserRoundSearch,
  payment_success: CreditCard,
  new_certificate: Award,
  live_session_reminder: Radio,
};

const NOTIFICATION_COLORS: Record<NotificationType, string> = {
  course_approved: "bg-emerald-500/10 text-emerald-400",
  course_rejected: "bg-red-500/10 text-red-400",
  student_needs_support: "bg-amber-500/10 text-amber-400",
  payment_success: "bg-blue-500/10 text-blue-400",
  new_certificate: "bg-blue-500/10 text-blue-400",
  live_session_reminder: "bg-amber-500/10 text-amber-400",
};

function NotificationsDropdown() {
  const { user } = useAuth();
  const { locale, t } = useLanguage();
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const fetchNotifications = React.useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("als_access_token")
          : null;
      const res = await fetch(`${API_BASE_URL}/notifications`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (!res.ok) throw new Error("failed");
      const body = await res.json();
      setNotifications((body.data as Notification[]) ?? []);
    } catch {
      // Keep state on fetch fail
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  React.useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  async function markAsRead(notification: Notification) {
    if (notification.isRead) return;
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)),
    );
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("als_access_token")
        : null;
    fetch(`${API_BASE_URL}/notifications/${notification.id}/read`, {
      method: "PATCH",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }).catch(() => {});
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("als_access_token")
        : null;
    fetch(`${API_BASE_URL}/notifications/read-all`, {
      method: "PATCH",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }).catch(() => {});
  }

  const dateLocale = locale === "en" ? enUS : ar;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={t("notifications.title", undefined, "الإشعارات")}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute end-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-semibold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between px-3.5 py-3">
          <DropdownMenuLabel className="p-0 text-sm font-semibold text-[var(--color-text)]">
            {t("notifications.title", undefined, "الإشعارات")}
          </DropdownMenuLabel>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="text-xs font-medium text-blue-400 hover:text-blue-300"
            >
              {t("notifications.markAllAsRead", undefined, "تحديد الكل كمقروء")}
            </button>
          )}
        </div>

        <DropdownMenuSeparator className="m-0" />

        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Spinner size="md" />
          </div>
        ) : notifications.length === 0 ? (
          <EmptyState
            icon={Bell}
            title={t("notifications.noNotifications", undefined, "لا توجد إشعارات")}
            description={t("notifications.noNotificationsDesc", undefined, "ستظهر هنا آخر التحديثات المتعلقة بحسابك")}
            className="border-none py-10"
          />
        ) : (
          <ScrollArea className="max-h-96">
            <ul className="flex flex-col py-1">
              {notifications.map((notification) => {
                const Icon = NOTIFICATION_ICONS[notification.type];
                return (
                  <li key={notification.id}>
                    <button
                      type="button"
                      onClick={() => markAsRead(notification)}
                      className={cn(
                        "flex w-full items-start gap-3 px-3.5 py-3 text-start transition-colors hover:bg-[var(--color-surface-elevated)]",
                        !notification.isRead && "bg-blue-500/5",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                          NOTIFICATION_COLORS[notification.type],
                        )}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="flex flex-1 flex-col gap-1">
                        <span
                          className={cn(
                            "text-sm leading-relaxed",
                            notification.isRead
                              ? "text-[var(--color-text-secondary)]"
                              : "text-[var(--color-text)]",
                          )}
                        >
                          {notification.message}
                        </span>
                        <span className="text-xs text-[var(--color-text-muted)]">
                          {formatDistanceToNow(
                            new Date(notification.createdAt),
                            { addSuffix: true, locale: dateLocale },
                          )}
                        </span>
                      </span>
                      {!notification.isRead && (
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { NotificationsDropdown };
