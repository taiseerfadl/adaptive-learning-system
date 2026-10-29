import { LiveSessionList as Component } from "@/components/live/live-session-list";

export default function Page() {
  return (
    <Component
      loading={false}
      title="الجلسات المباشرة"
      description="واجهة الجلسات المباشرة ضمن مساحة الطالب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
