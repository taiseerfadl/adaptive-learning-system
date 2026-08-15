'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User as UserIcon, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button, Input, Checkbox } from '@/components/ui';
import { RoleSelector, type RegistrableAccountType } from './role-selector';
import { useAuth } from '@/context/auth-context';
import type { RegisterDTO } from '@/types';

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType: RegistrableAccountType | null;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  accountType?: string;
  terms?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INITIAL_VALUES: FormValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  accountType: null,
};

function validate(values: FormValues, agreedToTerms: boolean): FormErrors {
  const errors: FormErrors = {};
  if (!values.fullName.trim()) {
    errors.fullName = 'الاسم الكامل مطلوب';
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = 'الاسم يجب ألا يقل عن 3 أحرف';
  }

  if (!values.email.trim()) {
    errors.email = 'البريد الإلكتروني مطلوب';
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = 'صيغة البريد الإلكتروني غير صحيحة';
  }

  if (!values.password) {
    errors.password = 'كلمة المرور مطلوبة';
  } else if (values.password.length < 8) {
    errors.password = 'كلمة المرور يجب ألا تقل عن 8 أحرف';
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'كلمتا المرور غير متطابقتين';
  }

  if (!values.accountType) {
    errors.accountType = 'الرجاء اختيار نوع الحساب';
  }

  if (!agreedToTerms) {
    errors.terms = 'يجب الموافقة على الشروط وسياسة الخصوصية للمتابعة';
  }

  return errors;
}

interface RegisterFormProps {
  redirectTo?: string;
  className?: string;
}

function RegisterForm({ redirectTo = '/dashboard', className }: RegisterFormProps) {
  const router = useRouter();
  const { register } = useAuth();

  const [values, setValues] = React.useState<FormValues>(INITIAL_VALUES);
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  function handleChange(field: keyof Omit<FormValues, 'accountType'>) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      if (serverError) setServerError(null);
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validate(values, agreedToTerms);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    const payload: RegisterDTO = {
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      password: values.password,
      accountType: values.accountType!,
    };

    setIsSubmitting(true);
    setServerError(null);
    try {
      await register(payload);
      router.push(redirectTo);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'تعذّر إنشاء الحساب، حاول مرة أخرى');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col gap-5">
        {serverError && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-3 text-sm text-red-300"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{serverError}</span>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-300">نوع الحساب</label>
          <RoleSelector
            value={values.accountType}
            onChange={(accountType) => {
              setValues((prev) => ({ ...prev, accountType }));
              setErrors((prev) => ({ ...prev, accountType: undefined }));
            }}
          />
          {errors.accountType && <p className="text-xs text-red-400">{errors.accountType}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="register-fullname" className="text-sm font-medium text-slate-300">
            الاسم الكامل
          </label>
          <div className="relative flex items-center">
            <UserIcon className="pointer-events-none absolute start-3 h-4 w-4 text-slate-500" aria-hidden="true" />
            <Input
              id="register-fullname"
              autoComplete="name"
              placeholder="الاسم الثلاثي"
              className="ps-9"
              value={values.fullName}
              onChange={handleChange('fullName')}
              error={!!errors.fullName}
              aria-invalid={!!errors.fullName}
            />
          </div>
          {errors.fullName && <p className="text-xs text-red-400">{errors.fullName}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="register-email" className="text-sm font-medium text-slate-300">
            البريد الإلكتروني
          </label>
          <div className="relative flex items-center">
            <Mail className="pointer-events-none absolute start-3 h-4 w-4 text-slate-500" aria-hidden="true" />
            <Input
              id="register-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="name@example.com"
              className="ps-9"
              value={values.email}
              onChange={handleChange('email')}
              error={!!errors.email}
              aria-invalid={!!errors.email}
            />
          </div>
          {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="register-password" className="text-sm font-medium text-slate-300">
              كلمة المرور
            </label>
            <div className="relative flex items-center">
              <Lock className="pointer-events-none absolute start-3 h-4 w-4 text-slate-500" aria-hidden="true" />
              <Input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="8 أحرف على الأقل"
                className="ps-9 pe-9"
                value={values.password}
                onChange={handleChange('password')}
                error={!!errors.password}
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute end-3 text-slate-500 hover:text-slate-300"
                aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="register-confirm-password" className="text-sm font-medium text-slate-300">
              تأكيد كلمة المرور
            </label>
            <div className="relative flex items-center">
              <Lock className="pointer-events-none absolute start-3 h-4 w-4 text-slate-500" aria-hidden="true" />
              <Input
                id="register-confirm-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="أعد كتابة كلمة المرور"
                className="ps-9"
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                error={!!errors.confirmPassword}
                aria-invalid={!!errors.confirmPassword}
              />
            </div>
            {errors.confirmPassword && <p className="text-xs text-red-400">{errors.confirmPassword}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="flex items-start gap-2.5 text-sm text-slate-400">
            <Checkbox
              checked={agreedToTerms}
              onCheckedChange={(v) => {
                setAgreedToTerms(v === true);
                setErrors((prev) => ({ ...prev, terms: undefined }));
              }}
              className="mt-0.5"
            />
            <span>
              أوافق على{' '}
              <Link href="/terms" className="font-medium text-blue-400 hover:text-blue-300">
                الشروط والأحكام
              </Link>{' '}
              و{' '}
              <Link href="/privacy" className="font-medium text-blue-400 hover:text-blue-300">
                سياسة الخصوصية
              </Link>
            </span>
          </label>
          {errors.terms && <p className="text-xs text-red-400">{errors.terms}</p>}
        </div>

        <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full">
          إنشاء الحساب
        </Button>

        <p className="text-center text-sm text-slate-500">
          لديك حساب بالفعل؟{' '}
          <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300">
            سجّل الدخول
          </Link>
        </p>
      </div>
    </form>
  );
}

export { RegisterForm };
