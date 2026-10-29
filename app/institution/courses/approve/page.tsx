import { ApprovalWorkflow as Component } from "@/components/institution/approval-workflow";

export default function Page() {
  return (
    <Component
      loading={false}
      title="اعتماد الدورات"
      description="واجهة اعتماد الدورات ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
