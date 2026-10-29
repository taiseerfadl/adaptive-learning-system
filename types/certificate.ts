export type CertificateType = "attendance" | "accredited";

/**
 * Certificate — "أحصل على شهادة حضور" (مدرب مستقل) أو "شهادة معتمدة" (مؤسسة)
 * موقعة رقميًا وتحمل رمز QR للتحقق: "أشرف على أن كل شهادة تحمل توقيعًا
 * أكاديميًا رقميًا ورمز QR يمكن التحقق منه" (ECDSA/RSA + SHA-256 من الاستمارة)
 */
export interface Certificate {
  id: string;
  studentId: string;
  courseId: string;
  type: CertificateType;
  issuedAt: string;
  digitalSignature: string; // ECDSA أو RSA
  verificationHash: string; // SHA-256
  qrCodeUrl: string;
}

/**
 * CertificateVerificationLog — "يمكنني مشاركة رمز QR مع أي جهة تريد
 * التحقق من صحة الشهادة"
 */
export interface CertificateVerificationLog {
  id: string;
  certificateId: string;
  verifiedByIp?: string;
  verifiedAt: string;
  result: "valid" | "invalid";
}
