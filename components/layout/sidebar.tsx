'use client';

import * as React from 'react';
import Link from 'next/link';
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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea, Separator, TooltipProvider } from '@/components/ui';
import { SidebarItem, type NavItem } from './sidebar-item';
import type { AccountType } from '@/types';

export interface NavSection {
  title?: string;
  items: NavItem[];
}

/**
 * خرائط التنقّل حسب نوع الحساب — مصدر واحد يُعاد استخدامه في MobileNav أيضًا
 * حتى لا تتكرر قائمة الروابط في مكانين.
 */
function getNavSections(accountType: AccountType): NavSection[] {
  switch (accountType) {
    case 'student':
      return [
        {
          items: [{ label: 'لوحة التحكم', href: '/dashboard/student', icon: LayoutDashboard, exact: true }],
        },
        {
          title: 'التعلّم',
          items: [
            { label: 'دوراتي', href: '/dashboard/student/courses', icon: BookOpen },
            { label: 'المسار التكيفي', href: '/dashboard/student/path', icon: Route },
            { label: 'التقييمات', href: '/dashboard/student/assessments', icon: ClipboardCheck },
            { label: 'البث المباشر', href: '/dashboard/student/live', icon: Radio },
          ],
        },
        {
          title: 'الإنجازات',
          items: [
            { label: 'الشهادات', href: '/dashboard/student/certificates', icon: Award },
            { label: 'المحفظة', href: '/dashboard/student/wallet', icon: Wallet },
          ],
        },
        {
          items: [
            { label: 'الدردشة', href: '/dashboard/student/chat', icon: MessageSquare },
            { label: 'الإعدادات', href: '/dashboard/student/settings', icon: Settings },
          ],
        },
      ];

    case 'trainer':
      return [
        {
          items: [{ label: 'لوحة التحكم', href: '/dashboard/trainer', icon: LayoutDashboard, exact: true }],
        },
        {
          title: 'إدارة التدريب',
          items: [
            { label: 'دوراتي', href: '/dashboard/trainer/courses', icon: BookOpen },
            { label: 'طلابي', href: '/dashboard/trainer/students', icon: Users },
            { label: 'الجلسات المباشرة', href: '/dashboard/trainer/live', icon: Radio },
            { label: 'التقييمات والأسئلة', href: '/dashboard/trainer/assessments', icon: ClipboardCheck },
          ],
        },
        {
          items: [
            { label: 'الشكاوى', href: '/dashboard/trainer/complaints', icon: AlertCircle },
            { label: 'الدردشة', href: '/dashboard/trainer/chat', icon: MessageSquare },
            { label: 'الإعدادات', href: '/dashboard/trainer/settings', icon: Settings },
          ],
        },
      ];

    case 'institution':
      return [
        {
          items: [{ label: 'لوحة التحكم', href: '/dashboard/institution', icon: LayoutDashboard, exact: true }],
        },
        {
          title: 'إدارة المؤسسة',
          items: [
            { label: 'المدربون', href: '/dashboard/institution/trainers', icon: Users },
            { label: 'الدورات', href: '/dashboard/institution/courses', icon: BookOpen },
            { label: 'الشهادات المعتمدة', href: '/dashboard/institution/certificates', icon: Award },
            { label: 'التقارير', href: '/dashboard/institution/reports', icon: FileBarChart },
          ],
        },
        {
          items: [
            { label: 'المدفوعات', href: '/dashboard/institution/payments', icon: CreditCard },
            { label: 'الإعدادات', href: '/dashboard/institution/settings', icon: Settings },
          ],
        },
      ];

    case 'admin':
      return [
        {
          items: [{ label: 'لوحة التحكم', href: '/dashboard/admin', icon: LayoutDashboard, exact: true }],
        },
        {
          title: 'إدارة النظام',
          items: [
            { label: 'المستخدمون', href: '/dashboard/admin/users', icon: Users },
            { label: 'المؤسسات', href: '/dashboard/admin/institutions', icon: Building2 },
            { label: 'المدربون', href: '/dashboard/admin/trainers', icon: Users },
            { label: 'الدورات', href: '/dashboard/admin/courses', icon: BookOpen },
          ],
        },
        {
          title: 'الرقابة والمالية',
          items: [
            { label: 'الشكاوى', href: '/dashboard/admin/complaints', icon: AlertCircle },
            { label: 'المدفوعات', href: '/dashboard/admin/payments', icon: CreditCard },
            { label: 'التقارير', href: '/dashboard/admin/reports', icon: FileBarChart },
          ],
        },
        {
          items: [{ label: 'الإعدادات', href: '/dashboard/admin/settings', icon: Settings }],
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
  const sections = React.useMemo(() => getNavSections(accountType), [accountType]);

  return (
    <TooltipProvider>
      <aside
        className={cn(
          'sticky top-0 hidden h-screen shrink-0 flex-col border-e border-slate-800 bg-slate-950/60 backdrop-blur-sm transition-[width] duration-200 md:flex',
          collapsed ? 'w-[76px]' : 'w-64',
          className
        )}
      >
        <div className={cn('flex h-16 items-center gap-2.5 px-4', collapsed && 'justify-center px-2')}>
          <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
              م
            </span>
            {!collapsed && <span className="truncate text-sm font-semibold text-slate-100">منصة التعلّم التكيفي</span>}
          </Link>
        </div>

        <Separator />

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-5">
            {sections.map((section, index) => (
              <div key={section.title ?? index} className="flex flex-col gap-1">
                {section.title && !collapsed && (
                  <h3 className="px-3 pb-1 text-xs font-semibold text-slate-600">{section.title}</h3>
                )}
                {section.items.map((item) => (
                  <SidebarItem key={item.href} item={item} collapsed={collapsed} />
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
              'flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-200',
              collapsed && 'justify-center px-2.5'
            )}
            aria-label={collapsed ? 'توسيع الشريط الجانبي' : 'طي الشريط الجانبي'}
          >
            {collapsed ? (
              <PanelLeftOpen className="icon-directional h-[18px] w-[18px]" />
            ) : (
              <PanelLeftClose className="icon-directional h-[18px] w-[18px]" />
            )}
            {!collapsed && <span>طي القائمة</span>}
          </button>
        </div>
      </aside>
    </TooltipProvider>
  );
}

export { Sidebar, getNavSections };
