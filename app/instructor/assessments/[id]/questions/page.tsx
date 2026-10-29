import { QuestionBuilder as Component } from "@/components/instructor/question-builder";

export default function Page() {
  return (
    <Component
      loading={false}
      title="أسئلة التقييم"
      description="واجهة أسئلة التقييم ضمن مساحة المدرب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
