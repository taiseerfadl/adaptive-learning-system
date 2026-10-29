"use client";

import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModalShell, ModalFooter, ModalButton } from "./modal-utils";

export interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
  destructive?: boolean;
  className?: string;
}

export function ConfirmModal({
  open,
  onOpenChange,
  title = "تأكيد الإجراء",
  description = "هل أنت متأكد من رغبتك في تنفيذ هذا الإجراء؟",
  confirmLabel = "تأكيد",
  cancelLabel = "إلغاء",
  onConfirm,
  isLoading = false,
  destructive = false,
  className,
}: ConfirmModalProps) {
  return (
    <ModalShell
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      className={className}
    >
      <div className="flex items-start gap-3 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-hover)] p-4">
        <AlertTriangle
          className={cn(
            "mt-0.5 h-5 w-5 shrink-0",
            destructive ? "text-red-400" : "text-amber-400",
          )}
          aria-hidden="true"
        />
        <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
          لا يمكن التراجع عن هذا الإجراء بعد تأكيده.
        </p>
      </div>
      <ModalFooter>
        <ModalButton
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={isLoading}
        >
          {cancelLabel}
        </ModalButton>
        <ModalButton
          variant={destructive ? "destructive" : "default"}
          onClick={() => void onConfirm()}
          isLoading={isLoading}
        >
          {confirmLabel}
        </ModalButton>
      </ModalFooter>
    </ModalShell>
  );
}
