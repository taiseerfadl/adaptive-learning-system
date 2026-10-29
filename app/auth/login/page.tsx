import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: " تسجيل الدخول | منصة التعلم التكيفي والتوثيق الأكاديمي الرقمي",
  description: "سجل الدخول للوصول إلى مسارك التعليمي والتوثيق الأكاديمي الرقمي",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-6">
        <LoginForm />
      </div>
    </main>
  );
}
