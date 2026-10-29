import { StudentProgressCard as Component } from "@/components/instructor/student-progress-card";

export default function Page() {
  return (
    <Component
      loading={false}
      title="تحليلات الطلاب"
      description="واجهة تحليلات الطلاب ضمن مساحة المدرب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
