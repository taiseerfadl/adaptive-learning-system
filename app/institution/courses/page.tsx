import { CourseApprovalList as Component } from "@/components/institution/course-approval-list";

export default function Page() {
  return (
    <Component
      loading={false}
      title="الدورات"
      description="واجهة الدورات ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
