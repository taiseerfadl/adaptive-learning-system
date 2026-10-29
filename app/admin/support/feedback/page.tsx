import { FeedbackList as Component } from "@/components/admin/feedback-list";

export default function Page() {
  return (
    <Component
      loading={false}
      title="ملاحظات المستخدمين"
      description="واجهة ملاحظات المستخدمين ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
