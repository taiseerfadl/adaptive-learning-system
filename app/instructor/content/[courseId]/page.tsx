import { ContentManager as Component } from "@/components/instructor/content-manager";

export default function Page() {
  return (
    <Component
      loading={false}
      title="محتوى الدورة"
      description="واجهة محتوى الدورة ضمن مساحة المدرب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
