/**
 * StudentAnswer — إجابة الطالب على سؤال محدد ضمن محاولة اختبار (Attempt)
 */
export interface StudentAnswer {
  id: string;
  attemptId: string;
  questionId: string;
  submittedAnswer: string;
  isCorrect: boolean;
  pointsEarned: number;
}
