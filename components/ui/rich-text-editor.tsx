"use client";

import * as React from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link as LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

const TOOLBAR_ACTIONS = [
  { command: "bold", icon: Bold, label: "عريض" },
  { command: "italic", icon: Italic, label: "مائل" },
  { command: "underline", icon: Underline, label: "تسطير" },
  { command: "insertUnorderedList", icon: List, label: "قائمة نقطية" },
  { command: "insertOrderedList", icon: ListOrdered, label: "قائمة مرقمة" },
] as const;

/**
 * RichTextEditor — محرر غير متحكم فيه (uncontrolled)
 * value تُستخدم للمحتوى الابتدائي فقط، وكل التحديثات اللاحقة تصل عبر onChange
 */
function RichTextEditor({
  value,
  onChange,
  placeholder = "اكتب هنا...",
  className,
}: RichTextEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null);

  const exec = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    editorRef.current?.focus();
    onChange(editorRef.current?.innerHTML ?? "");
  };

  const insertLink = () => {
    const url = window.prompt("أدخل رابط URL:");
    if (url) exec("createLink", url);
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-1 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-1.5">
        {TOOLBAR_ACTIONS.map(({ command, icon: Icon, label }) => (
          <button
            key={command}
            type="button"
            title={label}
            onClick={() => exec(command)}
            className="rounded-md p-2 text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-blue-400"
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
        <button
          type="button"
          title="إدراج رابط"
          onClick={insertLink}
          className="rounded-md p-2 text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-blue-400"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        dir="rtl"
        data-placeholder={placeholder}
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: value }}
        className="min-h-[160px] px-4 py-3 text-sm text-[var(--color-text)] outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-[var(--color-text-muted)]"
      />
    </div>
  );
}

export { RichTextEditor };
