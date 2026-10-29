import { GrowthMetrics as Component } from "@/components/admin/growth-metrics";

export default function Page() {
  return (
    <Component
      loading={false}
      title="مؤشرات النمو"
      description="واجهة مؤشرات النمو ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
