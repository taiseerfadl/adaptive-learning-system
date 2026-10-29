import { RoutePlaceholder } from "@/app/_components/workspace-page";

export default function Page() {
  return (
    <RoutePlaceholder
      label="وحدات الدورة"
      description="هذه الصفحة مخصصة لتنظيم وحدات الدورة ودروسها. يلزم ربطها ببيانات الدورة المحددة قبل تفعيل عمليات الإضافة والتعديل."
      backHref="/instructor/my-courses"
      backLabel="العودة إلى دوراتي"
    />
  );
}
