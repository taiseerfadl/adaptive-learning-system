"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Badge,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui";
import { useLanguage } from "@/context/language-context";

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

function SidebarItem({
  item,
  collapsed = false,
  onNavigate,
}: SidebarItemProps) {
  const pathname = usePathname();
  const { dir } = useLanguage();
  const Icon = item.icon;
  const active = isItemActive(pathname, item);

  const link = (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-start",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
        collapsed && "justify-center px-2.5",
        active
          ? "bg-blue-600 text-white shadow-sm shadow-blue-950/40"
          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]",
      )}
    >
      {/* 1. الأيقونة: تظهر في جهة البداية (Start) - على الجانب الأيمن في RTL، وعلى الأيسر في LTR */}
      <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />

      {/* 2. النص: يظهر بجانب الأيقونة ممتداً نحو اليسار في RTL ونحو اليمين في LTR */}
      {!collapsed && (
        <span className="flex-1 truncate text-start">{item.label}</span>
      )}

      {/* 3. الشارة: تظهر في جهة النهاية (End) */}
      {!collapsed && item.badge ? (
        <Badge
          variant={active ? "outline" : "default"}
          className={cn("shrink-0", active && "border-white/40 text-white")}
        >
          {item.badge > 99 ? "99+" : item.badge}
        </Badge>
      ) : null}

      {collapsed && item.badge ? (
        <span className="absolute end-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-semibold text-white">
          {item.badge > 9 ? "9+" : item.badge}
        </span>
      ) : null}
    </Link>
  );

  if (!collapsed) return link;

  const tooltipSide = dir === "rtl" ? "left" : "right";

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side={tooltipSide}>{item.label}</TooltipContent>
    </Tooltip>
  );
}

export { SidebarItem };
