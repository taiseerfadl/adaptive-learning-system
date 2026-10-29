import { QuizInterface as Component } from "@/components/student/quiz-interface";

export default function Page() {
  return (
    <Component
      loading={false}
      title="التقييمات"
      description="واجهة التقييمات ضمن مساحة الطالب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
