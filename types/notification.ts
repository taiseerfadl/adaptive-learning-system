export type NotificationType =
  | 'course_approved'
  | 'course_rejected'
  | 'student_needs_support'
  | 'payment_success'
  | 'new_certificate'
  | 'live_session_reminder';

/**
 * Notification — "يقترح النظام للمدرب تقديم شرح إضافي أو التواصل معهم
 * لأنهم يواجهون صعوبة في بعض المهارات"
 */
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  message: string;
  isRead: boolean;
  createdAt: string;
  relatedEntityId?: string;
}
