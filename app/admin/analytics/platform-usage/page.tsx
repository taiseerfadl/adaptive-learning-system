import { PlatformUsageChart as Component } from "@/components/admin/platform-usage-chart";

export default function Page() {
  return (
    <Component
      loading={false}
      title="استخدام المنصة"
      description="واجهة استخدام المنصة ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
