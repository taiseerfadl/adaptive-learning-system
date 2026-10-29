"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { User as UserIcon, Settings, LogOut } from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui";
import { useAuth } from "@/context/auth-context";
import { useLanguage } from "@/context/language-context";

function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "؟";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function UserNav() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  if (!user) return null;

  async function handleLogout() {
    await logout();
    router.push("/auth/login");
  }

  const roleLabel =
    t(`roles.${user.accountType}`, undefined, user.accountType);

  const normalizedRole = (user.role || user.accountType || "").toUpperCase();

  const profileHref =
    normalizedRole === "INSTRUCTOR" || normalizedRole === "TRAINER"
      ? "/instructor/profile"
      : normalizedRole === "STUDENT"
        ? "/student/profile"
        : normalizedRole === "INSTITUTION"
          ? "/institution/profile"
          : "/admin/profile";
  const settingsHref =
    normalizedRole === "INSTRUCTOR" || normalizedRole === "TRAINER"
      ? "/instructor/profile/edit"
      : normalizedRole === "STUDENT"
        ? "/student/profile/edit"
        : normalizedRole === "INSTITUTION"
          ? "/institution/settings"
          : "/admin/system/general";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
          aria-label={t("nav.userMenu", undefined, "قائمة المستخدم")}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.profileImageUrl} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex flex-col gap-0.5 px-2.5 py-2">
          <span className="truncate text-sm font-semibold text-[var(--color-text)]">
            {user.name}
          </span>
          <span className="truncate text-xs font-normal text-[var(--color-text-muted)]">
            {user.email}
          </span>
          <span className="mt-1 w-fit rounded-full bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-300">
            {roleLabel}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={profileHref}>
            <UserIcon className="h-4 w-4" aria-hidden="true" />
            {t("nav.myProfile", undefined, "الملف الشخصي")}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={settingsHref}>
            <Settings className="h-4 w-4" aria-hidden="true" />
            {t("nav.settings", undefined, "الإعدادات")}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={handleLogout}
          className="text-red-400 focus:bg-red-500/10 focus:text-red-300"
        >
          <LogOut className="icon-directional h-4 w-4" aria-hidden="true" />
          {t("nav.logout", undefined, "تسجيل الخروج")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { UserNav };
