import { RoleCard as Component } from "@/components/admin/role-card";

export default function Page() {
  return (
    <Component
      loading={false}
      title="الأدوار والصلاحيات"
      description="واجهة الأدوار والصلاحيات ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
