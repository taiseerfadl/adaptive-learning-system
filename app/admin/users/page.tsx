import { UserTable as Component } from "@/components/admin/user-table";

export default function Page() {
  return (
    <Component
      loading={false}
      title="إدارة المستخدمين"
      description="واجهة إدارة المستخدمين ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
