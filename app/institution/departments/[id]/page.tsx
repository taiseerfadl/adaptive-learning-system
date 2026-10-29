import { DepartmentList as Component } from "@/components/institution/department-list";

export default function Page() {
  return (
    <Component
      loading={false}
      title="تفاصيل القسم"
      description="واجهة تفاصيل القسم ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
