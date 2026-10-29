import { RoutePlaceholder } from "@/app/_components/workspace-page";

export default function Page() {
  return (
    <RoutePlaceholder
      label={"تفاصيل الجلسة المباشرة"}
      description={
        "هذه الصفحة مخصصة لـتفاصيل الجلسة المباشرة، ويحتاج تنفيذها إلى ربط تفاصيل السجل وصلاحياته بمصدر البيانات الحالي."
      }
      backHref={"/admin"}
      backLabel="العودة إلى لوحة التحكم"
    />
  );
}
