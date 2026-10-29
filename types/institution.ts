import { User } from "./user";
import { ApprovalStatus } from "./instructor";

/**
 * Institution — "يجب أن أرفع بيانات المؤسسة والتراخيص المطلوبة"
 * الفرق عن المدرب المستقل: "المؤسسة تستطيع منح شهادات معتمدة"
 */
export interface Institution extends User {
  accountType: "institution";
  institutionName: string;
  licenseFileUrl: string;
  officialAddress?: string;
  approvalStatus: ApprovalStatus;
  approvedAt?: string;
  reviewedBy?: string; // Admin ID
  canIssueAccreditedCertificates: true;
}
