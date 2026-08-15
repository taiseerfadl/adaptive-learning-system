import { AccountType, User } from './user';

/**
 * Auth — "أنشئ حسابًا جديدًا، ثم أسجل دخولي"
 */

export interface RegisterDTO {
  fullName: string;
  email: string;
  password: string;
  accountType: AccountType;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // بالثواني
}

export interface JwtPayload {
  userId: string;
  accountType: AccountType;
  iat: number;
  exp: number;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}
