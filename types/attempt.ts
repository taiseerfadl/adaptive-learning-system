export type AdaptiveOutcome =
  | 'advance_to_harder'
  | 'repeat_same_level'
  | 'return_to_foundational';

/**
 * Attempt (QuizResult) — "إذا حصلت على درجة عالية، ينقلني النظام إلى درس أصعب.
 * وإذا كانت درجتي متوسطة، يعطيني شرحًا إضافيًا... وإذا كانت ضعيفة، يعيدني إلى درس تأسيسي"
 */
export interface Attempt {
  id: string;
  studentId: string;
  assessmentId: string;
  attemptNumber: number;
  score: number; // نسبة مئوية
  outcome: AdaptiveOutcome;
  answerIds: string[];
  startedAt: string;
  submittedAt: string;
}
