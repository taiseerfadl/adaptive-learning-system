"use client";

import * as React from "react";
import { UploadCloud, File as FileIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSizeMb?: number;
  onFilesSelected: (files: File[]) => void;
  className?: string;
}

function FileUpload({
  accept,
  multiple = false,
  maxSizeMb = 50,
  onFilesSelected,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const files = Array.from(fileList);
    const oversized = files.find((f) => f.size > maxSizeMb * 1024 * 1024);
    if (oversized) {
      setError(`الحجم الأقصى المسموح به ${maxSizeMb}MB لكل ملف`);
      return;
    }
    setError(null);
    const next = multiple ? [...selectedFiles, ...files] : files;
    setSelectedFiles(next);
    onFilesSelected(next);
  };

  const removeFile = (index: number) => {
    const next = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(next);
    onFilesSelected(next);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition-colors",
          isDragging
            ? "border-blue-500 bg-blue-500/5"
            : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]",
        )}
      >
        <UploadCloud
          className={cn(
            "h-8 w-8",
            isDragging ? "text-blue-400" : "text-[var(--color-text-muted)]",
          )}
        />
        <p className="text-sm text-[var(--color-text-secondary)]">
          اسحب الملفات هنا أو{" "}
          <span className="text-blue-400 underline">اختر من جهازك</span>
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          الحد الأقصى {maxSizeMb}MB لكل ملف
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      {selectedFiles.length > 0 && (
        <ul className="space-y-2">
          {selectedFiles.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <FileIcon className="h-4 w-4 shrink-0 text-blue-400" />
                <span className="truncate text-sm text-[var(--color-text)]">
                  {file.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="shrink-0 rounded-md p-1 text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-red-400"
                aria-label="إزالة الملف"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { FileUpload };
