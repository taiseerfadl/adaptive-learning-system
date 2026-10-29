import { RoutePlaceholder } from "@/app/_components/workspace-page";

export default function Page() {
  return (
    <RoutePlaceholder
      label={"إدارة المؤسسة"}
      description={
        "هذه الصفحة مخصصة لـإدارة المؤسسة، ويحتاج تنفيذها إلى ربط تفاصيل السجل وصلاحياته بمصدر البيانات الحالي."
      }
      backHref={"/admin"}
      backLabel="العودة إلى لوحة التحكم"
    />
  );
}
