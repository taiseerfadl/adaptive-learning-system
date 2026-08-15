/**
 * User — الكيان الأساسي المشترك بين كل أنواع الحسابات (طالب، مدرب، مؤسسة، إدارة)
 * المصدر: "أول شيء سأفعله هو إنشاء حساب جديد، ثم أسجل دخولي"
 */

export type AccountType = 'student' | 'trainer' | 'institution' | 'admin';

export type AccountStatus = 'active' | 'suspended' | 'pending' | 'rejected';

export interface User {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  phone?: string;
  profileImageUrl?: string;
  accountType: AccountType;
  status: AccountStatus;
  createdAt: string; // ISO date
  updatedAt: string;
}

export interface UpdateUserDTO {
  fullName?: string;
  phone?: string;
  profileImageUrl?: string;
}
