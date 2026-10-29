export type PaymentStatus = "pending" | "success" | "failed";

/**
 * Payment — "سأدفع باستخدام إحدى المحافظ الإلكترونية اليمنية، وبعد نجاح
 * الدفع أستطيع الدخول إلى الدورة"
 */
export interface Payment {
  id: string;
  studentId: string;
  courseId: string;
  amount: number;
  paymentMethod: string; // اسم المحفظة الإلكترونية اليمنية
  status: PaymentStatus;
  transactionRef?: string;
  createdAt: string;
}
