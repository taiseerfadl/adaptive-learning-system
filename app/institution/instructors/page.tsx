import { InstructorCard as Component } from "@/components/institution/instructor-card";

export default function Page() {
  return (
    <Component
      loading={false}
      title="المدربون"
      description="واجهة المدربون ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
