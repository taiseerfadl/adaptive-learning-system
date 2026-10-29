import { User } from "./user";

export type InterestField = "programming" | "design" | "english" | string;

/**
 * Student — "سيطلب مني النظام إكمال بيانات بسيطة مثل المجالات التي أحب تعلمها،
 * مثل البرمجة أو التصميم أو اللغة الإنجليزية"
 */
export interface Student extends User {
  accountType: "student";
  interestFields: InterestField[];
  currentLevel: string | null;
  walletId: string;
}

/**
 * StudentEnrollment — "أضغط 'التحاق' وأبدأ مباشرة" / علاقة الطالب بالدورة
 */
export interface StudentEnrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  currentLessonId: string | null;
  progressPercentage: number; // 0-100
  completedAt?: string;
}
