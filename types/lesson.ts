export type LessonLevel = "basic" | "advanced";
export type ContentType = "video" | "file" | "text";

/**
 * Lesson — "أحدد أي الدروس أساسية، وأيها متقدمة، وما الذي يجب أن يتقنه
 * الطالب قبل الانتقال إلى الدرس التالي"
 * ويحمل منطق التفرع التكيفي (الدرس التالي حسب الأداء)
 */
export interface Lesson {
  id: string;
  courseId: string;
  moduleId?: string;
  title: string;
  contentType: ContentType;
  contentUrl: string;
  levelType: LessonLevel;
  order: number;
  skillIds: string[];
  prerequisiteLessonIds: string[]; // ما يجب إتقانه قبل الانتقال لهذا الدرس

  // منطق التعلم التكيفي: الدرس التالي حسب نتيجة الاختبار
  nextLessonIdOnPass: string | null; // درجة ≥ 80% → درس أصعب
  nextLessonIdOnAverage: string | null; // 40% - 79% → إعادة/تعزيز
  nextLessonIdOnFail: string | null; // < 40% → درس تأسيسي
}
