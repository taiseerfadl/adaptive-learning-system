"use client";

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
import { OTPInput } from "@/components/forms/otp-input";
import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { useLanguage } from "@/context/language-context";

export function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialToken = searchParams.get("token") || "";
  const { t } = useLanguage();

  const [token, setToken] = useState(initialToken);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleVerify = async (codeToVerify?: string) => {
    const finalToken = codeToVerify || token;
    if (!finalToken || finalToken.length < 6) {
      setError(t("auth.verifyCodeLength", undefined, "يرجى أدخال رمز التحقق المكون من 6 أرقام كاملة"));
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: finalToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || t("auth.invalidVerifyCode", undefined, "رمز التحقق غير صالح"));
      }

      setSuccess(t("auth.emailVerifiedSuccess", undefined, "تم التحقق من البريد بنجاح! جاري تحويلك للوحة التحكم..."));
      setTimeout(() => {
        router.push("/dashboard");
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
          {t("auth.verifyEmailTitle", undefined, "تأكيد البريد الإلكتروني")}
        </CardTitle>
        <CardDescription className="text-[var(--color-text-secondary)]">
          {t("auth.verifyEmailDesc", undefined, "أدخل رمز التحقق المكون من 6 أرقام الذي تم إرساله إلى بريدك")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormError message={error || undefined} />
        <FormSuccess message={success || undefined} />

        <OTPInput
          length={6}
          value={token}
          onChange={(val) => {
            setToken(val);
            if (val.length === 6) {
              void handleVerify(val);
            }
          }}
          disabled={loading}
        />

        <Button
          onClick={() => void handleVerify()}
          className="w-full h-11"
          isLoading={loading}
        >
          {t("auth.confirmAccount", undefined, "تأكيد الحساب")}
        </Button>
      </CardContent>
    </Card>
  );
}
