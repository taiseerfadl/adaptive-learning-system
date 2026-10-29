"use client";

import {
  AdminDashboardStats,
  GrowthMetrics,
  RevenueChart,
  PlatformUsageChart,
  InstitutionCard,
  SupportTicketTable,
  AnnouncementList,
  AuditLogTable,
} from "@/components/admin";
import { Breadcrumbs, PageHeader } from "@/components/layout";
import { Card } from "@/components/ui";
import { useLanguage } from "@/context/language-context";

export default function AdminDashboardPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: t("roles.admin", undefined, "الإدارة"), href: "/admin" },
          { label: t("nav.dashboard", undefined, "لوحة التحكم") },
        ]}
      />
      <PageHeader
        title={t("adminDashboard.title", undefined, "لوحة تحكم الإدارة")}
        description={t("adminDashboard.description", undefined, "نظرة عامة على المستخدمين والمؤسسات والفوترة والدعم وأداء المنصة.")}
      />
      <AdminDashboardStats />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="min-w-0 p-4 sm:p-5">
          <RevenueChart />
        </Card>
        <Card className="min-w-0 p-4 sm:p-5">
          <PlatformUsageChart />
        </Card>
      </div>
      <Card className="p-4 sm:p-5">
        <GrowthMetrics />
      </Card>
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[var(--color-text)]">
          {t("adminDashboard.institutions", undefined, "المؤسسات")}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <InstitutionCard />
        </div>
      </section>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="p-4 sm:p-5">
          <h2 className="mb-3 text-lg font-bold text-[var(--color-text)]">
            {t("adminDashboard.supportTickets", undefined, "تذاكر الدعم")}
          </h2>
          <SupportTicketTable />
        </Card>
        <Card className="p-4 sm:p-5">
          <h2 className="mb-3 text-lg font-bold text-[var(--color-text)]">
            {t("adminDashboard.announcements", undefined, "الإعلانات")}
          </h2>
          <AnnouncementList />
        </Card>
      </div>
      <Card className="p-4 sm:p-5">
        <h2 className="mb-3 text-lg font-bold text-[var(--color-text)]">
          {t("adminDashboard.recentActivity", undefined, "سجل النشاط الأخير")}
        </h2>
        <AuditLogTable />
      </Card>
    </div>
  );
}
