'use client';

/**
 * LanguageSwitcher — يفترض بنية توجيه دولية بنمط next-intl/middleware
 * (المسار يبدأ بـ /ar أو /en) ويحفظ الاختيار في كوكي NEXT_LOCALE ليقرأه
 * الميدل وير عند الطلب التالي. عدّل الدالة handleSelect إن كانت آلية
 * تبديل اللغة في المشروع مختلفة (state عام مثلًا).
 */

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Languages, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Button,
} from '@/components/ui';

type Locale = 'ar' | 'en';

const LOCALES: { value: Locale; label: string; nativeLabel: string }[] = [
  { value: 'ar', label: 'العربية', nativeLabel: 'AR' },
  { value: 'en', label: 'English', nativeLabel: 'EN' },
];

interface LanguageSwitcherProps {
  currentLocale?: Locale;
}

function LanguageSwitcher({ currentLocale = 'ar' }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  function handleSelect(locale: Locale) {
    if (locale === currentLocale) return;
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;

    const segments = pathname.split('/');
    const hasLocalePrefix = segments[1] === 'ar' || segments[1] === 'en';
    if (hasLocalePrefix) {
      segments[1] = locale;
      router.push(segments.join('/') || '/');
    } else {
      router.push(pathname);
    }
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="تغيير اللغة">
          <Languages className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        {LOCALES.map((locale) => (
          <DropdownMenuItem key={locale.value} onSelect={() => handleSelect(locale.value)}>
            <span className="flex-1">{locale.label}</span>
            {locale.value === currentLocale && <Check className="h-4 w-4 text-blue-400" aria-hidden="true" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { LanguageSwitcher };
