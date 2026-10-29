"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Button,
  ScrollArea,
  Separator,
} from "@/components/ui";
import { SidebarItem } from "./sidebar-item";
import { getNavSections } from "./sidebar";
import type { AccountType } from "@/types";
import { useLanguage } from "@/context/language-context";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

interface MobileNavProps {
  accountType: AccountType;
}

/**
 * MobileNav — بديل الشريط الجانبي على الشاشات الصغيرة (أقل من md)، يُفتح
 * كـ Sheet من جهة البداية (start) ليطابق اتجاه القراءة تلقائيًا.
 */
function MobileNav({ accountType }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);
  const { t, dir } = useLanguage();
  const sections = React.useMemo(
    () => getNavSections(accountType, t),
    [accountType, t],
  );
  const homeHref =
    accountType === "trainer" ? "/instructor" : `/${accountType}`;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={t("nav.openNav", undefined, "فتح قائمة التنقّل")}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="start" dir={dir} className="flex w-72 flex-col p-0 text-start">
        <SheetHeader className="px-4 pt-5">
          <div className="flex items-center justify-between">
            <Link
              href={homeHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                {t("common.appNameShort", undefined, "م")}
              </span>
              <SheetTitle className="text-sm">
                {t("common.appName", undefined, "منصة التعلّم التكيفي")}
              </SheetTitle>
            </Link>
          </div>
        </SheetHeader>

        <div className="flex items-center justify-center gap-3 px-4 pt-4">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        <Separator className="mt-4" />

        <ScrollArea dir={dir} className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-5">
            {sections.map((section, index) => (
              <div key={section.title ?? index} className="flex flex-col gap-1">
                {section.title && (
                  <h3 className="px-3 pb-1 text-xs font-semibold text-[var(--color-text-muted)] text-start">
                    {section.title}
                  </h3>
                )}
                {section.items.map((item) => (
                  <SidebarItem
                    key={item.href}
                    item={item}
                    onNavigate={() => setOpen(false)}
                  />
                ))}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export { MobileNav };
