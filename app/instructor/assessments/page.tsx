import { AssessmentCreator as Component } from "@/components/instructor/assessment-creator";

export default function Page() {
  return (
    <Component
      loading={false}
      title="التقييمات"
      description="واجهة التقييمات ضمن مساحة المدرب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
