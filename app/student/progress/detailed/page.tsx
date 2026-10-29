import { LearningVelocityChart as Component } from "@/components/analytics/learning-velocity-chart";

export default function Page() {
  return (
    <Component
      loading={false}
      title="تفاصيل التقدم التعليمي"
      description="واجهة تفاصيل التقدم التعليمي ضمن مساحة الطالب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
