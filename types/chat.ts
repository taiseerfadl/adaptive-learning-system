/**
 * Chat — قناة تواصل المدرب مع الطالب المصنّف 🔴
 * المصدر: "أو التواصل معهم لأنهم يواجهون صعوبة في بعض المهارات"
 */
export interface Conversation {
  id: string;
  participantIds: string[];
  courseId?: string;
  createdAt: string;
  lastMessageAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  text: string;
  sentAt: string;
  readAt?: string;
}
