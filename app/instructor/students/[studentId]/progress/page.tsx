import { RoutePlaceholder } from "@/app/_components/workspace-page";

export default function Page() {
  return (
    <RoutePlaceholder
      label={"تقدم الطالب"}
      description={
        "هذه الصفحة مخصصة لـتقدم الطالب، ويحتاج تنفيذها إلى ربط تفاصيل السجل وصلاحياته بمصدر البيانات الحالي."
      }
      backHref={"/instructor"}
      backLabel="العودة إلى لوحة التحكم"
    />
  );
}
