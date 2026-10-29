import { ContentManager as Component } from "@/components/instructor/content-manager";

export default function Page() {
  return (
    <Component
      loading={false}
      title="إدارة المحتوى"
      description="واجهة إدارة المحتوى ضمن مساحة المدرب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
