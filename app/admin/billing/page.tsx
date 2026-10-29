import { BillingCard as Component } from "@/components/admin/billing-card";

export default function Page() {
  return (
    <Component
      loading={false}
      title="الفوترة والاشتراكات"
      description="واجهة الفوترة والاشتراكات ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
