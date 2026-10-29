import { StudentEnrollmentTable as Component } from "@/components/institution/student-enrollment-table";

export default function Page() {
  return (
    <Component
      loading={false}
      title="الطلاب"
      description="واجهة الطلاب ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
