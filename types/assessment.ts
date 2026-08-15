export type QuizType = 'placement_test' | 'short_quiz';

/**
 * Assessment — "سيظهر لكل طالب اختبار تحديد مستوى" و"اختبار قصير بعد كل درس
 * أو عدة دروس على حسب ما يحدد المدرس"
 */
export interface Assessment {
  id: string;
  courseId: string;
  lessonId?: string; // فارغ في حال placement_test
  moduleId?: string;
  type: QuizType;
  title: string;
  passingScorePercent: number; // الحد الأدنى للنجاح
  questionIds: string[];
  createdAt: string;
}
