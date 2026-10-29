import { RevenueChart as Component } from "@/components/admin/revenue-chart";

export default function Page() {
  return (
    <Component
      loading={false}
      title="تحليلات الإيرادات"
      description="واجهة تحليلات الإيرادات ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
