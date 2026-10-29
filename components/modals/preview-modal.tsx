"use client";
import * as React from "react";
import { ModalShell } from "./modal-utils";

export interface PreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function PreviewModal({
  open,
  onOpenChange,
  title = "معاينة",
  description,
  children,
  className,
}: PreviewModalProps) {
  return (
    <ModalShell
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      className={className}
    >
      {children}
    </ModalShell>
  );
}
