import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';

/**
 * Progress — يمتلئ من اليمين إلى اليسار (اتجاه القراءة العربية)
 * ملاحظة: لا إشارة سالبة في translateX هنا (بعكس نسخة LTR القياسية) عن قصد
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn('relative h-2.5 w-full overflow-hidden rounded-full bg-slate-800', className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 rounded-full bg-gradient-to-l from-blue-400 to-blue-600 transition-transform duration-500 ease-out"
      style={{ transform: `translateX(${100 - (value ?? 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
