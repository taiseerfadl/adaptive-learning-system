import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { Button, type ButtonProps } from "@/components/ui";

export interface ModalBaseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ModalShell({
  open,
  onOpenChange,
  title,
  description,
  className,
  children,
}: ModalBaseProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-h-[min(90vh,46rem)] overflow-y-auto sm:max-w-lg",
          className,
        )}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export function ModalButton(props: ButtonProps) {
  return <Button type="button" {...props} />;
}

export function ModalFooter({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <DialogFooter className={cn("flex-col-reverse sm:flex-row", className)}>
      {children}
    </DialogFooter>
  );
}
