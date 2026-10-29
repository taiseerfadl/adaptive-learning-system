"use client";

import { Bell } from "lucide-react";
import { EmptyState, ScrollArea, Spinner } from "@/components/ui";
import type { Notification } from "@/types";
import { NotificationItem } from "./notification-item";
export interface NotificationListProps {
  notifications: Notification[];
  isLoading?: boolean;
  onNotificationClick?: (notification: Notification) => void;
  className?: string;
  emptyTitle?: string;
  emptyDescription?: string;
}
export function NotificationList({
  notifications,
  isLoading = false,
  onNotificationClick,
  className,
  emptyTitle = "لا توجد إشعارات",
  emptyDescription = "ستظهر هنا آخر التحديثات المتعلقة بحسابك",
}: NotificationListProps) {
  if (isLoading)
    return (
      <div className="flex min-h-32 items-center justify-center">
        <Spinner size="md" />
      </div>
    );
  if (!notifications.length)
    return (
      <EmptyState
        icon={Bell}
        title={emptyTitle}
        description={emptyDescription}
        className="border-none py-10"
      />
    );
  return (
    <ScrollArea className={className}>
      <div className="flex flex-col gap-1 p-1">
        {notifications.map((n) => (
          <NotificationItem
            key={n.id}
            notification={n}
            onClick={onNotificationClick}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
