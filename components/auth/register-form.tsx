"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { RoleSelector, type AccountType } from "./role-selector";
import { evaluatePasswordStrength } from "@/lib/utils/password-strength";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCw,
  Sparkles,
  Phone,
  Mail,
  Calendar,
  Layers,
  Crown,
  User,
  Building2,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Institution Plans for Simulation
const INSTITUTION_PLANS = [
  {
    id: "monthly",
    title: "اشتراك شهري",
    duration: "تجديد شهري",
    description: "مرونة كاملة للمؤسسات الناشئة مع إمكانية الإلغاء في أي وقت.",
    icon: Calendar,
    tag: "مرن",
  },
  {
    id: "six_months",
    title: "اشتراك 6 أشهر",
    duration: "نصف سنوي",
    description: "الخيار الأنسب للمؤسسات والمدارس خلال الفصول الدراسية.",
    icon: Layers,
    tag: "الأكثر طلبًا",
    popular: true,
  },
  {
    id: "yearly",
    title: "اشتراك سنوي",
    duration: "تغطية سنوية كاملة",
    description: "أعلى توفير للمؤسسات الكبرى مع دعم فني وأولوية تكامل.",
    icon: Crown,
    tag: "أفضل قيمة",
  },
] as const;

// Role display info
const ROLE_INFO: Record<AccountType, { label: string; desc: string; icon: React.ElementType }> = {
  STUDENT: {
    label: "طالب",
    desc: "سجّل كطالب للوصول إلى المحتوى التعليمي والمسارات المخصصة.",
    icon: GraduationCap,
  },
  INSTRUCTOR: {
    label: "مدرّب",
    desc: "سجّل كمدرّب لنشر دوراتك وإدارة طلابك.",
    icon: User,
  },
  INSTITUTION: {
    label: "مؤسسة",
    desc: "سجّل مؤسستك التعليمية وانضم كشريك أكاديمي.",
    icon: Building2,
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// Phase types: "role-select" is shown BEFORE the stepper
// ──────────────────────────────────────────────────────────────────────────────
type Phase = "role-select" | "steps";

export function RegisterForm() {
  const router = useRouter();

  // Phase — role selection is a separate screen before steps begin
  const [phase, setPhase] = useState<Phase>("role-select");

  // Role Selection
  const [role, setRole] = useState<AccountType>("STUDENT");

  // Current Step (1 to 4 for Student/Instructor; 1 to 5 for Institution)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Institution Plan
  const [selectedPlan, setSelectedPlan] = useState<string>("monthly");

  // Form Fields
  const [name, setName] = useState(""); // Optional for Student/Instructor; Institution name for institutions
  const [username, setUsername] = useState("");
  const [contactPersonName, setContactPersonName] = useState(""); // For Institution
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Contact Method (Phone default, or Email)
  const [contactMethod, setContactMethod] = useState<"phone" | "email">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  // Verification step
  const [verificationCode, setVerificationCode] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [verificationToken, setVerificationToken] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [devCodeHint, setDevCodeHint] = useState<string | null>(null);
  const [isVerifiedSuccess, setIsVerifiedSuccess] = useState<boolean>(false);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Dynamic max steps count based on role
  const totalSteps = role === "INSTITUTION" ? 5 : 4;

  // Password strength evaluation
  const passwordStrength = useMemo(
    () => evaluatePasswordStrength(password),
    [password],
  );

  // Cooldown timer for OTP Resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // When switching role in the role-select phase, reset everything
  const handleRoleChange = (newRole: AccountType) => {
    setRole(newRole);
    setError(null);
    setSuccess(null);
  };

  // Confirm role and enter the stepper
  const handleConfirmRole = () => {
    setCurrentStep(1);
    setError(null);
    setSuccess(null);
    setPhase("steps");
  };

  // Step Validation logic
  const validateCurrentStep = (): string | null => {
    if (role === "STUDENT" || role === "INSTRUCTOR") {
      // Step 1: Name (optional) & Username (required)
      if (currentStep === 1) {
        if (!username.trim()) {
          return "اسم المستخدم مطلوب للمتابعة";
        }
        if (username.trim().length < 3) {
          return "اسم المستخدم يجب ألا يقل عن 3 أحرف";
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username.trim())) {
          return "اسم المستخدم يجب أن يحتوي فقط على أحرف إنجليزية وأرقام وعلامة _";
        }
      }

      // Step 2: Password & Confirm Password
      if (currentStep === 2) {
        if (!password || password.length < 8) {
          return "كلمة المرور يجب ألا تقل عن 8 أحرف";
        }
        if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
          return "كلمة المرور يجب أن تتضمن أحرفًا وأرقامًا معًا";
        }
        if (password !== confirmPassword) {
          return "كلمة المرور وتأكيدها غير متطابقين";
        }
      }

      // Step 3: Single Contact Method (Phone or Email)
      if (currentStep === 3) {
        if (contactMethod === "phone") {
          if (!phoneNumber.trim() || phoneNumber.trim().length < 7) {
            return "يرجى إدخال رقم هاتف صحيح مع الرمز الدولي (مثال: +967...)";
          }
        } else {
          if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            return "يرجى إدخال عنوان بريد إلكتروني صالح وصحيح";
          }
        }
      }
    } else {
      // INSTITUTION: 5 Steps
      // Step 1: Plan selection
      if (currentStep === 1) {
        if (!selectedPlan) {
          return "يرجى تحديد خطة الاشتراك أولاً";
        }
      }

      // Step 2: Institution data
      if (currentStep === 2) {
        if (!name.trim()) {
          return "اسم المؤسسة مطلوب";
        }
        if (!username.trim() || username.trim().length < 3) {
          return "اسم المستخدم مطلوب ويجب ألا يقل عن 3 أحرف";
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username.trim())) {
          return "اسم المستخدم يجب أن يحتوي فقط على أحرف إنجليزية وأرقام وعلامة _";
        }
        if (!contactPersonName.trim()) {
          return "اسم مسؤول التواصل مطلوب";
        }
      }

      // Step 3: Password & Confirm Password
      if (currentStep === 3) {
        if (!password || password.length < 8) {
          return "كلمة المرور يجب ألا تقل عن 8 أحرف";
        }
        if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
          return "كلمة المرور يجب أن تتضمن أحرفًا وأرقامًا معًا";
        }
        if (password !== confirmPassword) {
          return "كلمة المرور وتأكيدها غير متطابقين";
        }
      }

      // Step 4: Single Contact Method
      if (currentStep === 4) {
        if (contactMethod === "phone") {
          if (!phoneNumber.trim() || phoneNumber.trim().length < 7) {
            return "يرجى إدخال رقم هاتف صحيح مع الرمز الدولي (مثال: +967...)";
          }
        } else {
          if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            return "يرجى إدخال عنوان بريد إلكتروني صالح وصحيح";
          }
        }
      }
    }

    return null;
  };

  // Move forward or trigger registration before verification step
  const handleNext = async () => {
    setError(null);
    const stepError = validateCurrentStep();
    if (stepError) {
      setError(stepError);
      return;
    }

    // Determine the step right before verification
    const isContactStep =
      (role !== "INSTITUTION" && currentStep === 3) ||
      (role === "INSTITUTION" && currentStep === 4);

    if (isContactStep) {
      // Execute account registration request to create unverified account and issue verification OTP
      await submitRegistration();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Move backward
  const handleBack = () => {
    setError(null);
    if (currentStep > 1 && !userId) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Go back to role selection (only before registration is submitted)
  const handleBackToRoleSelect = () => {
    if (userId) return; // Already registered — cannot go back
    setPhase("role-select");
    setCurrentStep(1);
    setError(null);
    setSuccess(null);
  };

  // Submit initial registration to backend
  const submitRegistration = async () => {
    setLoading(true);
    setError(null);

    const payload = {
      role,
      name: name.trim() || null,
      username: username.trim().toLowerCase(),
      password,
      confirmPassword,
      contactMethod,
      phoneNumber: contactMethod === "phone" ? phoneNumber.trim() : null,
      email: contactMethod === "email" ? email.trim().toLowerCase() : null,
      ...(role === "INSTITUTION"
        ? {
          institutionName: name.trim(),
          contactPersonName: contactPersonName.trim(),
          subscriptionPlan: selectedPlan,
        }
        : {}),
    };

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "فشل تسجيل البيانات، يرجى المحاولة مرة أخرى.");
      }

      setUserId(data.data?.user?.id || null);
      setVerificationToken(data.data?.verificationToken || null);
      if (data.data?.devCode) {
        setDevCodeHint(data.data.devCode);
      }

      setResendCooldown(60);
      setSuccess(data.message || "تم تسجيل البيانات بنجاح، يرجى إدخال رمز التحقق.");
      // Move to Verification Step
      setCurrentStep((prev) => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع أثناء التسجيل");
    } finally {
      setLoading(false);
    }
  };

  // Verify the 6-digit code
  const handleVerifyCode = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!verificationCode || verificationCode.trim().length !== 6) {
      setError("يرجى إدخال رمز التحقق المكون من 6 أرقام كاملة");
      return;
    }

    setLoading(true);

    const endpoint =
      contactMethod === "phone"
        ? "/api/auth/verify-phone"
        : "/api/auth/verify-email";

    const payload = {
      code: verificationCode.trim(),
      userId,
      verificationToken,
      ...(contactMethod === "phone" ? { phoneNumber } : { email }),
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "رمز التحقق غير صحيح أو انتهت صلاحيته.");
      }

      setIsVerifiedSuccess(true);
      setSuccess("تم تأكيد وتفعيل حسابك بنجاح! جاري التوجيه لتسجيل الدخول...");

      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل التحقق من الرمز المدخل");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP code
  const handleResendCode = async () => {
    if (resendCooldown > 0 || loading) return;
    setError(null);
    setLoading(true);

    // Both phone and email verification codes are issued via send-phone-code
    const endpoint = "/api/auth/send-phone-code";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId,
          verificationToken,
          phoneNumber: contactMethod === "phone" ? phoneNumber : undefined,
          email: contactMethod === "email" ? email : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "تعذر إعادة إرسال الرمز حالياً.");
      }

      if (data.devCode) {
        setDevCodeHint(data.devCode);
      }

      setResendCooldown(60);
      setSuccess("تم إرسال رمز تحقق جديد بنجاح.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء إعادة إرسال الرمز");
    } finally {
      setLoading(false);
    }
  };

  // ──────────────────────────────────────────────────────────────────────────
  // SUCCESS SCREEN — shown after OTP verified
  // ──────────────────────────────────────────────────────────────────────────
  if (isVerifiedSuccess) {
    return (
      <Card className="w-full max-w-lg mx-auto border-[var(--color-border)] bg-[var(--color-surface)] backdrop-blur-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <CardHeader className="text-center space-y-3 pb-3">
          <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <CardTitle className="text-2xl font-bold font-display text-[var(--color-text)]">
            تم تفعيل الحساب بنجاح!
          </CardTitle>
          <CardDescription className="text-sm text-[var(--color-text-secondary)]">
            أهلاً بك في أكاديمية التعلم الذكي. تم توثيق حسابك وجاهز للاستخدام.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link
            href="/auth/login"
            className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-md shadow-blue-900/30"
          >
            تسجيل الدخول الآن
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </CardContent>
      </Card>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // PHASE 1 — ROLE SELECTION SCREEN (separate from stepper)
  // ──────────────────────────────────────────────────────────────────────────
  if (phase === "role-select") {
    return (
      <Card className="w-full max-w-xl mx-auto border-[var(--color-border)] bg-[var(--color-surface)] backdrop-blur-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <CardHeader className="text-center space-y-2 pb-4">
          <CardTitle className="text-2xl font-bold font-display text-[var(--color-text)]">
            إنشاء حساب جديد
          </CardTitle>
          <CardDescription className="text-[var(--color-text-secondary)] text-sm">
            اختر نوع حسابك للمتابعة
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <FormError message={error || undefined} />

          {/* Role Selector Component */}
          <RoleSelector value={role} onChange={handleRoleChange} disabled={loading} />

          {/* Selected Role Summary */}
          {(() => {
            const info = ROLE_INFO[role];
            const RoleIcon = info.icon;
            return (
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-3.5 flex items-start gap-3 animate-in fade-in-50 duration-150">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <RoleIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--color-text)]">{info.label}</p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{info.desc}</p>
                </div>
              </div>
            );
          })()}

          {/* Continue button */}
          <Button
            type="button"
            onClick={handleConfirmRole}
            disabled={loading}
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2"
          >
            متابعة
            <ArrowLeft className="w-4 h-4" />
          </Button>

          <div className="text-center text-xs text-[var(--color-text-secondary)] pt-1 border-t border-[var(--color-border)]">
            لديك حساب بالفعل؟{" "}
            <Link href="/auth/login" className="text-blue-400 hover:underline font-semibold">
              تسجيل الدخول
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // PHASE 2 — STEPPER (steps begin here, role is locked)
  // ──────────────────────────────────────────────────────────────────────────
  const isVerificationStep =
    (role !== "INSTITUTION" && currentStep === 4) ||
    (role === "INSTITUTION" && currentStep === 5);

  const stepLabel = role === "STUDENT" || role === "INSTRUCTOR"
    ? (["الاسم واسم المستخدم", "كلمة المرور", "وسيلة التواصل", "التحقق من الحساب"][currentStep - 1] ?? "")
    : (["اختيار الخطة", "بيانات المؤسسة", "كلمة المرور", "وسيلة التواصل", "التحقق من الحساب"][currentStep - 1] ?? "");

  return (
    <Card className="w-full max-w-xl mx-auto border-[var(--color-border)] bg-[var(--color-surface)] backdrop-blur-md shadow-2xl">
      <CardHeader className="text-center space-y-2 pb-2">
        {/* Role badge + back button */}
        <div className="flex items-center justify-between mb-1">
          {/* Back to role selection — only before account is created */}
          {!userId ? (
            <button
              type="button"
              onClick={handleBackToRoleSelect}
              className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              تغيير نوع الحساب
            </button>
          ) : (
            <div />
          )}

          {/* Current role pill */}
          {(() => {
            const info = ROLE_INFO[role];
            const RoleIcon = info.icon;
            return (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <RoleIcon className="w-3.5 h-3.5" />
                {info.label}
              </span>
            );
          })()}
        </div>

        <CardTitle className="text-xl font-bold font-display text-[var(--color-text)]">
          إنشاء حساب جديد
        </CardTitle>

        {/* Stepper Progress */}
        <div className="pt-2 pb-1">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] px-1">
            <span>
              الخطوة {currentStep} من {totalSteps}
            </span>
            <span className="font-semibold text-blue-400">{stepLabel}</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-blue-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <FormError message={error || undefined} />
        <FormSuccess message={success || undefined} />

        {/* ------------------------------------------------------------------- */}
        {/* STUDENT & INSTRUCTOR REGISTRATION (4 STEPS ONLY)                    */}
        {/* ------------------------------------------------------------------- */}
        {(role === "STUDENT" || role === "INSTRUCTOR") && (
          <div className="space-y-4">
            {/* Step 1: Name (Optional) & Username (Required) */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                <FormField label="الاسم ">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ادخل اسمك الكامل (اختياري)"
                    disabled={loading}
                  />
                </FormField>

                <FormField label="اسم المستخدم " required>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="ادخل اسم المستخدم"
                    required
                    disabled={loading}
                    autoComplete="username"
                    className="dir-ltr text-left"
                  />
                </FormField>
              </div>
            )}

            {/* Step 2: Password & Confirm Password */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                <FormField label="كلمة المرور" required>
                  <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    autoComplete="new-password"
                    placeholder="8 احرف على الاقل"
                  />
                </FormField>

                <FormField label="تأكيد كلمة المرور" required>
                  <PasswordInput
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                    autoComplete="new-password"
                    placeholder="أعد إدخال كلمة المرور"
                  />
                </FormField>

                {password && (
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-3 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[var(--color-text-secondary)]">قوة كلمة المرور:</span>
                      <span className={cn("font-bold", passwordStrength.color)}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={cn(
                            "h-full flex-1 transition-all duration-300",
                            passwordStrength.score >= level
                              ? passwordStrength.barColor
                              : "bg-zinc-800",
                          )}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Single Contact Method (Phone Default, or Email) */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                {contactMethod === "phone" ? (
                  <div className="space-y-2">
                    <FormField label="رقم الهاتف" required>
                      <div className="relative">
                        <Input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+967..."
                          required
                          disabled={loading}
                          autoComplete="tel"
                          className="dir-ltr text-left pl-10"
                        />
                        <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </FormField>
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setContactMethod("email");
                          setPhoneNumber("");
                          setError(null);
                        }}
                        className="text-xs text-blue-400 hover:text-blue-300 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        التسجيل باستخدام البريد الإلكتروني بدلًا من ذلك
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <FormField label="البريد الإلكتروني" required>
                      <div className="relative">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          required
                          disabled={loading}
                          autoComplete="email"
                          className="dir-ltr text-left pl-10"
                        />
                        <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </FormField>
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setContactMethod("phone");
                          setEmail("");
                          setError(null);
                        }}
                        className="text-xs text-blue-400 hover:text-blue-300 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        التسجيل باستخدام رقم الهاتف بدلًا من ذلك
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* INSTITUTION REGISTRATION (5 STEPS)                                  */}
        {/* ------------------------------------------------------------------- */}
        {role === "INSTITUTION" && (
          <div className="space-y-4">
            {/* Step 1: Plan Selection (3 Interactive Simulation Cards) */}
            {currentStep === 1 && (
              <div className="space-y-3 animate-in fade-in-50 duration-200">
                <div className="text-center pb-1">
                  <h3 className="text-base font-semibold text-[var(--color-text)]">
                    اختر خطة المؤسسة
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    خطط اشتراك تفاعلية للمحاكاة وتخصيص صلاحيات الجهة
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {INSTITUTION_PLANS.map((plan) => {
                    const isSelected = selectedPlan === plan.id;
                    const PlanIcon = plan.icon;

                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlan(plan.id)}
                        className={cn(
                          "w-full text-right p-3.5 rounded-xl border transition-all flex items-start gap-3.5 relative",
                          isSelected
                            ? "border-blue-500 bg-blue-500/10 shadow-md shadow-blue-950/40"
                            : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]",
                        )}
                      >
                        <div
                          className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border",
                            isSelected
                              ? "bg-blue-600 border-blue-500 text-white"
                              : "bg-zinc-900 border-zinc-800 text-zinc-400",
                          )}
                        >
                          <PlanIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-sm text-[var(--color-text)]">
                              {plan.title}
                            </span>
                            <span
                              className={cn(
                                "text-[10px] px-2 py-0.5 rounded-full font-semibold border",
                                isSelected
                                  ? "bg-blue-500/20 border-blue-400 text-blue-300"
                                  : "bg-zinc-800 border-zinc-700 text-zinc-400",
                              )}
                            >
                              {plan.tag}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">
                            {plan.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Institution Data (Institution Name, Username, Contact Person) */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                <FormField label="اسم المؤسسة (Institution Name)" required>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: أكاديمية النخبة للتدريب"
                    required
                    disabled={loading}
                  />
                </FormField>

                <FormField label="اسم المستخدم (Username)" required>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="اسم المستخدم للمؤسسة (مثل: elite_academy)"
                    required
                    disabled={loading}
                    autoComplete="username"
                    className="dir-ltr text-left"
                  />
                </FormField>

                <FormField label="اسم مسؤول التواصل (Contact Person Name)" required>
                  <Input
                    value={contactPersonName}
                    onChange={(e) => setContactPersonName(e.target.value)}
                    placeholder="الاسم الكامل للمسؤول المفوض"
                    required
                    disabled={loading}
                  />
                </FormField>
              </div>
            )}

            {/* Step 3: Password & Confirm Password */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                <FormField label="كلمة المرور" required>
                  <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    autoComplete="new-password"
                    placeholder="8 أحرف على الأقل (أحرف وأرقام)"
                  />
                </FormField>

                <FormField label="تأكيد كلمة المرور" required>
                  <PasswordInput
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                    autoComplete="new-password"
                    placeholder="أعد إدخال كلمة المرور"
                  />
                </FormField>

                {password && (
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-3 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[var(--color-text-secondary)]">قوة كلمة المرور:</span>
                      <span className={cn("font-bold", passwordStrength.color)}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={cn(
                            "h-full flex-1 transition-all duration-300",
                            passwordStrength.score >= level
                              ? passwordStrength.barColor
                              : "bg-zinc-800",
                          )}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Single Contact Method (Phone Default, or Email) */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                {contactMethod === "phone" ? (
                  <div className="space-y-2">
                    <FormField label="رقم الهاتف" required>
                      <div className="relative">
                        <Input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+967..."
                          required
                          disabled={loading}
                          autoComplete="tel"
                          className="dir-ltr text-left pl-10"
                        />
                        <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </FormField>
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setContactMethod("email");
                          setPhoneNumber("");
                          setError(null);
                        }}
                        className="text-xs text-blue-400 hover:text-blue-300 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        التسجيل باستخدام البريد الإلكتروني بدلًا من ذلك
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <FormField label="البريد الإلكتروني للمؤسسة" required>
                      <div className="relative">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="info@institution.com"
                          required
                          disabled={loading}
                          autoComplete="email"
                          className="dir-ltr text-left pl-10"
                        />
                        <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </FormField>
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setContactMethod("phone");
                          setEmail("");
                          setError(null);
                        }}
                        className="text-xs text-blue-400 hover:text-blue-300 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        التسجيل باستخدام رقم الهاتف بدلًا من ذلك
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* FINAL STEP: 6-DIGIT OTP VERIFICATION FOR ALL ROLES                  */}
        {/* ------------------------------------------------------------------- */}
        {isVerificationStep && (
          <form onSubmit={handleVerifyCode} className="space-y-4 animate-in fade-in-50 duration-200">
            <div className="text-center space-y-1 pb-1">
              <h3 className="text-base font-semibold text-[var(--color-text)]">
                التحقق من رمز التأكيد
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)]">
                أدخل رمز التحقق المكون من 6 أرقام لتأكيد حسابك
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 dir-ltr pt-1">
                {contactMethod === "phone" ? phoneNumber : email}
              </div>
            </div>

            {/* Dev Hint Box (Only displayed locally during test simulation) */}
            {devCodeHint && (
              <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 text-center space-y-1">
                <span className="text-[11px] text-blue-300 flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  رمز الاختبار السريع (محاكاة بيئة التطوير المجانية):
                </span>
                <span className="text-lg font-mono font-bold text-white tracking-widest dir-ltr">
                  {devCodeHint}
                </span>
              </div>
            )}

            <FormField label="رمز التحقق (6 أرقام)" required>
              <Input
                type="text"
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                required
                disabled={loading}
                className="dir-ltr text-center font-mono text-xl tracking-[0.4em] h-12"
              />
            </FormField>

            {/* Resend OTP button with countdown */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[var(--color-text-secondary)]">لم يصلك الرمز؟</span>
              <button
                type="button"
                onClick={handleResendCode}
                disabled={resendCooldown > 0 || loading}
                className="text-blue-400 hover:text-blue-300 disabled:text-zinc-600 disabled:cursor-not-allowed font-medium inline-flex items-center gap-1"
              >
                <RotateCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
                {resendCooldown > 0
                  ? `إعادة الإرسال بعد (${resendCooldown} ثانية)`
                  : "إعادة إرسال الرمز"}
              </button>
            </div>

            <Button
              type="submit"
              isLoading={loading}
              className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2"
            >
              تأكيد وتفعيل الحساب
              <CheckCircle2 className="w-4 h-4" />
            </Button>
          </form>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* NAVIGATION BUTTONS (FOR STEPS BEFORE VERIFICATION)                   */}
        {/* ------------------------------------------------------------------- */}
        {!isVerificationStep && (
          <div className="flex items-center justify-between gap-3 pt-3">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={loading || !!userId}
                className="gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                السابق
              </Button>
            ) : (
              <div />
            )}

            <Button
              type="button"
              onClick={handleNext}
              isLoading={loading}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              التالي
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </div>
        )}

        <div className="text-center text-xs text-[var(--color-text-secondary)] pt-3 border-t border-[var(--color-border)] mt-4">
          لديك حساب بالفعل؟{" "}
          <Link href="/auth/login" className="text-blue-400 hover:underline font-semibold">
            تسجيل الدخول
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
