import { RoutePlaceholder } from "@/app/_components/workspace-page";

export default function Page() {
  return (
    <RoutePlaceholder
      label={"تعديل المستخدم"}
      description={
        "هذه الصفحة مخصصة لـتعديل المستخدم، ويحتاج تنفيذها إلى ربط تفاصيل السجل وصلاحياته بمصدر البيانات الحالي."
      }
      backHref={"/admin"}
      backLabel="العودة إلى لوحة التحكم"
    />
  );
}
