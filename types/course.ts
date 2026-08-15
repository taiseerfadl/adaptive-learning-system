export type PriceType = 'free' | 'paid';
export type CourseStatus = 'draft' | 'under_review' | 'published' | 'rejected';

/**
 * Course — "هل الدورة مجانية أم مدفوعة؟ ثم أكتب اسم الدورة ووصفها وأهدافها"
 */
export interface Course {
  id: string;
  title: string;
  description: string;
  goals: string[];
  priceType: PriceType;
  price: number; // 0 إذا كانت مجانية
  status: CourseStatus;
  createdByType: 'trainer' | 'institution';
  createdById: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseDTO {
  title: string;
  description: string;
  goals: string[];
  priceType: PriceType;
  price?: number;
}
