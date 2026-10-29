import { LivePlayer as Component } from "@/components/live/live-player";

export default function Page() {
  return (
    <Component
      loading={false}
      title="البث المباشر"
      description="واجهة البث المباشر ضمن مساحة المدرب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
