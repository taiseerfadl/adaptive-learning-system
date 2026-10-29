"use client";

import { cn } from "@/lib/utils";
import type { QuestionPromptProps } from "./shared";

export interface TrueFalseQuestionProps extends QuestionPromptProps {
  value?: boolean | null;
  onChange: (value: boolean) => void;
}

export function TrueFalseQuestion({
  question,
  value = null,
  onChange,
  disabled = false,
}: TrueFalseQuestionProps) {
  const choices = [
    { value: true, label: "صحيح" },
    { value: false, label: "خطأ" },
  ];

  return (
    <fieldset
      disabled={disabled}
      className="space-y-3"
      aria-label={question || "صح أو خطأ"}
    >
      {question && (
        <legend className="mb-3 text-sm font-semibold text-[var(--color-text)]">
          {question}
        </legend>
      )}
      <div className="grid grid-cols-2 gap-3">
        {choices.map((choice) => {
          const selected = value === choice.value;
          return (
            <button
              key={choice.label}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(choice.value)}
              className={cn(
                "min-h-12 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors",
                "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]",
                "hover:border-[var(--color-border-strong)]",
                selected && "border-blue-500 bg-blue-500/10 text-blue-600",
                disabled && "cursor-not-allowed opacity-60",
              )}
            >
              {choice.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
