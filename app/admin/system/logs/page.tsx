import { LogViewer as Component } from "@/components/admin/log-viewer";

export default function Page() {
  return (
    <Component
      loading={false}
      title="سجلات النظام"
      description="واجهة سجلات النظام ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
