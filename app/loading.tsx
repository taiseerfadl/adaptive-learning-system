import { DashboardSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <main
      className="min-h-screen bg-[var(--color-bg)] p-4 sm:p-6 lg:p-8"
      aria-label="جارٍ تحميل الصفحة"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <DashboardSkeleton />
      </div>
    </main>
  );
}
