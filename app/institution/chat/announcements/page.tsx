import { AnnouncementList as Component } from "@/components/admin/announcement-list";

export default function Page() {
  return (
    <Component
      loading={false}
      title="إعلانات المؤسسة"
      description="واجهة إعلانات المؤسسة ضمن مساحة المؤسسة. المكوّن الحالي محفوظ؛ استكمال عرض السجلات والإجراءات يتطلب توصيل بيانات هذه الصفحة بالمصدر المعتمد."
    />
  );
}
