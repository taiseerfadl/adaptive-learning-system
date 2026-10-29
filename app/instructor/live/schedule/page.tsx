import { LiveSchedule as Component } from "@/components/live/live-schedule";

export default function Page() {
  return (
    <Component
      loading={false}
      title="جدول الجلسات"
      description="واجهة جدول الجلسات ضمن مساحة المدرب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
