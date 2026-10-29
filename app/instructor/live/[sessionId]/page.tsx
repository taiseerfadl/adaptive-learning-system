import { LiveSessionList as Component } from "@/components/live/live-session-list";

export default function Page() {
  return (
    <Component
      loading={false}
      title="تفاصيل الجلسة المباشرة"
      description="واجهة تفاصيل الجلسة المباشرة ضمن مساحة المدرب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
