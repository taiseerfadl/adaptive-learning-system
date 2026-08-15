import * as React from 'react';
import { cn } from '@/lib/utils';
import { Breadcrumbs, type BreadcrumbItem } from './breadcrumbs';

interface PageHeaderProps {
  title: string;
  description?: string;
  /** أزرار أو عناصر إجراء تظهر في جهة النهاية (end) من الرأس، مثل زر "دورة جديدة" */
  actions?: React.ReactNode;
  breadcrumbItems?: BreadcrumbItem[];
  showBreadcrumbs?: boolean;
  className?: string;
}

/**
 * PageHeader — رأس موحّد لكل صفحات لوحة التحكم، يجمع مسار التنقّل والعنوان
 * والوصف وإجراءات الصفحة في تخطيط واحد متجاوب.
 */
function PageHeader({
  title,
  description,
  actions,
  breadcrumbItems,
  showBreadcrumbs = true,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-4 pb-6', className)}>
      {showBreadcrumbs && <Breadcrumbs items={breadcrumbItems} />}

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-bold text-slate-100">{title}</h1>
          {description && <p className="max-w-2xl text-sm leading-relaxed text-slate-500">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2.5">{actions}</div>}
      </div>
    </div>
  );
}

export { PageHeader };
