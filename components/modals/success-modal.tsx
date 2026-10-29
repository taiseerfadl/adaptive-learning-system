"use client";
import { CheckCircle2 } from "lucide-react";
import { ModalShell, ModalFooter, ModalButton } from "./modal-utils";

export interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SuccessModal({
  open,
  onOpenChange,
  title = "تم بنجاح",
  message,
  actionLabel = "متابعة",
  onAction,
}: SuccessModalProps) {
  const close = () => {
    onAction?.();
    onOpenChange(false);
  };
  return (
    <ModalShell open={open} onOpenChange={onOpenChange} title={title}>
      <div className="flex items-start gap-3 rounded-lg border border-emerald-500/25 bg-emerald-500/10 p-4">
        <CheckCircle2
          className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
          aria-hidden="true"
        />
        <p className="text-sm leading-6 text-emerald-100">{message}</p>
      </div>
      <ModalFooter>
        <ModalButton onClick={close}>{actionLabel}</ModalButton>
      </ModalFooter>
    </ModalShell>
  );
}
