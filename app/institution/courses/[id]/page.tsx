import { CourseApprovalList as Component } from "@/components/institution/course-approval-list";

export default function Page() {
  return (
    <Component
      loading={false}
      title="تفاصيل الدورة"
      description="واجهة تفاصيل الدورة ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
