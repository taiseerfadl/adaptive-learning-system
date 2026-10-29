import { RetentionChart as Component } from "@/components/institution/retention-chart";

export default function Page() {
  return (
    <Component
      loading={false}
      title="استبقاء الطلاب"
      description="واجهة استبقاء الطلاب ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
