import { CourseList as Component } from "@/components/student/course-list";

export default function Page() {
  return (
    <Component
      loading={false}
      title="تفاصيل الدورة"
      description="واجهة تفاصيل الدورة ضمن مساحة الطالب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
