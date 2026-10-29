# UI Components — Adaptive Learning System

مكونات واجهة موحّدة لمنصة **أكاديمية التعلم الذكي**، بألوان الأزرق والكحلي، مع دعم الوضع الفاتح والداكن وواجهة RTL.

## محتويات الحزمة

تحتوي هذه الحزمة على ملفات المكونات داخل مجلد `ui/`، وتشمل الأزرار، الحقول، الجداول، القوائم، الحوارات، التبويبات، التنبيهات، التقويم، السويتش، ومبدّل الوضع `ThemeToggle`.

## قبل النسخ

- انسخي مجلد `ui` إلى `components/ui` في مشروع Next.js.
- الملفات تستخدم المساعد `cn` من `@/lib/utils`، لذلك يجب أن يكون موجودًا في مشروعك ويجمع `clsx` مع `tailwind-merge`.
- أضيفي `@/*` في `tsconfig.json` إذا لم يكن موجودًا:
  ```json
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": { "@/*": ["./*"] }
    }
  }
  ```
- أضيفي `ThemeProvider` في `app/layout.tsx` حول محتوى التطبيق، مع إبقاء `AuthProvider` الحالي داخلَه. يجب أن يكون `ThemeProvider` من `next-themes` مفعّلًا حتى يعمل `ThemeToggle`.
- المكونات تستخدم متغيرات الألوان الموجودة في ملفات الستايل السابقة، مثل `--color-surface` و`--color-text` و`--color-border` و`--color-surface-hover` و`--color-primary-500`. لا تحذفي ملف `variables.css` الذي يعرّفها.

## الحزم الخارجية المستخدمة

تحققي من وجود هذه الحزم في `package.json` قبل تثبيتها، ولا تثبّتي نسخة ثانية إذا كانت موجودة:

```bash
pnpm add clsx tailwind-merge class-variance-authority lucide-react next-themes
pnpm add @radix-ui/react-slot @radix-ui/react-separator @radix-ui/react-avatar
pnpm add @radix-ui/react-checkbox @radix-ui/react-switch @radix-ui/react-radio-group
pnpm add @radix-ui/react-progress @radix-ui/react-slider @radix-ui/react-tabs
pnpm add @radix-ui/react-tooltip @radix-ui/react-popover @radix-ui/react-accordion
pnpm add @radix-ui/react-scroll-area @radix-ui/react-dialog @radix-ui/react-dropdown-menu
pnpm add @radix-ui/react-select @radix-ui/react-toast @tanstack/react-table
pnpm add react-day-picker@^8.10.1 date-fns
pnpm add -D tailwindcss-animate
```

> ملاحظة: ملف `calendar.tsx` مكتوب لواجهة `react-day-picker` v8؛ إذا كان مشروعك يستخدم v9، فيجب مواءمة مفاتيح `classNames` و`components` مع الإصدار المثبت بدل تغيير إصدار الحزمة عشوائيًا.

## إعداد Tailwind

المكونات تستخدم Tailwind CSS v3 وأصناف `animate-in` و`animate-out`. إن لم يكن `tailwindcss-animate` مضافًا إلى إعداد Tailwind، أضيفيه إلى `plugins` في `tailwind.config.ts`:

```ts
import tailwindcssAnimate from 'tailwindcss-animate';

// داخل إعدادات config:
plugins: [tailwindcssAnimate],
```

أبقي مسارات `content` شاملة للمجلدات التي تحتوي صفحات ومكونات المشروع، مثل `app`, `components`, `context` و`lib`.

## التصدير

يمكن الاستيراد من الملفات مباشرة، أو من `components/ui` عبر `index.ts`، مثل:

```tsx
import { Button, Input, Switch, Dialog, ThemeToggle } from '@/components/ui';
```

قد تحتاج بعض المكونات إلى استيرادها من ملفها مباشرة إذا لم تكن ضمن القائمة المختارة في مشروعك.

## ملاحظات

- تمت مواءمة ألوان الخلفيات والنصوص والحدود مع متغيرات الوضعين الفاتح والداكن بدل تثبيت معظم المكونات على درجات داكنة فقط.
- تمت المحافظة على الخصائص المنطقية المناسبة لواجهة RTL قدر الإمكان.
- تم تصحيح مسافة حركة مقبض `Switch` لتناسب عرض المسار وتبقى داخل حدوده.
- هذه الحزمة تضم مكونات UI فقط؛ لا تحتوي ملفات المشروع كاملة، ولا `package.json` أو `tsconfig.json` أو ملفات الستايل نفسها. لذلك يلزم تشغيل فحص TypeScript داخل مشروعك بعد الدمج للتأكد من توافق إصدارات الحزم الفعلية.
