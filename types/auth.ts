import type {
  AccountType,
  InstructorType,
  PermissionLevel,
  SafeUser,
} from "./user";

export interface RegisterDTO {
  name?: string | null;
  username: string;
  email?: string | null;
  phoneNumber?: string | null;
  password: string;
  role: AccountType;
  profileImageUrl?: string | null;

  // Institution
  institutionName?: string | null;
  contactPersonName?: string | null;
  subscriptionPlan?: string | null;

  // Optional profile fields
  major?: string | null;
  academicLevel?: string | null;
  academicId?: string | null;
  institutionId?: number | null;
  cvUrl?: string | null;
  instructorType?: InstructorType;
  commercialRegistryNo?: string | null;
}

export interface LoginDTO {
  identifier: string;
  password: string;
  rememberMe?: boolean;
}

export interface ForgotPasswordDTO {
  email: string;
}

export interface ResetPasswordDTO {
  token: string;
  password: string;
}

export interface VerifyEmailDTO {
  token: string;
}

export interface VerifyPhoneDTO {
  code: string;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

export interface JwtPayload {
  userId: number;
  role: AccountType;
  sessionId: string;
  iat?: number;
  exp?: number;
}

export interface AuthResponse {
  user: SafeUser;
  tokens: AuthTokens;
}

export interface AuthenticatedUser extends SafeUser {
  permissionLevel?: PermissionLevel | null;
}
