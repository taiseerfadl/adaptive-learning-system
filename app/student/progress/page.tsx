import { AdaptiveProgressChart as Component } from "@/components/analytics/adaptive-progress-chart";

export default function Page() {
  return (
    <Component
      loading={false}
      title="التقدم التعليمي"
      description="واجهة التقدم التعليمي ضمن مساحة الطالب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
