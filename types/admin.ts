import { User } from './user';

/**
 * Admin — "نحن المسؤولون عن كل شيء: نستقبل طلبات التسجيل، نراجع الدورات،
 * نتابع المدفوعات والشكاوى والإحصائيات"
 */
export interface Admin extends User {
  accountType: 'admin';
}

/**
 * ApprovalRequest — "نراجع بياناتهم، ثم نقبل أو نرفض الطلب" (مدربون/مؤسسات)
 */
export interface ApprovalRequest {
  id: string;
  applicantId: string; // Instructor or Institution id
  applicantType: 'trainer' | 'institution';
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
}

/**
 * CourseReviewLog — "نراجع الدورات الجديدة قبل نشرها، حتى نتأكد من جودة المحتوى"
 */
export interface CourseReviewLog {
  id: string;
  courseId: string;
  reviewedBy: string; // Admin ID
  decision: 'approved' | 'rejected';
  notes?: string;
  reviewedAt: string;
}
