import { InstructorAssign as Component } from "@/components/institution/instructor-assign";

export default function Page() {
  return (
    <Component
      loading={false}
      title="تعيين مدرب"
      description="واجهة تعيين مدرب ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
