import { ModuleViewer as Component } from "@/components/student/module-viewer";

export default function Page() {
  return (
    <Component
      loading={false}
      title="وحدة الدورة"
      description="واجهة وحدة الدورة ضمن مساحة الطالب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
