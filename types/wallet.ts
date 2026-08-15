/**
 * Wallet — "ستُحفظ جميع شهاداتي داخل محفظتي الرقمية"
 * (مؤكد أيضًا في صورة استمارة المشروع: "Wallet student mobile")
 */
export interface Wallet {
  id: string;
  studentId: string;
  certificateIds: string[];
}
