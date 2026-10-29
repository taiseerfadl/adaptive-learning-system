import {
  InstitutionDashboardStats,
  DepartmentList,
  CourseApprovalList,
  RetentionChart,
  DepartmentPerformanceChart,
  InstructorEffectivenessChart,
  AcademicCalendar,
  StudentEnrollmentTable,
} from "@/components/institution";
import { Breadcrumbs, PageHeader } from "@/components/layout";
import { Card } from "@/components/ui";

export default function InstitutionDashboardPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "المؤسسة", href: "/institution" },
          { label: "لوحة التحكم" },
        ]}
      />
      <PageHeader
        title="لوحة تحكم المؤسسة"
        description="تابع الأقسام والبرامج والتسجيل والأداء الأكاديمي في مؤسستك."
      />
      <InstitutionDashboardStats />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="p-4 sm:p-5">
          <h2 className="mb-3 text-lg font-bold text-[var(--color-text)]">
            استبقاء الطلاب
          </h2>
          <RetentionChart />
        </Card>
        <Card className="p-4 sm:p-5">
          <h2 className="mb-3 text-lg font-bold text-[var(--color-text)]">
            أداء الأقسام
          </h2>
          <DepartmentPerformanceChart />
        </Card>
      </div>
      <Card className="p-4 sm:p-5">
        <h2 className="mb-3 text-lg font-bold text-[var(--color-text)]">
          فاعلية المدربين
        </h2>
        <InstructorEffectivenessChart />
      </Card>
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[var(--color-text)]">الأقسام</h2>
        <DepartmentList />
      </section>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="p-4 sm:p-5">
          <h2 className="mb-3 text-lg font-bold text-[var(--color-text)]">
            اعتماد الدورات
          </h2>
          <CourseApprovalList />
        </Card>
        <Card className="p-4 sm:p-5">
          <h2 className="mb-3 text-lg font-bold text-[var(--color-text)]">
            التقويم الأكاديمي
          </h2>
          <AcademicCalendar />
        </Card>
      </div>
      <Card className="p-4 sm:p-5">
        <h2 className="mb-3 text-lg font-bold text-[var(--color-text)]">
          تسجيل الطلاب
        </h2>
        <StudentEnrollmentTable />
      </Card>
    </div>
  );
}
