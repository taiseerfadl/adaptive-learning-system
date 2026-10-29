import { AnnouncementList as Component } from "@/components/admin/announcement-list";

export default function Page() {
  return (
    <Component
      loading={false}
      title="الإعلانات"
      description="واجهة الإعلانات ضمن مساحة الإدارة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
