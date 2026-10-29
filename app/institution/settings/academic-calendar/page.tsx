import { AcademicCalendar as Component } from "@/components/institution/academic-calendar";

export default function Page() {
  return (
    <Component
      loading={false}
      title="التقويم الأكاديمي"
      description="واجهة التقويم الأكاديمي ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
