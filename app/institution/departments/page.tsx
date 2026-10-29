import { DepartmentList as Component } from "@/components/institution/department-list";

export default function Page() {
  return (
    <Component
      loading={false}
      title="الأقسام"
      description="واجهة الأقسام ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
