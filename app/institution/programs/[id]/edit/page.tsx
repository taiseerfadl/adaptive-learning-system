import { RoutePlaceholder } from "@/app/_components/workspace-page";

export default function Page() {
  return (
    <RoutePlaceholder
      label={"تعديل البرنامج الأكاديمي"}
      description={
        "هذه الصفحة مخصصة لـتعديل البرنامج الأكاديمي، ويحتاج تنفيذها إلى ربط تفاصيل السجل وصلاحياته بمصدر البيانات الحالي."
      }
      backHref={"/institution"}
      backLabel="العودة إلى لوحة التحكم"
    />
  );
}
