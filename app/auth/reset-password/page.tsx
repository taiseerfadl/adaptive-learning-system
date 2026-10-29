import { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Spinner } from "@/components/ui/spinner";

export const metadata: Metadata = {
  title: "تعيين كلمة المرور الجديدة | منصة التعلم التكيفي",
  description: "إدخال كلمة المرور الجديدة للحساب",
};

export default function ResetPasswordPage() {
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
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}
