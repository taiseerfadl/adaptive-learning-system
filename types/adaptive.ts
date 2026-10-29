import { AdaptiveOutcome } from "./attempt";

/**
 * PlacementResult — "بعد أن أنتهي من الاختبار، يحلل النظام إجاباتي ويحدد مستواي،
 * ثم يبني لي مسارًا يناسبني... قد أبدأ من الدرس الثالث بينما طالبة أخرى من الأول"
 */
export interface PlacementResult {
  studentId: string;
  courseId: string;
  assessmentId: string;
  score: number;
  startingLessonId: string; // نقطة البداية الفعلية للطالب
  evaluatedAt: string;
}

/**
 * AdaptiveDecisionRule — القواعد المستخرجة من استمارة المشروع:
 * ≥80% انتقال لدرس متقدم | 40%-79% إعادة نفس المستوى | <40% رجوع لتأسيسي
 */
export interface AdaptiveDecisionRule {
  minScorePercent: number;
  maxScorePercent: number;
  outcome: AdaptiveOutcome;
}

export const DEFAULT_ADAPTIVE_RULES: AdaptiveDecisionRule[] = [
  { minScorePercent: 80, maxScorePercent: 100, outcome: "advance_to_harder" },
  { minScorePercent: 40, maxScorePercent: 79.99, outcome: "repeat_same_level" },
  {
    minScorePercent: 0,
    maxScorePercent: 39.99,
    outcome: "return_to_foundational",
  },
];

/**
 * LearningPath — "وهكذا يصبح لكل طالب طريق تعلم خاص به"
 */
export interface LearningPath {
  studentId: string;
  courseId: string;
  currentLessonId: string;
  history: {
    lessonId: string;
    attemptId: string;
    outcome: AdaptiveOutcome;
    date: string;
  }[];
}
