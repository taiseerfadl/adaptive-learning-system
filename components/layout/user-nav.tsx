'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User as UserIcon, Settings, LogOut, Wallet } from 'lucide-react';
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
} from '@/components/ui';
import { useAuth } from '@/contexts/auth-context';
import type { AccountType } from '@/types';

const ROLE_LABELS: Record<AccountType, string> = {
  student: 'طالب',
  trainer: 'مدرب',
  institution: 'مؤسسة تعليمية',
  admin: 'إدارة النظام',
};

function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '؟';
  if (parts.length === 1) return parts[0].slice(0, 2);
  return `${parts[0][0]}${parts[1][0]}`;
}

function UserNav() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  async function handleLogout() {
    await logout();
    router.push('/login');
  }

  const settingsHref = `/dashboard/${user.accountType}/settings`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
          aria-label="قائمة المستخدم"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.profileImageUrl} alt={user.fullName} />
            <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex flex-col gap-0.5 px-2.5 py-2">
          <span className="truncate text-sm font-semibold text-slate-100">{user.fullName}</span>
          <span className="truncate text-xs font-normal text-slate-500">{user.email}</span>
          <span className="mt-1 w-fit rounded-full bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-300">
            {ROLE_LABELS[user.accountType]}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={`/dashboard/${user.accountType}/profile`}>
            <UserIcon className="h-4 w-4" aria-hidden="true" />
            الملف الشخصي
          </Link>
        </DropdownMenuItem>

        {user.accountType === 'student' && (
          <DropdownMenuItem asChild>
            <Link href="/dashboard/student/wallet">
              <Wallet className="h-4 w-4" aria-hidden="true" />
              المحفظة
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <Link href={settingsHref}>
            <Settings className="h-4 w-4" aria-hidden="true" />
            الإعدادات
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            handleLogout();
          }}
          className="text-red-400 focus:bg-red-500/10 focus:text-red-300"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          تسجيل الخروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { UserNav };
