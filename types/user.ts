export type accountType =
  | "STUDENT"
  | "INSTRUCTOR"
  | "INSTITUTION"
  | "ADMIN"
  | "student"
  | "instructor"
  | "trainer"
  | "institution"
  | "admin";
export type AccountType = accountType;

export type AccountStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export type InstructorType = "INDEPENDENT" | "INSTITUTIONAL";

export type PermissionLevel = "SUPER_ADMIN" | "MODERATOR";

export interface User {
  accountType: accountType;
  id: number;
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  passwordHash: string;
  profileImageUrl?: string | null;
  role: accountType;
  status: AccountStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Date | string;
  updatedAt?: Date | string | null;
  student?: {
    major?: string | null;
    academicLevel?: string | null;
    progressPoints?: number;
    academicId?: string | null;
    institutionId?: number | null;
  } | null;
  instructor?: {
    cvUrl?: string | null;
    instructorType?: InstructorType | string | null;
    academicId?: string | null;
    institutionId?: number | null;
  } | null;
  institution?: {
    commercialRegistryNo?: string | null;
    contactPersonName?: string;
    subscriptionPlan?: string | null;
  } | null;
  admin?: {
    permissionLevel?: PermissionLevel | string;
  } | null;
  permissionLevel?: PermissionLevel | string | null;
}

export type SafeUser = Omit<User, "passwordHash">;

export interface UpdateUserDTO {
  name?: string;
  username?: string;
  phoneNumber?: string;
  profileImageUrl?: string | null;
}
