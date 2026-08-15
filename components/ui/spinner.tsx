import * as React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap: Record<NonNullable<SpinnerProps['size']>, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-10 w-10',
};

function Spinner({ className, size = 'md', ...props }: SpinnerProps) {
  return (
    <svg
      className={cn('animate-spin text-blue-500', sizeMap[size], className)}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label="جارٍ التحميل"
      {...props}
    >
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export { Spinner };
