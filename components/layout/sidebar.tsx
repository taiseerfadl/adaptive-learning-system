"use client";

import * as React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  Route,
  ClipboardCheck,
  Award,
  Wallet,
  Radio,
  MessageSquare,
  Users,
  Building2,
  FileBarChart,
  AlertCircle,
  CreditCard,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea, Separator, TooltipProvider } from "@/components/ui";
import { SidebarItem, type NavItem } from "./sidebar-item";
import type { AccountType } from "@/types";
import { useLanguage } from "@/context/language-context";

export interface NavSection {
  title?: string;
  items: NavItem[];
}

/**
 * خرائط التنقّل حسب نوع الحساب — مصدر واحد يُعاد استخدامه في MobileNav أيضًا
 * حتى لا تتكرر قائمة الروابط في مكانين.
 */
function getNavSections(
  accountType: AccountType,
  t: (key: string, vars?: Record<string, string | number>, fallback?: string) => string = (_, __, f) => f || "",
): NavSection[] {
  switch (accountType) {
    case "student":
      return [
        {
          items: [
            {
              label: t("nav.dashboard", undefined, "لوحة التحكم"),
              href: "/student",
              icon: LayoutDashboard,
              exact: true,
            },
          ],
        },
        {
          title: t("nav.learning", undefined, "التعلّم"),
          items: [
            { label: t("nav.myCourses", undefined, "دوراتي"), href: "/student/courses", icon: BookOpen },
            { label: t("nav.learningPath", undefined, "التقدم والمسار"), href: "/student/progress", icon: Route },
            {
              label: t("nav.assessments", undefined, "التقييمات"),
              href: "/student/assessments",
              icon: ClipboardCheck,
            },
            { label: t("nav.liveSessions", undefined, "الجلسات المباشرة"), href: "/student/live", icon: Radio },
          ],
        },
        {
          title: t("nav.communicationAndAccount", undefined, "التواصل والحساب"),
          items: [
            { label: t("nav.chats", undefined, "المحادثات"), href: "/student/chat", icon: MessageSquare },
            {
              label: t("nav.notifications", undefined, "الإشعارات"),
              href: "/student/notifications",
              icon: AlertCircle,
            },
            { label: t("nav.profile", undefined, "الملف الشخصي"), href: "/student/profile", icon: Award },
          ],
        },
      ];

    case "trainer":
      return [
        {
          items: [
            {
              label: t("nav.dashboard", undefined, "لوحة التحكم"),
              href: "/instructor",
              icon: LayoutDashboard,
              exact: true,
            },
          ],
        },
        {
          title: t("nav.educationManagement", undefined, "إدارة التعليم"),
          items: [
            { label: t("nav.myCourses", undefined, "دوراتي"), href: "/instructor/my-courses", icon: BookOpen },
            {
              label: t("nav.contentAndLessons", undefined, "المحتوى والدروس"),
              href: "/instructor/content",
              icon: Route,
            },
            { label: t("nav.students", undefined, "الطلاب"), href: "/instructor/students", icon: Users },
            {
              label: t("nav.assessments", undefined, "التقييمات"),
              href: "/instructor/assessments",
              icon: ClipboardCheck,
            },
            {
              label: t("nav.liveSessions", undefined, "الجلسات المباشرة"),
              href: "/instructor/live",
              icon: Radio,
            },
          ],
        },
        {
          title: t("nav.monitoring", undefined, "المتابعة"),
          items: [
            {
              label: t("nav.analytics", undefined, "التحليلات"),
              href: "/instructor/analytics",
              icon: FileBarChart,
            },
            {
              label: t("nav.chats", undefined, "المحادثات"),
              href: "/instructor/chat",
              icon: MessageSquare,
            },
            { label: t("nav.profile", undefined, "الملف الشخصي"), href: "/instructor/profile", icon: Award },
          ],
        },
      ];

    case "institution":
      return [
        {
          items: [
            {
              label: t("nav.dashboard", undefined, "لوحة التحكم"),
              href: "/institution",
              icon: LayoutDashboard,
              exact: true,
            },
          ],
        },
        {
          title: t("nav.institutionManagement", undefined, "إدارة المؤسسة"),
          items: [
            {
              label: t("nav.departments", undefined, "الأقسام"),
              href: "/institution/departments",
              icon: Building2,
            },
            {
              label: t("nav.academicPrograms", undefined, "البرامج الأكاديمية"),
              href: "/institution/programs",
              icon: BookOpen,
            },
            {
              label: t("nav.courses", undefined, "الدورات"),
              href: "/institution/courses",
              icon: ClipboardCheck,
            },
            {
              label: t("nav.trainers", undefined, "المدربون"),
              href: "/institution/instructors",
              icon: Users,
            },
            { label: t("nav.students", undefined, "الطلاب"), href: "/institution/students", icon: Award },
          ],
        },
        {
          title: t("nav.reportsAndManagement", undefined, "التقارير والإدارة"),
          items: [
            {
              label: t("nav.reports", undefined, "التقارير"),
              href: "/institution/reports",
              icon: FileBarChart,
            },
            { label: t("nav.analytics", undefined, "التحليلات"), href: "/institution/analytics", icon: Route },
            {
              label: t("nav.liveMonitoring", undefined, "الجلسات المباشرة"),
              href: "/institution/live-monitor",
              icon: Radio,
            },
            {
              label: t("nav.chats", undefined, "المحادثات"),
              href: "/institution/chat",
              icon: MessageSquare,
            },
            {
              label: t("nav.profile", undefined, "الملف الشخصي"),
              href: "/institution/profile",
              icon: Award,
            },
            {
              label: t("nav.settings", undefined, "الإعدادات"),
              href: "/institution/settings",
              icon: Settings,
            },
          ],
        },
      ];

    case "admin":
      return [
        {
          items: [
            {
              label: t("nav.dashboard", undefined, "لوحة التحكم"),
              href: "/admin",
              icon: LayoutDashboard,
              exact: true,
            },
          ],
        },
        {
          title: t("nav.platformManagement", undefined, "إدارة المنصة"),
          items: [
            { label: t("nav.users", undefined, "المستخدمون"), href: "/admin/users", icon: Users },
            { label: t("nav.institutions", undefined, "المؤسسات"), href: "/admin/institutions", icon: Building2 },
            { label: t("nav.rolesAndPermissions", undefined, "الأدوار والصلاحيات"), href: "/admin/roles", icon: Award },
            {
              label: t("nav.liveMonitoring", undefined, "الجلسات المباشرة"),
              href: "/admin/live-overview",
              icon: Radio,
            },
            { label: t("nav.chats", undefined, "المحادثات"), href: "/admin/chat", icon: MessageSquare },
          ],
        },
        {
          title: t("nav.operationsAndReports", undefined, "العمليات والتقارير"),
          items: [
            { label: t("nav.billing", undefined, "الفوترة"), href: "/admin/billing", icon: CreditCard },
            {
              label: t("nav.announcements", undefined, "الإعلانات"),
              href: "/admin/announcements",
              icon: AlertCircle,
            },
            {
              label: t("nav.analytics", undefined, "التحليلات"),
              href: "/admin/analytics",
              icon: FileBarChart,
            },
            { label: t("nav.support", undefined, "الدعم الفني"), href: "/admin/support", icon: Wallet },
            {
              label: t("nav.auditLog", undefined, "سجل التدقيق"),
              href: "/admin/audit",
              icon: ClipboardCheck,
            },
            {
              label: t("nav.profile", undefined, "الملف الشخصي"),
              href: "/admin/profile",
              icon: Award,
            },
            { label: t("nav.systemSettings", undefined, "إعدادات النظام"), href: "/admin/system", icon: Settings },
          ],
        },
      ];

    default:
      return [];
  }
}

interface SidebarProps {
  accountType: AccountType;
  className?: string;
}

/**
 * Sidebar — شريط تنقّل ثابت للشاشات المتوسطة فأكبر (md+)، يدعم الطي إلى
 * وضع الأيقونات فقط. للجوال استخدم MobileNav (Sheet منفصل بنفس مصدر الروابط).
 */
function Sidebar({ accountType, className }: SidebarProps) {
  const [collapsed, setCollapsed] = React.useState(false);
  const { t, dir } = useLanguage();
  const homeHref =
    accountType === "trainer" ? "/instructor" : `/${accountType}`;
  const sections = React.useMemo(
    () => getNavSections(accountType, t),
    [accountType, t],
  );

  return (
    <TooltipProvider>
      <aside
        dir={dir}
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-e border-[var(--color-border)] bg-[var(--color-bg)] backdrop-blur-sm transition-[width] duration-200 md:flex text-start",
          collapsed ? "w-[76px]" : "w-64",
          className,
        )}
      >
        <div
          className={cn(
            "flex h-16 items-center gap-2.5 px-4",
            collapsed && "justify-center px-2",
          )}
        >
          <Link
            href={homeHref}
            className="flex items-center gap-2.5 overflow-hidden"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
              {t("common.appNameShort", undefined, "م")}
            </span>
            {!collapsed && (
              <span className="truncate text-sm font-semibold text-[var(--color-text)]">
                {t("common.appName", undefined, "منصة التعلّم التكيفي")}
              </span>
            )}
          </Link>
        </div>

        <Separator />

        <ScrollArea dir={dir} className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-5">
            {sections.map((section, index) => (
              <div key={section.title ?? index} className="flex flex-col gap-1">
                {section.title && !collapsed && (
                  <h3 className="px-3 pb-1 text-xs font-semibold text-[var(--color-text-muted)] text-start">
                    {section.title}
                  </h3>
                )}
                {section.items.map((item) => (
                  <SidebarItem
                    key={item.href}
                    item={item}
                    collapsed={collapsed}
                  />
                ))}
              </div>
            ))}
          </nav>
        </ScrollArea>

        <Separator />

        <div className="p-3">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)] text-start",
              collapsed && "justify-center px-2.5",
            )}
            aria-label={
              collapsed
                ? t("nav.expandSidebar", undefined, "توسيع الشريط الجانبي")
                : t("nav.collapseSidebar", undefined, "طي القائمة")
            }
          >
            {collapsed ? (
              <PanelLeftOpen className="icon-directional h-[18px] w-[18px]" />
            ) : (
              <PanelLeftClose className="icon-directional h-[18px] w-[18px]" />
            )}
            {!collapsed && <span>{t("nav.collapseSidebar", undefined, "طي القائمة")}</span>}
          </button>
        </div>
      </aside>
    </TooltipProvider>
  );
}

export { Sidebar, getNavSections };
