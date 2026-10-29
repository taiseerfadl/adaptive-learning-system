import { CourseList as Component } from "@/components/student/course-list";

export default function Page() {
  return (
    <Component
      loading={false}
      title="دوراتي"
      description="واجهة دوراتي ضمن مساحة المدرب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
