import { AuditLogTable as Component } from "@/components/admin/audit-log-table";

export default function Page() {
  return (
    <Component
      loading={false}
      title="سجل التدقيق"
      description="واجهة سجل التدقيق ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
