"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { FormField } from "@/components/forms/form-field";
import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/context/language-context";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("from");
  const { refreshUser } = useAuth();
  const { t } = useLanguage();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ identifier, password, rememberMe }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t("errors.failedToLoad", undefined, "فشل تسجيل الدخول"));
      }

      setSuccess(t("common.welcome", undefined, "تم تسجيل الدخول بنجاح، جاري التحويل..."));
      await refreshUser();
      const rawRole = (data.user?.accountType ?? data.user?.role ?? "").toString().toUpperCase();
      const roleHome =
        rawRole === "ADMIN" ? "/admin" :
          (rawRole === "INSTRUCTOR" || rawRole === "TRAINER") ? "/instructor" :
            rawRole === "INSTITUTION" ? "/institution" :
              "/student";
      // Never let a stale `from` value send a newly authenticated user to
      // another role's area. Role-specific pages enforce authorization too.
      const safeRedirect = redirectUrl &&
        redirectUrl.startsWith("/") &&
        !redirectUrl.startsWith("//") &&
        !["/admin", "/student", "/instructor", "/institution"].some(
          (base) => redirectUrl === base || redirectUrl.startsWith(base + "/")
        )
        ? redirectUrl
        : roleHome;
      router.push(safeRedirect);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errors.unexpectedErrorTitle", undefined, "حدث خطأ غير متوقع"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold font-display text-[var(--color-text)]">
          {t("auth.loginTitle", undefined, "تسجيل الدخول")}
        </CardTitle>
        <CardDescription className="text-[var(--color-text-secondary)]">
          {t("auth.loginDescription", undefined, "استخدم البريد الإلكتروني أو اسم المستخدم أو رقم الهاتف")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormError message={error || undefined} />
          <FormSuccess message={success || undefined} />

          <FormField label={t("auth.identifierLabel", undefined, "البريد أو اسم المستخدم أو رقم الهاتف")} required>
            <Input
              type="text"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              placeholder={t("auth.identifierPlaceholder", undefined, "example@domain.com أو username أو +967...")}
              required
              disabled={loading}
              autoComplete="username"
              className="dir-ltr text-left"
            />
          </FormField>

          <FormField label={t("auth.passwordLabel", undefined, "كلمة المرور")} required>
            <PasswordInput
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="ادخل كلمة المرور"
              required
              disabled={loading}
              autoComplete="current-password"
            />
          </FormField>

          <div className="flex items-center justify-between text-sm">
          
            <Link
              href="/auth/forgot-password"
              className="text-blue-400 hover:underline text-xs sm:text-sm font-medium"
            >
              {t("auth.forgotPasswordLink", undefined, "نسيت كلمة المرور؟")}
            </Link>
          </div>

          <Button type="submit" className="w-full h-11" isLoading={loading}>
            {t("auth.loginSubmit", undefined, "تسجيل الدخول")}
          </Button>

          <div className="text-center text-xs text-[var(--color-text-secondary)] pt-2">
            {t("auth.dontHaveAccount", undefined, "ليس لديك حساب؟")}{" "}
            <Link
              href="/auth/register"
              className="text-blue-400 hover:underline font-semibold"
            >
              {t("auth.registerNow", undefined, "إنشاء حساب جديد")}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
