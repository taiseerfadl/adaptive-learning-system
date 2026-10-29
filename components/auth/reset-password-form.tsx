"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { FormField } from "@/components/forms/form-field";
import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { useLanguage } from "@/context/language-context";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const { t } = useLanguage();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError(t("auth.passwordMismatch", undefined, "كلمتا المرور غير متطابقتين"));
      return;
    }

    if (!token) {
      setError(t("auth.invalidResetToken", undefined, "رمز التعيين غير موجود أو غير صالح"));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || t("auth.resetFailed", undefined, "فشلت عملية إعادة التعيين"));
      }

      setSuccess(t("auth.resetSuccess", undefined, "تم تغيير كلمة المرور بنجاح! جاري تحويلك لتسجيل الدخول..."));
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
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
          {t("auth.resetPasswordTitle", undefined, "إعادة تعيين كلمة المرور")}
        </CardTitle>
        <CardDescription className="text-[var(--color-text-secondary)]">
          {t("auth.enterNewPassword", undefined, "أدخل كلمة المرور الجديدة لحسابك")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormError message={error || undefined} />
          <FormSuccess message={success || undefined} />

          <FormField label={t("auth.passwordLabel", undefined, "كلمة المرور الجديدة")} required>
            <PasswordInput
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </FormField>

          <FormField label={t("auth.confirmPasswordLabel", undefined, "تأكيد كلمة المرور")} required>
            <PasswordInput
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          </FormField>

          <Button type="submit" className="w-full h-11" isLoading={loading}>
            {t("auth.resetPasswordSubmit", undefined, "حفظ كلمة المرور الجديدة")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
