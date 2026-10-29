export type QuestionType = "multiple_choice" | "true_false" | "short_answer";

/**
 * Question — أسئلة اختبار تحديد المستوى/الاختبارات القصيرة، مرتبطة بمهارة محددة
 * حتى يمكن للنظام معرفة "بما أعرفه وما لا أعرفه"
 */
export interface Question {
  id: string;
  assessmentId: string;
  skillId?: string;
  text: string;
  type: QuestionType;
  choices?: string[]; // في حال multiple_choice
  correctAnswer: string;
  points: number;
}
