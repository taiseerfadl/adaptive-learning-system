'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** رقم يظهر كشارة بجانب العنصر، مثل عدد الشكاوى الجديدة */
  badge?: number;
  /** يعتبر العنصر نشطًا فقط عند تطابق كامل للمسار، لا عند كونه مسارًا أبًا */
  exact?: boolean;
}

interface SidebarItemProps {
  item: NavItem;
  /** الوضع المطوي (عرض الأيقونة فقط) المستخدم في الشريط الجانبي المصغّر على الشاشات الكبيرة */
  collapsed?: boolean;
  onNavigate?: () => void;
}

function isItemActive(pathname: string, item: NavItem): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function SidebarItem({ item, collapsed = false, onNavigate }: SidebarItemProps) {
  const pathname = usePathname();
  const Icon = item.icon;
  const active = isItemActive(pathname, item);

  const link = (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50',
        collapsed && 'justify-center px-2.5',
        active ? 'bg-blue-600 text-white shadow-sm shadow-blue-950/40' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
      )}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
      {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
      {!collapsed && item.badge ? (
        <Badge variant={active ? 'outline' : 'default'} className={cn('shrink-0', active && 'border-white/40 text-white')}>
          {item.badge > 99 ? '99+' : item.badge}
        </Badge>
      ) : null}
      {collapsed && item.badge ? (
        <span className="absolute end-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-semibold text-white">
          {item.badge > 9 ? '9+' : item.badge}
        </span>
      ) : null}
    </Link>
  );

  if (!collapsed) return link;

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      {/* side فعلي وليس منطقي في Radix؛ الشريط الجانبي يقع في جهة البداية (يمين
          الواجهة العربية RTL)، لذا تظهر التلميحة بجهة اليسار (left) بعيدًا عنه */}
      <TooltipContent side="left">{item.label}</TooltipContent>
    </Tooltip>
  );
}

export { SidebarItem };
