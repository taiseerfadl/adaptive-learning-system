import { StudentEnrollmentTable as Component } from "@/components/institution/student-enrollment-table";

export default function Page() {
  return (
    <Component
      loading={false}
      title="ملف الطالب"
      description="واجهة ملف الطالب ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
