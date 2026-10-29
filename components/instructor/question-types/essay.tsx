"use client";

import type { QuestionPromptProps } from "./shared";

export interface EssayQuestionProps extends QuestionPromptProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
}

export function EssayQuestion({
  question,
  value,
  onChange,
  disabled = false,
  placeholder = "اكتب إجابتك هنا...",
  rows = 5,
  maxLength,
}: EssayQuestionProps) {
  return (
    <div className="space-y-2">
      {question && (
        <label className="block text-sm font-semibold text-[var(--color-text)]">
          {question}
        </label>
      )}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className="w-full resize-y rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-[var(--color-text-muted)] disabled:cursor-not-allowed disabled:opacity-60"
      />
      {maxLength !== undefined && (
        <p className="text-end text-xs text-[var(--color-text-muted)]">
          {value.length} / {maxLength}
        </p>
      )}
    </div>
  );
}
