/**
 * Module — تجميع منطقي لمجموعة دروس ضمن الدورة، يحدد عدد الدروس قبل كل اختبار
 * المصدر: "بعد كل درس أو عدة دروس يوجد اختبار قصير على حسب ما يحدد المدرس"
 */
export interface Module {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lessonIds: string[];
  quizAfterEveryNLessons: number; // يضبطها المدرب/المؤسسة
}

/**
 * Skill — "أنا لا أرفع فيديوهات فقط، بل أحدد أيضًا مهارات كل درس"
 */
export interface Skill {
  id: string;
  name: string;
  lessonId: string;
}
