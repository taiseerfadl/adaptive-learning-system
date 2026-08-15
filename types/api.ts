/**
 * API — أشكال موحّدة لاستجابات الـ REST API عبر النظام بالكامل
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  details?: unknown;
}
