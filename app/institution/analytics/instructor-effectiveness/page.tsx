import { InstructorEffectivenessChart as Component } from "@/components/institution/instructor-effectiveness-chart";

export default function Page() {
  return (
    <Component
      loading={false}
      title="فاعلية المدربين"
      description="واجهة فاعلية المدربين ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
