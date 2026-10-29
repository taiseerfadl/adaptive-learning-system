import { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "استعادة كلمة المرور | منصة التعلم التكيفي",
  description: "طلب رابط استعادة كلمة المرور لنيابة الحساب",
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-6">
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
