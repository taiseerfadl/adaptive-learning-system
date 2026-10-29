"use client";

import {
  StudentDashboardStats,
  RecentCourses,
  LearningPath,
  UpcomingAssessments,
  RecommendationCard,
  StudyPlan,
  SkillTree,
} from "@/components/student";
import { Breadcrumbs, PageHeader } from "@/components/layout";
import { Card } from "@/components/ui";
import { useLanguage } from "@/context/language-context";

export default function StudentDashboardPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: t("roles.student", undefined, "الطالب"), href: "/student" },
          { label: t("nav.dashboard", undefined, "لوحة التحكم") },
        ]}
      />
      <PageHeader
        title={t("studentDashboard.title", undefined, "لوحة تعلمي")}
        description={t("studentDashboard.description", undefined, "تابع دوراتك وتقدمك وخطوتك التعليمية التالية.")}
      />
      <StudentDashboardStats />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="space-y-5 xl:col-span-2">
          <Card className="p-4 sm:p-5">
            <h2 className="mb-3 text-lg font-bold text-[var(--color-text)]">
              {t("studentDashboard.recentCourses", undefined, "متابعة التعلم")}
            </h2>
            <RecentCourses />
          </Card>
          <Card className="p-4 sm:p-5">
            <h2 className="mb-3 text-lg font-bold text-[var(--color-text)]">
              {t("studentDashboard.learningPath", undefined, "المسار التعليمي")}
            </h2>
            <LearningPath />
          </Card>
          <Card className="p-4 sm:p-5">
            <h2 className="mb-3 text-lg font-bold text-[var(--color-text)]">
              {t("studentDashboard.skillTree", undefined, "شجرة المهارات")}
            </h2>
            <SkillTree />
          </Card>
        </div>
        <div className="space-y-5">
          <Card className="p-4 sm:p-5">
            <h2 className="mb-3 text-lg font-bold text-[var(--color-text)]">
              {t("studentDashboard.upcomingAssessments", undefined, "التقييمات القادمة")}
            </h2>
            <UpcomingAssessments />
          </Card>
          <Card className="p-4 sm:p-5">
            <h2 className="mb-3 text-lg font-bold text-[var(--color-text)]">
              {t("studentDashboard.recommendations", undefined, "توصيات لك")}
            </h2>
            <RecommendationCard />
          </Card>
          <Card className="p-4 sm:p-5">
            <h2 className="mb-3 text-lg font-bold text-[var(--color-text)]">
              {t("studentDashboard.studyPlan", undefined, "خطة الدراسة")}
            </h2>
            <StudyPlan />
          </Card>
        </div>
      </div>
    </div>
  );
}
