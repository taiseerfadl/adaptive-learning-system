import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "إنشاء حساب جديد | منصة التعلم التكيفي",
  description: "انضم إلى منصة التعلم التكيفي والتوثيق الأكاديمي الرقمي",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-lg space-y-6">
        <RegisterForm />
      </div>
    </main>
  );
}
