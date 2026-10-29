import { AssessmentCreator as Component } from "@/components/instructor/assessment-creator";

export default function Page() {
  return (
    <Component
      loading={false}
      title="إنشاء جلسة مباشرة"
      description="واجهة إنشاء جلسة مباشرة ضمن مساحة المدرب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
