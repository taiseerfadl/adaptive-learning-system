import { ProgramCard as Component } from "@/components/institution/program-card";

export default function Page() {
  return (
    <Component
      loading={false}
      title="البرامج الأكاديمية"
      description="واجهة البرامج الأكاديمية ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
