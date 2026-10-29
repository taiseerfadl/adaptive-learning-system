export type LiveSessionStatus = "scheduled" | "live" | "ended" | "cancelled";

/**
 * LiveSession — ميزة "فتح غرف بث مباشر" المذكورة كإضافة على النظام العام
 */
export interface LiveSession {
  id: string;
  courseId: string;
  hostId: string; // Instructor ID أو Institution ID
  title: string;
  scheduledAt: string;
  status: LiveSessionStatus;
  streamUrl?: string;
  recordingUrl?: string;
}

export interface LiveAttendance {
  id: string;
  sessionId: string;
  studentId: string;
  joinedAt: string;
  leftAt?: string;
}
