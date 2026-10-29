export type PerformanceCategory = "advanced" | "intermediate" | "needs_support"; // 🟢 🟡 🔴

/**
 * StudentClassification — "لا يعرض النظام للمدرب درجات الطلاب فقط، بل يحلل أداءهم
 * ويصنفهم تلقائيًا إلى مجموعات حسب مستواهم باستخدام خوارزميات التحليل"
 */
export interface StudentClassification {
  id: string;
  studentId: string;
  courseId: string;
  category: PerformanceCategory;
  weakSkillIds: string[]; // "المهارات التي يواجهون صعوبة فيها"
  averageScore: number;
  attemptsCount: number;
  lastUpdated: string;
}

/**
 * ClassificationSummary — "تظهر للمدرب ثلاث فئات رئيسية" (عدّاد لكل فئة في لوحته)
 */
export interface ClassificationSummary {
  courseId: string;
  advancedCount: number;
  intermediateCount: number;
  needsSupportCount: number;
}

/**
 * SuggestedActivity — "🟢 يمكن إعطاؤهم أنشطة أو تحديات إضافية"
 * و"🔴 يقترح النظام للمدرب تقديم شرح إضافي أو التواصل معهم"
 */
export interface SuggestedActivity {
  id: string;
  studentId: string;
  courseId: string;
  type: "extra_challenge" | "additional_explanation" | "trainer_contact";
  description: string;
  createdAt: string;
}

/**
 * DashboardStats — "نتابع... الإحصائيات، وعدد الطلاب، وعدد الدورات"
 */
export interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  totalRevenue: number;
  completionRate: number;
}
