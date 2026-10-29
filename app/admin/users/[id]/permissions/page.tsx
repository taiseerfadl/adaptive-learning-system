import { RoutePlaceholder } from "@/app/_components/workspace-page";

export default function Page() {
  return (
    <RoutePlaceholder
      label={"صلاحيات المستخدم"}
      description={
        "هذه الصفحة مخصصة لـصلاحيات المستخدم، ويحتاج تنفيذها إلى ربط تفاصيل السجل وصلاحياته بمصدر البيانات الحالي."
      }
      backHref={"/admin"}
      backLabel="العودة إلى لوحة التحكم"
    />
  );
}
