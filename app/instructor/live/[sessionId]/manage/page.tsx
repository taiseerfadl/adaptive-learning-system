import { LiveControls as Component } from "@/components/live/live-controls";

export default function Page() {
  return (
    <Component
      loading={false}
      title="إدارة الجلسة المباشرة"
      description="واجهة إدارة الجلسة المباشرة ضمن مساحة المدرب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
