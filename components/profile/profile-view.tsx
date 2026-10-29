"use client";

import * as React from "react";
import {
  User as UserIcon,
  Mail,
  Phone,
  Shield,
  ShieldCheck,
  Calendar,
  Building2,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  XCircle,
  Hash,
  Activity,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useLanguage } from "@/context/language-context";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Separator,
  Skeleton,
} from "@/components/ui";
import { PageHeader } from "@/components/layout";

function getInitials(fullName?: string | null, fallbackUsername?: string): string {
  const nameToUse = (fullName && fullName.trim()) || (fallbackUsername && fallbackUsername.trim()) || "";
  const parts = nameToUse.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "؟";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function formatDate(dateValue: string | Date | undefined | null, locale: string): string {
  if (!dateValue) return "—";
  try {
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return "—";
    return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(d);
  } catch {
    return "—";
  }
}

export function ProfileView() {
  const { user, loading } = useAuth();
  const { t, locale } = useLanguage();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <Card className="p-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2.5 text-center sm:text-start">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-28" />
              <div className="flex justify-center gap-2 sm:justify-start">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          </div>
        </Card>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
          <UserIcon className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-[var(--color-text)]">
          {t("profile.userNotFound", undefined, "لم يتم العثور على بيانات المستخدم")}
        </h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          {t("profile.loginRequired", undefined, "يرجى تسجيل الدخول لعرض الملف الشخصي")}
        </p>
      </div>
    );
  }

  // Normalized role string
  const roleKey = (user.role || user.accountType || "").toUpperCase();

  // Role details configuration
  const roleConfig = {
    STUDENT: {
      label: t("roles.STUDENT", undefined, "طالب"),
      icon: GraduationCap,
      badgeClass: "bg-blue-500/10 text-blue-500 border-blue-500/20 dark:text-blue-400",
      dashboardHref: "/student",
      dashboardLabel: t("roles.student", undefined, "الطالب"),
    },
    INSTRUCTOR: {
      label: t("roles.INSTRUCTOR", undefined, "مدرب"),
      icon: BookOpen,
      badgeClass: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20 dark:text-indigo-400",
      dashboardHref: "/instructor",
      dashboardLabel: t("roles.trainer", undefined, "المدرب"),
    },
    INSTITUTION: {
      label: t("roles.INSTITUTION", undefined, "مؤسسة تعليمية"),
      icon: Building2,
      badgeClass: "bg-purple-500/10 text-purple-500 border-purple-500/20 dark:text-purple-400",
      dashboardHref: "/institution",
      dashboardLabel: t("roles.institution", undefined, "المؤسسة"),
    },
    ADMIN: {
      label: t("roles.ADMIN", undefined, "مسؤول النظام"),
      icon: ShieldCheck,
      badgeClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 dark:text-emerald-400",
      dashboardHref: "/admin",
      dashboardLabel: t("roles.admin", undefined, "الإدارة"),
    },
  }[roleKey] || {
    label: user.role || user.accountType,
    icon: UserIcon,
    badgeClass: "bg-slate-500/10 text-slate-500 border-slate-500/20",
    dashboardHref: "/",
    dashboardLabel: t("nav.dashboard", undefined, "لوحة التحكم"),
  };

  const RoleIcon = roleConfig.icon;

  const breadcrumbs = [
    { label: roleConfig.dashboardLabel, href: roleConfig.dashboardHref },
    { label: t("profile.title", undefined, "الملف الشخصي") },
  ];

  const hasName = Boolean(user.name && user.name.trim());
  const displayName = hasName ? user.name : user.username;

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("profile.title", undefined, "الملف الشخصي")}
        description={t(
          "profile.description",
          undefined,
          "عرض وإدارة معلومات حسابك وبياناتك المسجلة في المنصة.",
        )}
        breadcrumbItems={breadcrumbs}
      />

      {/* ── Main Identity Card ── */}
      <Card className="relative overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
        {/* Decorative Top Accent Glow */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500" />

        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-[var(--color-surface-elevated)] shadow-md sm:h-28 sm:w-28">
                <AvatarImage src={user.profileImageUrl || undefined} alt={displayName} />
                <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-2xl font-bold text-white sm:text-3xl">
                  {getInitials(user.name, user.username)}
                </AvatarFallback>
              </Avatar>
              <div
                className="absolute bottom-1 end-1 rounded-full border-2 border-[var(--color-surface)] bg-emerald-500 p-1.5 text-white"
                title={t("profile.active", undefined, "نشط")}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Name, Username & Tags */}
            <div className="flex-1 text-center sm:text-start">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <h2 className="text-xl font-bold text-[var(--color-text)] sm:text-2xl">
                  {displayName}
                </h2>
                {!hasName && (
                  <span className="text-xs text-[var(--color-text-muted)]">
                    ({t("profile.notRegistered", undefined, "غير مسجل")})
                  </span>
                )}
              </div>

              <p className="mt-1 font-mono text-sm text-[var(--color-text-muted)]" dir="ltr">
                @{user.username}
              </p>

              {/* Badges Row */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                {/* Role Badge */}
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${roleConfig.badgeClass}`}
                >
                  <RoleIcon className="h-3.5 w-3.5" />
                  {roleConfig.label}
                </span>

                {/* Status Badge */}
                <Badge variant={user.status === "ACTIVE" ? "success" : "secondary"}>
                  <Activity className="me-1 h-3 w-3" />
                  {user.status === "ACTIVE"
                    ? t("profile.active", undefined, "نشط")
                    : user.status === "INACTIVE"
                      ? t("profile.inactive", undefined, "غير نشط")
                      : t("profile.suspended", undefined, "معلّق")}
                </Badge>

                {/* Verification Indicators */}
                {user.email && (
                  <Badge variant={user.emailVerified ? "outline" : "secondary"}>
                    <Mail className="me-1 h-3 w-3" />
                    {user.emailVerified
                      ? t("profile.emailVerified", undefined, "البريد مؤكد")
                      : t("profile.emailNotVerified", undefined, "البريد غير مؤكد")}
                  </Badge>
                )}

                {user.phoneNumber && (
                  <Badge variant={user.phoneVerified ? "outline" : "secondary"}>
                    <Phone className="me-1 h-3 w-3" />
                    {user.phoneVerified
                      ? t("profile.phoneVerified", undefined, "الهاتف مؤكد")
                      : t("profile.phoneNotVerified", undefined, "الهاتف غير مؤكد")}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ── Information Cards Grid ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 1. Basic / Contact Information */}
        <Card className="border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 dark:text-blue-400">
                <UserIcon className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-[var(--color-text)]">
                  {t("profile.personalInfo", undefined, "البيانات الأساسية")}
                </CardTitle>
                <CardDescription className="text-xs text-[var(--color-text-muted)]">
                  {t(
                    "profile.accountOverviewDesc",
                    undefined,
                    "المعلومات الأساسية والهوية المسجلة في النظام",
                  )}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <Separator className="bg-[var(--color-border)]" />

          <CardContent className="space-y-4 pt-4">
            {/* Full Name */}
            <div className="flex items-center justify-between rounded-lg bg-[var(--color-surface-elevated)] p-3">
              <span className="text-sm font-medium text-[var(--color-text-muted)]">
                {t("profile.fullName", undefined, "الاسم الكامل")}
              </span>
              <span className="text-sm font-semibold text-[var(--color-text)]">
                {user.name || t("profile.notRegistered", undefined, "غير مسجل")}
              </span>
            </div>

            {/* Username */}
            <div className="flex items-center justify-between rounded-lg bg-[var(--color-surface-elevated)] p-3">
              <span className="text-sm font-medium text-[var(--color-text-muted)]">
                {t("profile.username", undefined, "اسم المستخدم")}
              </span>
              <span className="font-mono text-sm font-semibold text-[var(--color-text)]" dir="ltr">
                {user.username}
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between rounded-lg bg-[var(--color-surface-elevated)] p-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[var(--color-text-muted)]" />
                <span className="text-sm font-medium text-[var(--color-text-muted)]">
                  {t("profile.email", undefined, "البريد الإلكتروني")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[var(--color-text)]" dir="ltr">
                  {user.email || t("profile.notRegistered", undefined, "غير مسجل")}
                </span>
                {user.email && (
                  user.emailVerified ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-amber-500" />
                  )
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-center justify-between rounded-lg bg-[var(--color-surface-elevated)] p-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[var(--color-text-muted)]" />
                <span className="text-sm font-medium text-[var(--color-text-muted)]">
                  {t("profile.phoneNumber", undefined, "رقم الهاتف")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[var(--color-text)]" dir="ltr">
                  {user.phoneNumber || t("profile.notRegistered", undefined, "غير مسجل")}
                </span>
                {user.phoneNumber && (
                  user.phoneVerified ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-amber-500" />
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Role-Specific Details */}
        <Card className="border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                <RoleIcon className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-[var(--color-text)]">
                  {t("profile.roleSpecificInfo", undefined, "بيانات الدور الأكاديمي")}
                </CardTitle>
                <CardDescription className="text-xs text-[var(--color-text-muted)]">
                  {roleConfig.label}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <Separator className="bg-[var(--color-border)]" />

          <CardContent className="space-y-4 pt-4">
            {/* Account Role */}
            <div className="flex items-center justify-between rounded-lg bg-[var(--color-surface-elevated)] p-3">
              <span className="text-sm font-medium text-[var(--color-text-muted)]">
                {t("profile.accountType", undefined, "نوع الحساب")}
              </span>
              <span className="text-sm font-bold text-[var(--color-text)]">
                {roleConfig.label}
              </span>
            </div>

            {/* STUDENT ROLE FIELDS */}
            {roleKey === "STUDENT" && (
              <>
                <div className="flex items-center justify-between rounded-lg bg-[var(--color-surface-elevated)] p-3">
                  <span className="text-sm font-medium text-[var(--color-text-muted)]">
                    {t("profile.major", undefined, "التخصص الأكاديمي")}
                  </span>
                  <span className="text-sm font-semibold text-[var(--color-text)]">
                    {user.student?.major || t("profile.notRegistered", undefined, "غير مسجل")}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-[var(--color-surface-elevated)] p-3">
                  <span className="text-sm font-medium text-[var(--color-text-muted)]">
                    {t("profile.academicLevel", undefined, "المستوى الدراسي")}
                  </span>
                  <span className="text-sm font-semibold text-[var(--color-text)]">
                    {user.student?.academicLevel || t("profile.notRegistered", undefined, "غير مسجل")}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-[var(--color-surface-elevated)] p-3">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-medium text-[var(--color-text-muted)]">
                      {t("profile.progressPoints", undefined, "نقاط التقدم والإنجاز")}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-500">
                    {user.student?.progressPoints ?? 0} {t("profile.points", undefined, "نقطة")}
                  </span>
                </div>

                {user.student?.academicId && (
                  <div className="flex items-center justify-between rounded-lg bg-[var(--color-surface-elevated)] p-3">
                    <span className="text-sm font-medium text-[var(--color-text-muted)]">
                      {t("profile.academicId", undefined, "الرقم الأكاديمي")}
                    </span>
                    <span className="font-mono text-sm font-semibold text-[var(--color-text)]">
                      {user.student.academicId}
                    </span>
                  </div>
                )}
              </>
            )}

            {/* INSTRUCTOR ROLE FIELDS */}
            {roleKey === "INSTRUCTOR" && (
              <>
                <div className="flex items-center justify-between rounded-lg bg-[var(--color-surface-elevated)] p-3">
                  <span className="text-sm font-medium text-[var(--color-text-muted)]">
                    {t("profile.instructorType", undefined, "نوع المدرب")}
                  </span>
                  <span className="text-sm font-semibold text-[var(--color-text)]">
                    {user.instructor?.instructorType === "INSTITUTIONAL"
                      ? t("profile.institutional", undefined, "تابع لمؤسسة")
                      : t("profile.independent", undefined, "مستقل")}
                  </span>
                </div>

                {user.instructor?.academicId && (
                  <div className="flex items-center justify-between rounded-lg bg-[var(--color-surface-elevated)] p-3">
                    <span className="text-sm font-medium text-[var(--color-text-muted)]">
                      {t("profile.academicId", undefined, "الرقم الأكاديمي")}
                    </span>
                    <span className="font-mono text-sm font-semibold text-[var(--color-text)]">
                      {user.instructor.academicId}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between rounded-lg bg-[var(--color-surface-elevated)] p-3">
                  <span className="text-sm font-medium text-[var(--color-text-muted)]">
                    {t("profile.verified", undefined, "حالة الاعتماد")}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-500">
                    <CheckCircle2 className="h-4 w-4" />
                    {t("profile.verified", undefined, "معتمد")}
                  </span>
                </div>
              </>
            )}

            {/* INSTITUTION ROLE FIELDS */}
            {roleKey === "INSTITUTION" && (
              <>
                <div className="flex items-center justify-between rounded-lg bg-[var(--color-surface-elevated)] p-3">
                  <span className="text-sm font-medium text-[var(--color-text-muted)]">
                    {t("profile.contactPerson", undefined, "مسؤول التواصل")}
                  </span>
                  <span className="text-sm font-semibold text-[var(--color-text)]">
                    {user.institution?.contactPersonName || t("profile.notRegistered", undefined, "غير مسجل")}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-[var(--color-surface-elevated)] p-3">
                  <span className="text-sm font-medium text-[var(--color-text-muted)]">
                    {t("profile.commercialRegistry", undefined, "رقم السجل التجاري")}
                  </span>
                  <span className="font-mono text-sm font-semibold text-[var(--color-text)]" dir="ltr">
                    {user.institution?.commercialRegistryNo || t("profile.notRegistered", undefined, "غير مسجل")}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-[var(--color-surface-elevated)] p-3">
                  <span className="text-sm font-medium text-[var(--color-text-muted)]">
                    {t("profile.subscriptionPlan", undefined, "خطة الاشتراك")}
                  </span>
                  <Badge variant="outline">
                    {user.institution?.subscriptionPlan === "monthly"
                      ? t("profile.monthlyPlan", undefined, "شهري")
                      : (user.institution?.subscriptionPlan || t("profile.monthlyPlan", undefined, "شهري"))}
                  </Badge>
                </div>
              </>
            )}

            {/* ADMIN ROLE FIELDS */}
            {roleKey === "ADMIN" && (
              <>
                <div className="flex items-center justify-between rounded-lg bg-[var(--color-surface-elevated)] p-3">
                  <span className="text-sm font-medium text-[var(--color-text-muted)]">
                    {t("profile.permissionLevel", undefined, "مستوى الصلاحية")}
                  </span>
                  <Badge variant="success">
                    <ShieldCheck className="me-1 h-3.5 w-3.5" />
                    {(user.admin?.permissionLevel || user.permissionLevel) === "SUPER_ADMIN"
                      ? t("profile.superAdmin", undefined, "مسؤول أعلى")
                      : t("profile.moderator", undefined, "مشرف")}
                  </Badge>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-[var(--color-surface-elevated)] p-3">
                  <span className="text-sm font-medium text-[var(--color-text-muted)]">
                    {t("rolesAndPermissions", undefined, "نطاق الصلاحيات")}
                  </span>
                  <span className="text-sm font-semibold text-emerald-500">
                    {locale === "ar" ? "وصول كامل لكافة وحدات النظام" : "Full Platform Access"}
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Additional System Information Card ── */}
      <Card className="border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 dark:text-emerald-400">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-[var(--color-text)]">
                {t("profile.systemDetails", undefined, "تفاصيل النظام والحساب")}
              </CardTitle>
              <CardDescription className="text-xs text-[var(--color-text-muted)]">
                {t("profile.accountOverview", undefined, "نظرة عامة على الحساب")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <Separator className="bg-[var(--color-border)]" />

        <CardContent className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 md:grid-cols-3">
          {/* User ID */}
          <div className="rounded-lg bg-[var(--color-surface-elevated)] p-3.5">
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
              <Hash className="h-3.5 w-3.5" />
              <span>{t("common.id", undefined, "المعرّف")}</span>
            </div>
            <p className="mt-1 font-mono text-sm font-semibold text-[var(--color-text)]">
              #{user.id}
            </p>
          </div>

          {/* Join Date */}
          <div className="rounded-lg bg-[var(--color-surface-elevated)] p-3.5">
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
              <Calendar className="h-3.5 w-3.5" />
              <span>{t("profile.joinedDate", undefined, "تاريخ الانضمام")}</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-[var(--color-text)]">
              {formatDate(user.createdAt, locale)}
            </p>
          </div>

          {/* Account Status */}
          <div className="rounded-lg bg-[var(--color-surface-elevated)] p-3.5">
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
              <Activity className="h-3.5 w-3.5" />
              <span>{t("profile.accountStatus", undefined, "حالة الحساب")}</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-emerald-500">
              {user.status === "ACTIVE"
                ? t("profile.active", undefined, "نشط ومفعّل")
                : user.status}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
