"use client";

import { cn } from "@/lib/utils";
import type { QuestionOption, QuestionPromptProps } from "./shared";

export interface MultipleChoiceQuestionProps extends QuestionPromptProps {
  options: QuestionOption[];
  value?: string;
  onChange: (value: string) => void;
  name?: string;
}

export function MultipleChoiceQuestion({
  question,
  options,
  value,
  onChange,
  disabled = false,
  name = "multiple-choice-question",
}: MultipleChoiceQuestionProps) {
  return (
    <fieldset
      disabled={disabled}
      className="space-y-3"
      aria-label={question || "اختيار من متعدد"}
    >
      {question && (
        <legend className="mb-3 text-sm font-semibold text-[var(--color-text)]">
          {question}
        </legend>
      )}
      <div className="grid gap-2">
        {options.map((option) => {
          const selected = value === option.id;
          return (
            <label
              key={option.id}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors",
                "border-[var(--color-border)] bg-[var(--color-surface)]",
                "hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)]",
                selected && "border-blue-500 bg-blue-500/10",
                disabled && "cursor-not-allowed opacity-60",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={selected}
                onChange={() => onChange(option.id)}
                className="h-4 w-4 accent-blue-600"
              />
              <span className="text-sm text-[var(--color-text)]">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
