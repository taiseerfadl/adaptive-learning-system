"use client";

import type { QuestionOption, QuestionPromptProps } from "./shared";

export interface MatchingQuestionProps extends QuestionPromptProps {
  leftItems: QuestionOption[];
  rightItems: QuestionOption[];
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
}

export function MatchingQuestion({
  question,
  leftItems,
  rightItems,
  value,
  onChange,
  disabled = false,
}: MatchingQuestionProps) {
  return (
    <div className="space-y-3">
      {question && (
        <p className="text-sm font-semibold text-[var(--color-text)]">
          {question}
        </p>
      )}
      <div className="space-y-3">
        {leftItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 items-center gap-2 sm:grid-cols-2"
          >
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-3 text-sm text-[var(--color-text)]">
              {item.label}
            </div>
            <select
              aria-label={`مطابقة ${item.label}`}
              value={value[item.id] ?? ""}
              disabled={disabled}
              onChange={(event) =>
                onChange({ ...value, [item.id]: event.target.value })
              }
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-3 text-sm text-[var(--color-text)] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="">اختر المطابقة</option>
              {rightItems.map((right) => (
                <option key={right.id} value={right.id}>
                  {right.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
