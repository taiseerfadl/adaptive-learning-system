import { InstructorCard as Component } from "@/components/institution/instructor-card";

export default function Page() {
  return (
    <Component
      loading={false}
      title="ملف المدرب"
      description="واجهة ملف المدرب ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
