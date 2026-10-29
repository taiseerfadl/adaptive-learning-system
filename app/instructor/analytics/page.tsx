import { CourseAnalyticsCard as Component } from "@/components/instructor/course-analytics-card";

export default function Page() {
  return (
    <Component
      loading={false}
      title="تحليلات الدورات"
      description="واجهة تحليلات الدورات ضمن مساحة المدرب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
