import { ReportGenerator as Component } from "@/components/institution/report-generator";

export default function Page() {
  return (
    <Component
      loading={false}
      title="التقارير"
      description="واجهة التقارير ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
