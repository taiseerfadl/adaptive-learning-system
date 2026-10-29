import { SupportTicketTable as Component } from "@/components/admin/support-ticket-table";

export default function Page() {
  return (
    <Component
      loading={false}
      title="تذاكر الدعم"
      description="واجهة تذاكر الدعم ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
