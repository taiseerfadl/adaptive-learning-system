"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/forms/form-field";
import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { useLanguage } from "@/context/language-context";

export function ForgotPasswordForm() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || t("errors.failedToLoad", undefined, "حدث خطأ أثناء إرسال الطلب"));
      }

      setSuccess(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errors.unexpectedErrorTitle", undefined, "حدث خطأ غير متوقع"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-[var(--color-border)] bg-[var(--color-surface)] backdrop-blur-md shadow-2xl">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold font-display text-[var(--color-text)]">
          {t("auth.forgotPasswordTitle", undefined, "استعادة كلمة المرور")}
        </CardTitle>
        <CardDescription className="text-[var(--color-text-secondary)]">
          {t("auth.forgotPasswordDescription", undefined, "أدخل بريدك الإلكتروني وسيتم إرسال رابط إعادة التعيين إليه")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormError message={error || undefined} />
          <FormSuccess message={success || undefined} />

          <FormField label={t("auth.emailLabel", undefined, "البريد الإلكتروني")} required>
            <Input
              type="email"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="dir-ltr text-left"
            />
          </FormField>

          <Button type="submit" className="w-full h-11" isLoading={loading}>
            {t("auth.sendResetLink", undefined, "إرسال رابط التعيين")}
          </Button>

          <div className="text-center text-xs text-[var(--color-text-secondary)] pt-2">
            {t("auth.rememberedPassword", undefined, "تذكرت كلمة المرور؟")}{" "}
            <Link
              href="/auth/login"
              className="text-blue-400 hover:underline font-semibold"
            >
              {t("auth.backToLogin", undefined, "العودة لتسجيل الدخول")}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
