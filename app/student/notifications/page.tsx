import { NotificationList as Component } from "@/components/notifications/notification-list";

export default function Page() {
  return (
    <Component
      loading={false}
      title="الإشعارات"
      description="واجهة الإشعارات ضمن مساحة الطالب. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
