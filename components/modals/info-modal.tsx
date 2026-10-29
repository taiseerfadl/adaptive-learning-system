"use client";
import { Info } from "lucide-react";
import { ModalShell, ModalFooter, ModalButton } from "./modal-utils";

export interface InfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function InfoModal({
  open,
  onOpenChange,
  title = "معلومات",
  message,
  actionLabel = "حسنًا",
  onAction,
}: InfoModalProps) {
  const close = () => {
    onAction?.();
    onOpenChange(false);
  };
  return (
    <ModalShell open={open} onOpenChange={onOpenChange} title={title}>
      <div className="flex items-start gap-3 rounded-lg border border-blue-500/25 bg-blue-500/10 p-4">
        <Info
          className="mt-0.5 h-5 w-5 shrink-0 text-blue-400"
          aria-hidden="true"
        />
        <p className="text-sm leading-6 text-blue-100">{message}</p>
      </div>
      <ModalFooter>
        <ModalButton onClick={close}>{actionLabel}</ModalButton>
      </ModalFooter>
    </ModalShell>
  );
}
