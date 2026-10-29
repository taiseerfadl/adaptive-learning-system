"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Input,
  Badge,
} from "@/components/ui";
interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  loading?: boolean;
  children?: React.ReactNode;
}
export interface ChatMessageGroupProps extends ComponentProps {
  online?: boolean;
  onSend?: (message: string) => void;
}
export function ChatMessageGroup({
  title = "chat message group",
  description,
  children,
  className,
  online,
  onSend,
  ...props
}: ChatMessageGroupProps) {
  const [value, setValue] = React.useState("");
  const send = () => {
    const next = value.trim();
    if (!next) return;
    onSend?.(next);
    setValue("");
  };
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle className="capitalize">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {online !== undefined && (
          <Badge variant={online ? "success" : "secondary"}>
            {online ? "متصل" : "غير متصل"}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {children || (
          <div className="min-h-28 rounded-lg bg-[var(--color-bg-soft)] p-4 text-sm text-[var(--color-text-muted)]">
            لا توجد رسائل بعد
          </div>
        )}
        <div className="flex gap-2">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="اكتب رسالة..."
            aria-label="الرسالة"
          />
          <Button onClick={send}>إرسال</Button>
        </div>
      </CardContent>
    </Card>
  );
}
