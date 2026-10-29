import { QuizInterface as Component } from "@/components/student/quiz-interface";

export default function Page() {
  return (
    <Component
      loading={false}
      title="نتيجة التقييم"
      description="واجهة نتيجة التقييم ضمن مساحة الطالب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
