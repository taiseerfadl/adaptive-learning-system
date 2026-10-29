export type ComplaintStatus = "open" | "in_progress" | "resolved";

/**
 * Complaint — "نتابع عمليات الدفع، والشكاوى، والإحصائيات"
 */
export interface Complaint {
  id: string;
  userId: string;
  subject: string;
  description: string;
  status: ComplaintStatus;
  createdAt: string;
  resolvedAt?: string;
}
