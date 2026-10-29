import { SecuritySettings as Component } from "@/components/admin/security-settings";

export default function Page() {
  return (
    <Component
      loading={false}
      title="أمان النظام"
      description="واجهة أمان النظام ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
