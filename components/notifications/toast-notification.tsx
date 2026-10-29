"use client";
import * as React from "react";
import { CheckCircle2, Info, X, XCircle, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
export type ToastNotificationVariant = "info" | "success" | "error";
export interface ToastNotificationProps {
  title?: string;
  message: string;
  variant?: ToastNotificationVariant;
  open?: boolean;
  duration?: number;
  onClose?: () => void;
  className?: string;
}
const config: Record<
  ToastNotificationVariant,
  { icon: LucideIcon; style: string }
> = {
  info: {
    icon: Info,
    style: "border-blue-500/30 bg-[var(--color-surface)] text-blue-100",
  },
  success: {
    icon: CheckCircle2,
    style: "border-emerald-500/30 bg-[var(--color-surface)] text-emerald-100",
  },
  error: {
    icon: XCircle,
    style: "border-red-500/30 bg-[var(--color-surface)] text-red-100",
  },
};
export function ToastNotification({
  title,
  message,
  variant = "info",
  open = true,
  duration = 5000,
  onClose,
  className,
}: ToastNotificationProps) {
  React.useEffect(() => {
    if (!open || !duration || !onClose) return;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [duration, onClose, open]);
  if (!open) return null;
  const { icon: Icon, style } = config[variant];
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "fixed bottom-4 start-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm items-start gap-3 rounded-lg border p-4 shadow-2xl",
        style,
        className,
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">
          {title ??
            (variant === "error"
              ? "حدث خطأ"
              : variant === "success"
                ? "تم بنجاح"
                : "تنبيه")}
        </p>
        <p className="mt-1 text-sm opacity-80">{message}</p>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="rounded p-1 opacity-70 hover:bg-white/10 hover:opacity-100"
          aria-label="إغلاق"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
