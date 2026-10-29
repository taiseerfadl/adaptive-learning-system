import { RoleCard as Component } from "@/components/admin/role-card";

export default function Page() {
  return (
    <Component
      loading={false}
      title="تفاصيل الدور"
      description="واجهة تفاصيل الدور ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
