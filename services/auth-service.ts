import { randomUUID } from "crypto";
import { prisma } from "@/lib/db/prisma";
import { comparePassword, hashPassword } from "@/lib/auth/bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  ACCESS_TOKEN_EXPIRES_IN_SECONDS,
  REFRESH_TOKEN_EXPIRES_IN_SECONDS,
  DEFAULT_REFRESH_TOKEN_EXPIRES_IN_SECONDS,
} from "@/lib/auth/jwt";
import {
  generatePhoneVerificationCode,
  generateRandomToken,
  hashToken,
} from "@/lib/auth/hash";
import type { RegisterDTO, LoginDTO, AuthTokens } from "@/types/auth";
import type { accountType, SafeUser } from "@/types/user";
import {
  InstructorType,
  PermissionLevel,
  Role,
  UserStatus,
} from "@/generated/prisma/client";

const EMAIL_VERIFICATION_EXPIRES_IN_HOURS = 24;
const PHONE_VERIFICATION_EXPIRES_IN_MINUTES = 10;
const PASSWORD_RESET_EXPIRES_IN_MINUTES = 30;
const PHONE_MAX_ATTEMPTS = 5;

function addHours(date: Date, hours: number): Date {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
}

function addMinutes(date: Date, minutes: number): Date {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
}

function normalizeEmail(email?: string | null): string | null {
  if (!email || !email.trim()) return null;
  return email.trim().toLowerCase();
}

function normalizeUsername(username: string): string {
  return username.trim().toLowerCase();
}

function normalizePhone(phoneNumber?: string | null): string | null {
  if (!phoneNumber || !phoneNumber.trim()) return null;
  return phoneNumber.replace(/[\s()-]/g, "").trim();
}

function toAccountType(role: Role): accountType {
  return role as accountType;
}

function sanitizeUser(user: any): SafeUser {
  const { passwordHash: _passwordHash, ...safeUser } = user;
  // Keep the existing DB field (role) and expose accountType for the current UI.
  return { ...safeUser, accountType: user.role } as SafeUser;
}

async function createSession(
  userId: number,
  role: accountType,
  rememberMe = false,
): Promise<AuthTokens> {
  const sessionId = randomUUID();
  const refreshExpiresIn = rememberMe
    ? REFRESH_TOKEN_EXPIRES_IN_SECONDS
    : DEFAULT_REFRESH_TOKEN_EXPIRES_IN_SECONDS;
  const expiresAt = new Date(Date.now() + refreshExpiresIn * 1000);

  const refreshToken = generateRefreshToken(
    userId,
    role,
    sessionId,
    refreshExpiresIn,
  );

  await prisma.session.create({
    data: {
      id: sessionId,
      userId,
      refreshTokenHash: hashToken(refreshToken),
      expiresAt,
    },
  });

  const accessToken = generateAccessToken(userId, role, sessionId);

  return {
    accessToken,
    refreshToken,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN_SECONDS,
    refreshExpiresIn,
  };
}

export async function register(data: RegisterDTO) {
  const username = normalizeUsername(data.username);
  const email = normalizeEmail(data.email);
  const phoneNumber = normalizePhone(data.phoneNumber);

  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });
  if (existingUsername) {
    throw new Error("Username is already in use.");
  }

  if (email) {
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      throw new Error("Email is already registered.");
    }
  }

  if (phoneNumber) {
    const existingPhone = await prisma.user.findUnique({
      where: { phoneNumber },
    });
    if (existingPhone) {
      throw new Error("Phone number is already registered.");
    }
  }

  const passwordHash = await hashPassword(data.password);
  const verificationCode = generatePhoneVerificationCode();
  const now = new Date();

  const displayName =
    data.role === "INSTITUTION"
      ? (data.institutionName?.trim() || data.name?.trim() || null)
      : (data.name?.trim() || null);

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name: displayName,
        username,
        email,
        phoneNumber,
        passwordHash,
        profileImageUrl: data.profileImageUrl ?? null,
        role: data.role as Role,
        status: UserStatus.ACTIVE,
        emailVerified: false,
        phoneVerified: false,
      },
    });

    if (data.role === "STUDENT") {
      await tx.student.create({
        data: {
          userId: user.id,
          major: data.major?.trim() || null,
          academicLevel: data.academicLevel?.trim() || null,
          academicId: data.academicId?.trim() || null,
          institutionId: data.institutionId ?? null,
        },
      });
    }

    if (data.role === "INSTRUCTOR") {
      await tx.instructor.create({
        data: {
          userId: user.id,
          cvUrl: data.cvUrl?.trim() || null,
          instructorType: (data.instructorType as InstructorType) || InstructorType.INDEPENDENT,
          academicId: data.academicId?.trim() || null,
          institutionId: data.institutionId ?? null,
        },
      });
    }

    if (data.role === "INSTITUTION") {
      await tx.institution.create({
        data: {
          userId: user.id,
          contactPersonName: data.contactPersonName?.trim() || "",
          subscriptionPlan: data.subscriptionPlan || "monthly",
          commercialRegistryNo: data.commercialRegistryNo?.trim() || null,
        },
      });
    }

    if (phoneNumber) {
      await tx.phoneVerificationToken.create({
        data: {
          userId: user.id,
          codeHash: hashToken(verificationCode),
          expiresAt: addMinutes(now, PHONE_VERIFICATION_EXPIRES_IN_MINUTES),
        },
      });
    }

    if (email) {
      await tx.emailVerificationToken.create({
        data: {
          userId: user.id,
          tokenHash: hashToken(verificationCode),
          expiresAt: addMinutes(now, PHONE_VERIFICATION_EXPIRES_IN_MINUTES),
        },
      });
    }

    return { user, code: verificationCode };
  });

  return {
    user: sanitizeUser(result.user),
    verificationCode: result.code,
    contactMethod: phoneNumber ? ("phone" as const) : ("email" as const),
  };
}

export async function login(data: LoginDTO) {
  const identifier = data.identifier.trim().toLowerCase();

  const normalizedPhone = normalizePhone(data.identifier);
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: identifier },
        { username: identifier },
        // Only include phone condition when it's a non-null value to avoid
        // matching all users with a NULL phoneNumber (security bug).
        ...(normalizedPhone ? [{ phoneNumber: normalizedPhone }] : []),
      ],
    },
    include: {
      admin: true,
    },
  });

  if (!user) {
    throw new Error("Invalid credentials.");
  }

  if (user.status === UserStatus.SUSPENDED) {
    throw new Error("This account has been suspended.");
  }

  if (user.status === UserStatus.INACTIVE) {
    throw new Error("This account is inactive.");
  }

  const passwordIsValid = await comparePassword(
    data.password,
    user.passwordHash,
  );

  if (!passwordIsValid) {
    throw new Error("Invalid credentials.");
  }

  const isVerified =
    (user.phoneNumber && user.phoneVerified) ||
    (user.email && user.emailVerified);

  if (!isVerified) {
    if (user.phoneNumber && !user.phoneVerified) {
      throw new Error("Phone number is not verified.");
    }
    if (user.email && !user.emailVerified) {
      throw new Error("Email address is not verified.");
    }
    throw new Error("Account is not verified.");
  }

  const tokens = await createSession(
    user.id,
    toAccountType(user.role),
    data.rememberMe ?? false,
  );

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { updatedAt: new Date() },
    include: { admin: true },
  });

  return {
    user: {
      ...sanitizeUser(updatedUser),
      permissionLevel:
        updatedUser.admin?.permissionLevel === PermissionLevel.SUPER_ADMIN
          ? PermissionLevel.SUPER_ADMIN
          : (updatedUser.admin?.permissionLevel ?? null),
    },
    tokens,
  };
}

export async function logout(sessionId: string): Promise<void> {
  await prisma.session.deleteMany({ where: { id: sessionId } });
}

export async function refreshAccessToken(
  refreshToken: string,
): Promise<AuthTokens> {
  const payload = verifyRefreshToken(refreshToken);
  const tokenHash = hashToken(refreshToken);

  const session = await prisma.session.findUnique({
    where: { id: payload.sessionId },
    include: { user: true },
  });

  if (!session) {
    throw new Error("Session not found.");
  }

  if (session.refreshTokenHash !== tokenHash) {
    await prisma.session.delete({ where: { id: session.id } });
    throw new Error("Invalid refresh token.");
  }

  if (session.expiresAt <= new Date()) {
    await prisma.session.delete({ where: { id: session.id } });
    throw new Error("Session has expired.");
  }

  if (
    session.user.status === UserStatus.SUSPENDED ||
    session.user.status === UserStatus.INACTIVE
  ) {
    await prisma.session.delete({ where: { id: session.id } });
    throw new Error("User account is not active.");
  }

  if (!session.user.emailVerified && !session.user.phoneVerified) {
    await prisma.session.delete({ where: { id: session.id } });
    throw new Error("User verification is incomplete.");
  }

  const refreshExpiresIn = Math.max(
    1,
    Math.floor((session.expiresAt.getTime() - Date.now()) / 1000),
  );
  const newRefreshToken = generateRefreshToken(
    session.user.id,
    toAccountType(session.user.role),
    session.id,
    refreshExpiresIn,
  );

  await prisma.session.update({
    where: { id: session.id },
    data: {
      refreshTokenHash: hashToken(newRefreshToken),
    },
  });

  const accessToken = generateAccessToken(
    session.user.id,
    toAccountType(session.user.role),
    session.id,
  );

  return {
    accessToken,
    refreshToken: newRefreshToken,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN_SECONDS,
    refreshExpiresIn,
  };
}

export async function getCurrentUser(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      admin: true,
      student: true,
      instructor: true,
      institution: true,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  return {
    ...sanitizeUser(user),
    permissionLevel: user.admin?.permissionLevel ?? null,
  };
}

export async function createPasswordResetToken(identifier: string) {
  const trimmed = identifier.trim().toLowerCase();
  const normalizedPhone = normalizePhone(identifier);

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: trimmed },
        { username: trimmed },
        ...(normalizedPhone ? [{ phoneNumber: normalizedPhone }] : []),
      ],
    },
  });

  if (!user) {
    return undefined;
  }

  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

  const token = generateRandomToken(32);

  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(token),
      expiresAt: addMinutes(new Date(), PASSWORD_RESET_EXPIRES_IN_MINUTES),
    },
  });

  return token;
}

export async function verifyEmail(tokenOrCode: string, userId?: number) {
  const tokenHash = hashToken(tokenOrCode);
  const verificationToken = await prisma.emailVerificationToken.findFirst({
    where: {
      tokenHash,
      ...(userId ? { userId } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  if (!verificationToken) {
    throw new Error("Invalid or missing verification token.");
  }

  if (verificationToken.expiresAt <= new Date()) {
    await prisma.emailVerificationToken.delete({
      where: { id: verificationToken.id },
    });
    throw new Error("Verification token has expired.");
  }

  const user = await prisma.$transaction(async (tx) => {
    const updatedUser = await tx.user.update({
      where: { id: verificationToken.userId },
      data: { emailVerified: true, updatedAt: new Date() },
    });

    await tx.emailVerificationToken.delete({
      where: { id: verificationToken.id },
    });

    return updatedUser;
  });

  return sanitizeUser(user);
}

export async function createEmailVerificationCode(userId: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.emailVerified) {
    throw new Error("Email address is already verified.");
  }

  await prisma.emailVerificationToken.deleteMany({ where: { userId } });

  const code = generatePhoneVerificationCode();

  await prisma.emailVerificationToken.create({
    data: {
      userId,
      tokenHash: hashToken(code),
      expiresAt: addMinutes(new Date(), PHONE_VERIFICATION_EXPIRES_IN_MINUTES),
    },
  });

  return code;
}

export async function createPhoneVerificationCode(userId: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.phoneVerified) {
    throw new Error("Phone number is already verified.");
  }

  await prisma.phoneVerificationToken.deleteMany({ where: { userId } });

  const code = generatePhoneVerificationCode();

  await prisma.phoneVerificationToken.create({
    data: {
      userId,
      codeHash: hashToken(code),
      expiresAt: addMinutes(new Date(), PHONE_VERIFICATION_EXPIRES_IN_MINUTES),
    },
  });

  return code;
}

export async function verifyPhone(userId: number, code: string) {
  const token = await prisma.phoneVerificationToken.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  if (!token) {
    throw new Error("Phone verification code not found.");
  }

  if (token.expiresAt <= new Date()) {
    await prisma.phoneVerificationToken.delete({ where: { id: token.id } });
    throw new Error("Phone verification code has expired.");
  }

  if (token.attempts >= PHONE_MAX_ATTEMPTS) {
    await prisma.phoneVerificationToken.delete({ where: { id: token.id } });
    throw new Error("Too many verification attempts.");
  }

  if (token.codeHash !== hashToken(code)) {
    await prisma.phoneVerificationToken.update({
      where: { id: token.id },
      data: { attempts: { increment: 1 } },
    });
    throw new Error("Invalid phone verification code.");
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { phoneVerified: true, updatedAt: new Date() },
    }),
    prisma.phoneVerificationToken.delete({ where: { id: token.id } }),
  ]);

  return true;
}

export async function resetPassword(token: string, newPassword: string) {
  const tokenHash = hashToken(token);
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
  });

  if (!resetToken) {
    throw new Error("Invalid password reset token.");
  }

  if (resetToken.expiresAt <= new Date()) {
    await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });
    throw new Error("Password reset token has expired.");
  }

  const passwordHash = await hashPassword(newPassword);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.userId },
      data: { passwordHash, updatedAt: new Date() },
    }),
    prisma.session.deleteMany({ where: { userId: resetToken.userId } }),
    prisma.passwordResetToken.delete({ where: { id: resetToken.id } }),
  ]);

  return true;
}

export async function changePassword(
  userId: number,
  currentPassword: string,
  newPassword: string,
  currentSessionId: string,
) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error("User not found.");
  }

  const valid = await comparePassword(currentPassword, user.passwordHash);

  if (!valid) {
    throw new Error("Current password is incorrect.");
  }

  const samePassword = await comparePassword(newPassword, user.passwordHash);

  if (samePassword) {
    throw new Error(
      "New password must be different from the current password.",
    );
  }

  const passwordHash = await hashPassword(newPassword);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { passwordHash, updatedAt: new Date() },
    }),
    prisma.session.deleteMany({
      where: {
        userId,
        id: { not: currentSessionId },
      },
    }),
  ]);

  return true;
}


/**
 * Resolve the authenticated user only when the backing server-side session is
 * still valid. A signed JWT alone is not sufficient after logout/revocation.
 */
export async function getUserForSession(userId: number, sessionId: string) {
  const session = await prisma.session.findFirst({
    where: { id: sessionId, userId, expiresAt: { gt: new Date() } },
    include: { user: true },
  });
  if (!session) throw new Error("SESSION_INVALID");
  if (
    session.user.status !== UserStatus.ACTIVE ||
    (!session.user.emailVerified && !session.user.phoneVerified)
  ) throw new Error("ACCOUNT_NOT_READY");
  return getCurrentUser(userId);
}
