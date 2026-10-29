import { PerformanceOverview as Component } from "@/components/instructor/performance-overview";

export default function Page() {
  return (
    <Component
      loading={false}
      title="أداء الدورات"
      description="واجهة أداء الدورات ضمن مساحة المدرب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
