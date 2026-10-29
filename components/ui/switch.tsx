"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

/**
 * Switch — يراعي اتجاه RTL: مقبض التبديل ينزلق بالاتجاه المعاكس فعليًا
 * عبر متغيرات rtl: المدمجة في Tailwind (v3.3+) دون الحاجة لإضافات خارجية
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-hover)] transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
      "data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md transition-transform",
        "translate-x-0 rtl:translate-x-0",
        "data-[state=checked]:translate-x-5 rtl:data-[state=checked]:-translate-x-5",
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
