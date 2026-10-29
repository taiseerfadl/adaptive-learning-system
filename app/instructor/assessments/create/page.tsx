import { AssessmentCreator as Component } from "@/components/instructor/assessment-creator";

export default function Page() {
  return (
    <Component
      loading={false}
      title="إنشاء تقييم"
      description="واجهة إنشاء تقييم ضمن مساحة المدرب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
