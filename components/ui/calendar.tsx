"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      dir="rtl"
      showOutsideDays={showOutsideDays}
      className={cn("p-3 text-[var(--color-text)]", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "space-y-4",
        caption: "flex items-center justify-center relative pt-1",
        caption_label: "text-sm font-semibold text-[var(--color-text)]",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100",
        ),
        nav_button_previous: "absolute end-1",
        nav_button_next: "absolute start-1",
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell: "text-[var(--color-text-muted)] w-9 font-normal text-xs",
        row: "flex w-full mt-1",
        cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] aria-selected:opacity-100",
        ),
        day_selected:
          "bg-blue-600 text-white hover:bg-blue-600 focus:bg-blue-600",
        day_today: "border border-blue-500 text-blue-300",
        day_outside: "text-[var(--color-text-muted)] opacity-50",
        day_disabled: "text-[var(--color-text-muted)] opacity-40",
        day_range_middle:
          "aria-selected:bg-[var(--color-surface-hover)] aria-selected:text-[var(--color-text)]",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronRight className="h-4 w-4" />,
        IconRight: () => <ChevronLeft className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
