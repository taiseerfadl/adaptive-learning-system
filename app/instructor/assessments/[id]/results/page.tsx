import { GradeBook as Component } from "@/components/instructor/grade-book";

export default function Page() {
  return (
    <Component
      loading={false}
      title="نتائج التقييم"
      description="واجهة نتائج التقييم ضمن مساحة المدرب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
