import * as React from 'react';
import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gradient-to-l from-slate-800 via-slate-700 to-slate-800',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
