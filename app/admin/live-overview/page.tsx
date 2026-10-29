import { RoutePlaceholder } from "@/app/_components/workspace-page";

export default function Page() {
  return (
    <RoutePlaceholder
      label={"مراقبة الجلسات المباشرة"}
      description={
        "هذه الصفحة مخصصة لـمراقبة الجلسات المباشرة، ويحتاج تنفيذها إلى ربط تفاصيل السجل وصلاحياته بمصدر البيانات الحالي."
      }
      backHref={"/admin"}
      backLabel="العودة إلى لوحة التحكم"
    />
  );
}
