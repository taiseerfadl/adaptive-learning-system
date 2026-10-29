import { DepartmentForm as Component } from "@/components/institution/department-form";

export default function Page() {
  return (
    <Component
      loading={false}
      title="إنشاء برنامج أكاديمي"
      description="واجهة إنشاء برنامج أكاديمي ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
