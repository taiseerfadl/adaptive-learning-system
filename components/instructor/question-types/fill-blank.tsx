"use client";

import type { QuestionPromptProps } from "./shared";

export interface FillBlankQuestionProps extends QuestionPromptProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function FillBlankQuestion({
  question,
  value,
  onChange,
  disabled = false,
  placeholder = "اكتب الكلمة المناسبة...",
}: FillBlankQuestionProps) {
  return (
    <div className="space-y-2">
      {question && (
        <label className="block text-sm font-semibold text-[var(--color-text)]">
          {question}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-[var(--color-text-muted)] disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}
