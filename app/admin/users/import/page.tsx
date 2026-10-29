import { UserImport as Component } from "@/components/admin/user-import";

export default function Page() {
  return (
    <Component
      loading={false}
      title="استيراد المستخدمين"
      description="واجهة استيراد المستخدمين ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
