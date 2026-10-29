"use client";
import * as React from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { Input } from "@/components/ui";
import { ModalShell, ModalFooter, ModalButton } from "./modal-utils";

export interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  title?: string;
  description?: string;
}

export function ShareModal({
  open,
  onOpenChange,
  url,
  title = "مشاركة",
  description = "شارك هذا الرابط مع الآخرين",
}: ShareModalProps) {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title, url });
    } else {
      await copy();
    }
  };
  return (
    <ModalShell
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
    >
      <div className="flex gap-2">
        <Input
          value={url}
          readOnly
          aria-label="رابط المشاركة"
          className="min-w-0"
        />
        <ModalButton
          variant="secondary"
          size="icon"
          onClick={() => void copy()}
          aria-label={copied ? "تم النسخ" : "نسخ الرابط"}
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </ModalButton>
      </div>
      <ModalFooter>
        <ModalButton variant="outline" onClick={() => onOpenChange(false)}>
          إغلاق
        </ModalButton>
        <ModalButton onClick={() => void share()}>
          <Share2 className="h-4 w-4" /> مشاركة
        </ModalButton>
      </ModalFooter>
    </ModalShell>
  );
}
