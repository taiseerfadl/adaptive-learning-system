"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Input,
  Skeleton,
} from "@/components/ui";
interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  loading?: boolean;
  children?: React.ReactNode;
}
export interface FormWrapperProps extends ComponentProps {
  label?: string;
  error?: string;
  required?: boolean;
}
export function FormWrapper({
  title = "form wrapper",
  description,
  children,
  className,
  error,
  label,
  required,
  loading,
  ...props
}: FormWrapperProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle className="capitalize">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : (
          <div className="space-y-3">
            {label && (
              <label className="block text-sm font-medium text-[var(--color-text)]">
                {label}
                {required && <span className="ms-1 text-red-400">*</span>}
              </label>
            )}
            {children || (
              <Input aria-label={label ?? title} placeholder="أدخل البيانات" />
            )}
            {error && <p className="text-xs text-red-400">{error}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
