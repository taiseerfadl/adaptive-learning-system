import * as React from 'react';
import { ChevronRight, ChevronLeft, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ButtonProps } from './button';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav aria-label="التنقل بين الصفحات" className={cn('flex items-center justify-center gap-1', className)} {...props} />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, ...props }, ref) => <li ref={ref} className={className} {...props} />
);
PaginationItem.displayName = 'PaginationItem';

interface PaginationLinkProps extends React.ComponentProps<'button'> {
  isActive?: boolean;
  size?: ButtonProps['size'];
}

const PaginationLink = ({ className, isActive, ...props }: PaginationLinkProps) => (
  <button
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      'inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors',
      isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800',
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

/* ملاحظة اتجاه: السهم الأيمن (ChevronRight) هو "السابق" فعليًا في RTL
   لأن القراءة العربية تتقدم من اليمين لليسار — لا حاجة لأي rtl:rotate هنا */
const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="الصفحة السابقة" className={cn('h-9 w-auto gap-1 px-3', className)} {...props}>
    <ChevronRight className="h-4 w-4" />
    <span>السابق</span>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="الصفحة التالية" className={cn('h-9 w-auto gap-1 px-3', className)} {...props}>
    <span>التالي</span>
    <ChevronLeft className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span aria-hidden className={cn('flex h-9 w-9 items-center justify-center text-slate-500', className)} {...props}>
    <MoreHorizontal className="h-4 w-4" />
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
