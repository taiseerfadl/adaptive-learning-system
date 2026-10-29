import { RoutePlaceholder } from "@/app/_components/workspace-page";

export default function Page() {
  return (
    <RoutePlaceholder
      label={"تعديل القسم"}
      description={
        "هذه الصفحة مخصصة لـتعديل القسم، ويحتاج تنفيذها إلى ربط تفاصيل السجل وصلاحياته بمصدر البيانات الحالي."
      }
      backHref={"/institution"}
      backLabel="العودة إلى لوحة التحكم"
    />
  );
}
