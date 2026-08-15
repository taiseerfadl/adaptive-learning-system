'use client';

import * as React from 'react';
import Link from 'next/link';
import { Mail, AlertCircle, MailCheck, ArrowRight } from 'lucide-react';
import { Button, Input } from '@/components/ui';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api';

interface ForgotPasswordFormProps {
  className?: string;
}

function ForgotPasswordForm({ className }: ForgotPasswordFormProps) {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError('البريد الإلكتروني مطلوب');
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      setError('صيغة البريد الإلكتروني غير صحيحة');
      return;
    }

    setError(null);
    setServerError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      // نعرض حالة النجاح دائمًا (حتى لو لم يكن البريد مسجّلًا) لمنع تسريب
      // معلومة وجود الحساب من عدمه — ممارسة أمنية قياسية.
      if (!res.ok && res.status >= 500) {
        throw new Error('تعذّر إرسال الطلب حاليًا، حاول لاحقًا');
      }
      setIsSent(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'تعذّر إرسال الطلب حاليًا، حاول لاحقًا');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSent) {
    return (
      <div className={className}>
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
            <MailCheck className="h-6 w-6" aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-1.5">
            <h2 className="text-lg font-semibold text-slate-100">تحقق من بريدك الإلكتروني</h2>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              أرسلنا رابط إعادة تعيين كلمة المرور إلى{' '}
              <span className="font-medium text-slate-200">{email}</span> إن كان مسجّلًا لدينا.
              الرابط صالح لمدة 30 دقيقة.
            </p>
          </div>
          <Button variant="outline" onClick={() => setIsSent(false)} className="mt-2">
            لم يصلك البريد؟ أعد المحاولة
          </Button>
          <Link
            href="/login"
            className="flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            العودة إلى تسجيل الدخول
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col gap-5">
        <p className="text-sm leading-relaxed text-slate-400">
          أدخل بريدك الإلكتروني المسجّل، وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.
        </p>

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
          <label htmlFor="forgot-password-email" className="text-sm font-medium text-slate-300">
            البريد الإلكتروني
          </label>
          <div className="relative flex items-center">
            <Mail className="pointer-events-none absolute start-3 h-4 w-4 text-slate-500" aria-hidden="true" />
            <Input
              id="forgot-password-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="name@example.com"
              className="ps-9"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              error={!!error}
              aria-invalid={!!error}
              aria-describedby={error ? 'forgot-password-email-error' : undefined}
            />
          </div>
          {error && (
            <p id="forgot-password-email-error" className="text-xs text-red-400">
              {error}
            </p>
          )}
        </div>

        <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full">
          إرسال رابط إعادة التعيين
        </Button>

        <Link
          href="/login"
          className="flex items-center justify-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          العودة إلى تسجيل الدخول
        </Link>
      </div>
    </form>
  );
}

export { ForgotPasswordForm };
