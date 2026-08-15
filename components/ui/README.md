# مكوّنات ui — دليل التشغيل

هوية بصرية: **أزرق (blue) وكحلي (slate/navy) وتدرجاتهما** فقط — عبر ألوان Tailwind
الأساسية (slate + blue) دون الحاجة لأي تعديل في tailwind.config، باستثناء
البندين المذكورين أدناه (الحركة + الخط).

## 1) الحزم المطلوبة (npm install)

```bash
npm install clsx tailwind-merge class-variance-authority lucide-react
npm install @radix-ui/react-slot @radix-ui/react-separator @radix-ui/react-avatar \
  @radix-ui/react-checkbox @radix-ui/react-switch @radix-ui/react-radio-group \
  @radix-ui/react-progress @radix-ui/react-slider @radix-ui/react-tabs \
  @radix-ui/react-tooltip @radix-ui/react-popover @radix-ui/react-accordion \
  @radix-ui/react-scroll-area @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @radix-ui/react-select @radix-ui/react-toast
npm install react-day-picker date-fns
npm install @tanstack/react-table
npm install -D tailwindcss-animate
```

## 2) إضافة على tailwind.config.js (مطلوبة لعمل الحركات)

```js
module.exports = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  plugins: [require('tailwindcss-animate')],
  theme: {
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
};
```

## 3) استيراد أنماط react-day-picker (مرة واحدة في layout الجذري)

```ts
import 'react-day-picker/dist/style.css';
```

## 4) مسار الاستيراد (@)

كل الملفات تستورد عبر `@/lib/utils` و `@/components/ui/*`.
تأكد أن `tsconfig.json` يحتوي:

```json
"paths": { "@/*": ["./*"] }
```

## ملاحظات دقة تقنية طُبّقت في كل الملفات

- **RTL أصيل لا مُقحم**: استُخدمت الخصائص المنطقية (`start-`, `end-`, `ps-`,
  `pe-`, `text-start`) بدل `left/right` في كل مكان، فتعمل بشكل صحيح تلقائيًا
  لأن `dir="rtl"` مضبوط على مستوى `<html>` (من ملفات globals.css/arabic.css
  السابقة). لا تكرار كود بين نسخة LTR/RTL.
- **Switch**: اتجاه انزلاق المقبض معكوس فعليًا عبر `rtl:` (متغير Tailwind
  مدمج أصلًا منذ v3.3، بلا أي إضافة خارجية).
- **Progress/Slider**: الامتلاء يبدأ من اليمين (بداية القراءة العربية) عبر
  `bg-gradient-to-l` + معادلة `translateX` مُعاد اشتقاقها عمدًا (بدون إشارة
  سالبة، بعكس نسخة LTR القياسية في shadcn/ui).
- **Pagination**: أيقونتا "السابق/التالي" اختيرتا مباشرة حسب اتجاه القراءة
  العربية (يمين=سابق، يسار=تالي) دون الحاجة لأي `rotate`.
- **RichTextEditor**: محرر غير متحكم فيه (uncontrolled) عمدًا — `value`
  للمحتوى الابتدائي فقط، لتفادي تعارض `contentEditable` مع إعادة رسم React
  في كل ضغطة مفتاح.
- **لا تعارض specificity**: كل صنف مُعرّف مرة واحدة فقط عبر كل الملفات، ولا
  توجد قاعدتان بنفس المُحدِّد تتصارعان.
- كل مكوّن Radix مبني بنمط `React.forwardRef` + `displayName` صريح، متوافق
  مع React DevTools وقابل للتمرير كـ ref من مكونات أعلى.
