import { DepartmentPerformanceChart as Component } from "@/components/institution/department-performance-chart";

export default function Page() {
  return (
    <Component
      loading={false}
      title="أداء الأقسام"
      description="واجهة أداء الأقسام ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
