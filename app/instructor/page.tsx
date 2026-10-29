import {
  InstructorDashboardStats,
  PerformanceOverview,
  CourseAnalyticsCard,
  EnrollmentChart,
  StudentTable,
  StudentProgressCard,
  GradeBook,
} from "@/components/instructor";
import { Breadcrumbs, PageHeader } from "@/components/layout";
import { Card } from "@/components/ui";

export default function InstructorDashboardPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "المدرب", href: "/instructor" },
          { label: "لوحة التحكم" },
        ]}
      />
      <PageHeader
        title="لوحة تحكم المدرب"
        description="تابع دوراتك وطلابك ومستوى التفاعل والأداء الأكاديمي."
      />
      <InstructorDashboardStats />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="min-w-0 p-4 sm:p-5">
          <h2 className="mb-3 text-lg font-bold text-[var(--color-text)]">
            نظرة عامة على الأداء
          </h2>
          <PerformanceOverview />
        </Card>
        <Card className="min-w-0 p-4 sm:p-5">
          <h2 className="mb-3 text-lg font-bold text-[var(--color-text)]">
            اتجاه التسجيل
          </h2>
          <EnrollmentChart />
        </Card>
      </div>
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[var(--color-text)]">دوراتي</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <CourseAnalyticsCard />
        </div>
      </section>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="p-4 sm:p-5">
          <h2 className="mb-3 text-lg font-bold text-[var(--color-text)]">
            تقدم الطلاب
          </h2>
          <StudentProgressCard />
        </Card>
        <Card className="p-4 sm:p-5">
          <h2 className="mb-3 text-lg font-bold text-[var(--color-text)]">
            الطلاب
          </h2>
          <StudentTable />
        </Card>
      </div>
      <Card className="p-4 sm:p-5">
        <h2 className="mb-3 text-lg font-bold text-[var(--color-text)]">
          دفتر الدرجات
        </h2>
        <GradeBook />
      </Card>
    </div>
  );
}
