import { InvoiceTable as Component } from "@/components/admin/invoice-table";

export default function Page() {
  return (
    <Component
      loading={false}
      title="الفواتير"
      description="واجهة الفواتير ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
