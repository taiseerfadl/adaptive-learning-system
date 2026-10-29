import { AnnouncementCreator as Component } from "@/components/admin/announcement-creator";

export default function Page() {
  return (
    <Component
      loading={false}
      title="إنشاء دور"
      description="واجهة إنشاء دور ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
