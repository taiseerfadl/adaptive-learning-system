'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { SearchInput, Separator } from '@/components/ui';
import { MobileNav } from './mobile-nav';
import { NotificationsDropdown } from './notifications-dropdown';
import { LanguageSwitcher } from './language-switcher';
import { ThemeToggle } from './theme-toggle';
import { UserNav } from './user-nav';
import { useAuth } from '@/contexts/auth-context';

interface TopbarProps {
  /** نص بديل يظهر بدل حقل البحث، مثل عنوان الصفحة الحالية على الجوال */
  onSearch?: (query: string) => void;
}

/**
 * Topbar — الشريط العلوي الثابت لواجهة لوحة التحكم، يعمل جنبًا إلى جنب مع
 * Sidebar (للشاشات الكبيرة) و MobileNav (للجوال) داخل تخطيط app/dashboard/layout.tsx.
 */
function Topbar({ onSearch }: TopbarProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [query, setQuery] = React.useState('');

  function handleSearch(value: string) {
    setQuery(value);
    onSearch?.(value);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim() || !user) return;
    router.push(`/dashboard/${user.accountType}/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-800 bg-slate-950/80 px-4 backdrop-blur-sm sm:px-6">
      {user && <MobileNav accountType={user.accountType} />}

      <form onSubmit={handleSearchSubmit} className="hidden max-w-sm flex-1 sm:block">
        <SearchInput
          value={query}
          onChange={handleSearch}
          placeholder="ابحث عن دورة، طالب، أو شهادة..."
        />
      </form>

      <div className="ms-auto flex items-center gap-1">
        <ThemeToggle />
        <LanguageSwitcher />
        <NotificationsDropdown />
        <Separator orientation="vertical" className="mx-2 h-6" />
        <UserNav />
      </div>
    </header>
  );
}

export { Topbar };
