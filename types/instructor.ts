import { User } from "./user";

export type ApprovalStatus = "pending" | "approved" | "rejected";

/**
 * Instructor (Trainer) — "أنشئ حسابًا كمدرب، ثم أرسل بياناتي وسيرتي الذاتية
 * حتى تراجعها إدارة المنصة"
 * ملاحظة: يمنح شهادة حضور فقط (وليس معتمدة) — "لأنها ليست صادرة من مؤسسة تعليمية معتمدة"
 */
export interface Instructor extends User {
  accountType: "trainer";
  cvUrl: string;
  bio?: string;
  approvalStatus: ApprovalStatus;
  approvedAt?: string;
  reviewedBy?: string; // Admin ID
  canIssueAccreditedCertificates: false;
}
