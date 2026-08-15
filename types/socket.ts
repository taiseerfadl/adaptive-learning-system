import { Notification } from './notification';
import { ChatMessage } from './chat';
import { StudentClassification } from './analytics';

/**
 * SocketEvent — أحداث الاتصال اللحظي (WebSocket) عبر النظام:
 * تحديث التصنيف تلقائيًا، الدردشة، تنبيهات المدرب، وحالة البث المباشر
 */
export type SocketEvent =
  | { event: 'notification:new'; payload: Notification }
  | { event: 'chat:message'; payload: ChatMessage }
  | { event: 'classification:updated'; payload: StudentClassification }
  | { event: 'live:started'; payload: { sessionId: string } }
  | { event: 'live:ended'; payload: { sessionId: string } };
