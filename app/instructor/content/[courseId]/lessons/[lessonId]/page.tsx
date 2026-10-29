import { LessonBuilder as Component } from "@/components/instructor/lesson-builder";

export default function Page() {
  return (
    <Component
      loading={false}
      title="منشئ الدروس"
      description="واجهة منشئ الدروس ضمن مساحة المدرب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
