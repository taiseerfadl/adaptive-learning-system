import { StudentTable as Component } from "@/components/instructor/student-table";

export default function Page() {
  return (
    <Component
      loading={false}
      title="ملف الطالب"
      description="واجهة ملف الطالب ضمن مساحة المدرب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
