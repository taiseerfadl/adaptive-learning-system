import { SystemSettingsForm as Component } from "@/components/admin/system-settings-form";

export default function Page() {
  return (
    <Component
      loading={false}
      title="إعدادات المؤسسة"
      description="واجهة إعدادات المؤسسة ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
