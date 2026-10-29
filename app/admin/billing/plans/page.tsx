import { PlanManager as Component } from "@/components/admin/plan-manager";

export default function Page() {
  return (
    <Component
      loading={false}
      title="خطط الاشتراك"
      description="واجهة خطط الاشتراك ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
