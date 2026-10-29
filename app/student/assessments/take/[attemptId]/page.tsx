import { QuizInterface as Component } from "@/components/student/quiz-interface";

export default function Page() {
  return (
    <Component
      loading={false}
      title="أداء التقييم"
      description="واجهة أداء التقييم ضمن مساحة الطالب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
