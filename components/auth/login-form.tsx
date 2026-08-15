'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button, Input, Checkbox } from '@/components/ui';
import { useAuth } from '@/context/auth-context';
import type { LoginDTO } from '@/types';

interface FormErrors {
  email?: string;
  password?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: LoginDTO): FormErrors {
  const errors: FormErrors = {};
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
  return errors;
}

interface LoginFormProps {
  /** المسار الذي يُعاد توجيه المستخدم إليه بعد نجاح الدخول */
  redirectTo?: string;
  className?: string;
}

function LoginForm({ redirectTo = '/dashboard', className }: LoginFormProps) {
  const router = useRouter();
  const { login } = useAuth();

  const [values, setValues] = React.useState<LoginDTO>({ email: '', password: '' });
  const [rememberMe, setRememberMe] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  function handleChange(field: keyof LoginDTO) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      if (serverError) setServerError(null);
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validate(values);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setIsSubmitting(true);
    setServerError(null);
    try {
      await login(values);
      router.push(redirectTo);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'تعذّر تسجيل الدخول، حاول مرة أخرى');
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
          <label htmlFor="login-email" className="text-sm font-medium text-slate-300">
            البريد الإلكتروني
          </label>
          <div className="relative flex items-center">
            <Mail className="pointer-events-none absolute start-3 h-4 w-4 text-slate-500" aria-hidden="true" />
            <Input
              id="login-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="name@example.com"
              className="ps-9"
              value={values.email}
              onChange={handleChange('email')}
              error={!!errors.email}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'login-email-error' : undefined}
            />
          </div>
          {errors.email && (
            <p id="login-email-error" className="text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="login-password" className="text-sm font-medium text-slate-300">
              كلمة المرور
            </label>
            <Link href="/forgot-password" className="text-xs font-medium text-blue-400 hover:text-blue-300">
              نسيت كلمة المرور؟
            </Link>
          </div>
          <div className="relative flex items-center">
            <Lock className="pointer-events-none absolute start-3 h-4 w-4 text-slate-500" aria-hidden="true" />
            <Input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••"
              className="ps-9 pe-9"
              value={values.password}
              onChange={handleChange('password')}
              error={!!errors.password}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'login-password-error' : undefined}
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
          {errors.password && (
            <p id="login-password-error" className="text-xs text-red-400">
              {errors.password}
            </p>
          )}
        </div>

        <label className="flex items-center gap-2.5 text-sm text-slate-400">
          <Checkbox checked={rememberMe} onCheckedChange={(v) => setRememberMe(v === true)} />
          تذكرني
        </label>

        <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full">
          تسجيل الدخول
        </Button>

        <p className="text-center text-sm text-slate-500">
          ليس لديك حساب؟{' '}
          <Link href="/register" className="font-medium text-blue-400 hover:text-blue-300">
            أنشئ حسابًا جديدًا
          </Link>
        </p>
      </div>
    </form>
  );
}

export { LoginForm };
