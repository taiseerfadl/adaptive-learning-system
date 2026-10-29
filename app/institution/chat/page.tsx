import { ChatRoom as Component } from "@/components/chat/chat-room";

export default function Page() {
  return (
    <Component
      loading={false}
      title="محادثات المؤسسة"
      description="واجهة محادثات المؤسسة ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
