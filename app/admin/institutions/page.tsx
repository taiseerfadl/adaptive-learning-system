import { InstitutionCard as Component } from "@/components/admin/institution-card";

export default function Page() {
  return (
    <Component
      loading={false}
      title="إدارة المؤسسات"
      description="واجهة إدارة المؤسسات ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
