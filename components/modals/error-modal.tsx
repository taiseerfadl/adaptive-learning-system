"use client";
import { XCircle } from "lucide-react";
import { ModalShell, ModalFooter, ModalButton } from "./modal-utils";

export interface ErrorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function ErrorModal({
  open,
  onOpenChange,
  title = "حدث خطأ",
  message,
  actionLabel = "حسنًا",
  onAction,
}: ErrorModalProps) {
  const close = () => {
    onAction?.();
    onOpenChange(false);
  };
  return (
    <ModalShell open={open} onOpenChange={onOpenChange} title={title}>
      <div className="flex items-start gap-3 rounded-lg border border-red-500/25 bg-red-500/10 p-4">
        <XCircle
          className="mt-0.5 h-5 w-5 shrink-0 text-red-400"
          aria-hidden="true"
        />
        <p className="text-sm leading-6 text-red-100">{message}</p>
      </div>
      <ModalFooter>
        <ModalButton onClick={close}>{actionLabel}</ModalButton>
      </ModalFooter>
    </ModalShell>
  );
}
