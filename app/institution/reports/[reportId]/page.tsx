import { ReportGenerator as Component } from "@/components/institution/report-generator";

export default function Page() {
  return (
    <Component
      loading={false}
      title="تفاصيل التقرير"
      description="واجهة تفاصيل التقرير ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
