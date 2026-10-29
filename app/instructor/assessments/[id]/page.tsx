import { AssessmentCreator as Component } from "@/components/instructor/assessment-creator";

export default function Page() {
  return (
    <Component
      loading={false}
      title="تفاصيل التقييم"
      description="واجهة تفاصيل التقييم ضمن مساحة المدرب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
