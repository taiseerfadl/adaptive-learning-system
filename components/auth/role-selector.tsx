"use client";

import { Building2, GraduationCap, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccountType = "STUDENT" | "INSTRUCTOR" | "INSTITUTION";

interface RoleSelectorProps {
  value: AccountType;
  onChange: (role: AccountType) => void;
  disabled?: boolean;
}

const roles = [
  {
    id: "STUDENT" as const,
    title: "طالب",
    description: "الوصول للمسار التكيفي والمقررات",
    icon: GraduationCap,
  },
  {
    id: "INSTRUCTOR" as const,
    title: "مدرب",
    description: "إدارة المساقات وبنك الأسئلة",
    icon: BookOpen,
  },
  {
    id: "INSTITUTION" as const,
    title: "مؤسسة",
    description: "إدارة المؤسسة والمستخدمين التابعين لها",
    icon: Building2,
  },
];

export function RoleSelector({ value, onChange, disabled }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {roles.map((role) => {
        const Icon = role.icon;
        const selected = value === role.id;

        return (
          <button
            key={role.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(role.id)}
            className={cn(
              "flex flex-col items-center text-center p-3.5 rounded-xl border transition-all",
              "cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
              selected
                ? "border-blue-500 bg-blue-500/10 text-white shadow-md shadow-blue-950/40"
                : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]",
            )}
          >
            <Icon
              className={cn(
                "h-6 w-6 mb-2",
                selected
                  ? "text-blue-400"
                  : "text-[var(--color-text-secondary)]",
              )}
            />
            <span className="font-semibold text-sm">{role.title}</span>
            <span className="text-[10px] text-[var(--color-text-muted)] leading-tight mt-1">
              {role.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
