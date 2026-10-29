import { Metadata } from "next";
import { Suspense } from "react";
import { VerifyEmailForm } from "@/components/auth/verify-email-form";
import { Spinner } from "@/components/ui/spinner";

export const metadata: Metadata = {
  title: "تأكيد البريد الإلكتروني | منصة التعلم التكيفي",
  description: "إدخال رمز التحقق لتأكيد الملكية والأمان",
};

export default function VerifyEmailPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-6">
        <Suspense
          fallback={
            <div className="flex justify-center p-8">
              <Spinner size="lg" />
            </div>
          }
        >
          <VerifyEmailForm />
        </Suspense>
      </div>
    </main>
  );
}
