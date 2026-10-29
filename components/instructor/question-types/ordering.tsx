"use client";

import { ArrowDown, ArrowUp, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuestionOption, QuestionPromptProps } from "./shared";

export interface OrderingQuestionProps extends QuestionPromptProps {
  items: QuestionOption[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function OrderingQuestion({
  question,
  items,
  value,
  onChange,
  disabled = false,
}: OrderingQuestionProps) {
  const orderedItems = value.length
    ? [
        ...value
          .map((id) => items.find((item) => item.id === id))
          .filter((item): item is QuestionOption => Boolean(item)),
        ...items.filter((item) => !value.includes(item.id)),
      ]
    : items;

  const move = (index: number, offset: number) => {
    const nextIndex = index + offset;
    if (nextIndex < 0 || nextIndex >= orderedItems.length) return;
    const next = [...orderedItems];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    onChange(next.map((item) => item.id));
  };

  return (
    <div className="space-y-3">
      {question && (
        <p className="text-sm font-semibold text-[var(--color-text)]">
          {question}
        </p>
      )}
      <ol className="space-y-2">
        {orderedItems.map((item, index) => (
          <li
            key={item.id}
            className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3"
          >
            <GripVertical
              size={18}
              className="shrink-0 text-[var(--color-text-muted)]"
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1 text-sm text-[var(--color-text)]">
              {item.label}
            </span>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                aria-label={`تحريك ${item.label} للأعلى`}
                disabled={disabled || index === 0}
                onClick={() => move(index, -1)}
                className={cn(
                  "rounded-lg p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] disabled:cursor-not-allowed disabled:opacity-40",
                )}
              >
                <ArrowUp size={16} />
              </button>
              <button
                type="button"
                aria-label={`تحريك ${item.label} للأسفل`}
                disabled={disabled || index === orderedItems.length - 1}
                onClick={() => move(index, 1)}
                className="rounded-lg p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowDown size={16} />
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
