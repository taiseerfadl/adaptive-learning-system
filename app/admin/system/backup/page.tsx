import { BackupManager as Component } from "@/components/admin/backup-manager";

export default function Page() {
  return (
    <Component
      loading={false}
      title="النسخ الاحتياطي"
      description="واجهة النسخ الاحتياطي ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
