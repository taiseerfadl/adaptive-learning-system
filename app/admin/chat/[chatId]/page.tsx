import { ChatRoom as Component } from "@/components/chat/chat-room";

export default function Page() {
  return (
    <Component
      loading={false}
      title="المحادثة"
      description="واجهة المحادثة ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
