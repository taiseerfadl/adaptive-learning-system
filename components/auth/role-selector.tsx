'use client';

import * as React from 'react';
import { GraduationCap, Presentation, Building2, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AccountType } from '@/types';

/**
 * RoleSelector — اختيار نوع الحساب عند التسجيل.
 * الإدارة (admin) مستثناة عمدًا؛ فحسابات الإدارة تُنشأ داخليًا وليس عبر
 * نموذج التسجيل العام (انظر RegisterDTO في types/auth.ts).
 */
export type RegistrableAccountType = Extract<AccountType, 'student' | 'trainer' | 'institution'>;

interface RoleOption {
  value: RegistrableAccountType;
  label: string;
  description: string;
  icon: LucideIcon;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    value: 'student',
    label: 'طالب',
    description: 'التحق بالدورات وتابع مسارك التعليمي التكيفي',
    icon: GraduationCap,
  },
  {
    value: 'trainer',
    label: 'مدرب',
    description: 'أنشئ دوراتك وقدّم شهادات حضور لطلابك',
    icon: Presentation,
  },
  {
    value: 'institution',
    label: 'مؤسسة تعليمية',
    description: 'أدر مدربين وأصدر شهادات معتمدة رسميًا',
    icon: Building2,
  },
];

interface RoleSelectorProps {
  value: RegistrableAccountType | null;
  onChange: (value: RegistrableAccountType) => void;
  className?: string;
  disabled?: boolean;
}

function RoleSelector({ value, onChange, className, disabled }: RoleSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="نوع الحساب"
      className={cn('grid grid-cols-1 gap-3 sm:grid-cols-3', className)}
    >
      {ROLE_OPTIONS.map((option) => {
        const Icon = option.icon;
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={cn(
              'flex flex-col items-start gap-2.5 rounded-xl border p-4 text-start transition-all',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50',
              'disabled:cursor-not-allowed disabled:opacity-50',
              isSelected
                ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_0_1px_theme(colors.blue.500)]'
                : 'border-slate-700 bg-slate-900 hover:border-slate-600 hover:bg-slate-800/60'
            )}
          >
            <span
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
                isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
              )}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className={cn('text-sm font-semibold', isSelected ? 'text-blue-300' : 'text-slate-100')}>
                {option.label}
              </span>
              <span className="text-xs leading-relaxed text-slate-500">{option.description}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export { RoleSelector, ROLE_OPTIONS };
