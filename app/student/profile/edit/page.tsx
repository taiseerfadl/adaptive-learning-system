import { RoutePlaceholder } from "@/app/_components/workspace-page";

export default function Page() {
  return (
    <RoutePlaceholder
      label={"تعديل الملف الشخصي"}
      description={
        "هذه الصفحة مخصصة لـتعديل الملف الشخصي، ويحتاج تنفيذها إلى ربط تفاصيل السجل وصلاحياته بمصدر البيانات الحالي."
      }
      backHref={"/student"}
      backLabel="العودة إلى لوحة التحكم"
    />
  );
}
