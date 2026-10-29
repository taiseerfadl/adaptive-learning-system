import { SystemSettingsForm as Component } from "@/components/admin/system-settings-form";

export default function Page() {
  return (
    <Component
      loading={false}
      title="الإعدادات العامة"
      description="واجهة الإعدادات العامة ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
