import { DepartmentForm as Component } from "@/components/institution/department-form";

export default function Page() {
  return (
    <Component
      loading={false}
      title="إنشاء قسم"
      description="واجهة إنشاء قسم ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
