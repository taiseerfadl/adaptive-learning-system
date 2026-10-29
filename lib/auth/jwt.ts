import jwt, { type JwtPayload as JsonWebTokenPayload } from "jsonwebtoken";
import type { AccountType } from "@/types/user";
import type { JwtPayload } from "@/types/auth";

const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "30d";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_SECRET must be defined and at least 32 characters long.",
    );
  }

  return secret;
}

function getRefreshSecret(): string {
  const secret = process.env.JWT_REFRESH_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_REFRESH_SECRET must be defined and at least 32 characters long.",
    );
  }

  return secret;
}

export const ACCESS_TOKEN_EXPIRES_IN_SECONDS = 15 * 60;
export const REFRESH_TOKEN_EXPIRES_IN_SECONDS = 30 * 24 * 60 * 60;
export const DEFAULT_REFRESH_TOKEN_EXPIRES_IN_SECONDS = 24 * 60 * 60;

export function generateAccessToken(
  userId: number,
  role: AccountType,
  sessionId: string,
): string {
  const payload: JwtPayload = { userId, role, sessionId };

  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
}

export function generateRefreshToken(
  userId: number,
  role: AccountType,
  sessionId: string,
  expiresIn: string | number = REFRESH_TOKEN_EXPIRES_IN,
): string {
  const payload: JwtPayload = { userId, role, sessionId };

  // Cast to `any` to work around the jsonwebtoken overload mismatch
  // when expiresIn is a `number` (seconds) vs the overloaded string literal type.
  return jwt.sign(payload, getRefreshSecret(), {
    expiresIn: expiresIn as any,
  });
}

function parsePayload(decoded: string | JsonWebTokenPayload): JwtPayload {
  if (
    typeof decoded === "string" ||
    typeof decoded.userId !== "number" ||
    typeof decoded.role !== "string" ||
    typeof decoded.sessionId !== "string"
  ) {
    throw new Error("Invalid JWT payload structure.");
  }

  return {
    userId: decoded.userId,
    role: decoded.role as AccountType,
    sessionId: decoded.sessionId,
    iat: decoded.iat,
    exp: decoded.exp,
  };
}

export function verifyAccessToken(token: string): JwtPayload {
  return parsePayload(jwt.verify(token, getJwtSecret()));
}

export function verifyRefreshToken(token: string): JwtPayload {
  return parsePayload(jwt.verify(token, getRefreshSecret()));
}

export type ScopedTokenPurpose =
  | "phone_verification"
  | "email_verification"
  | "password_reset";

export interface ScopedTokenPayload {
  userId: number;
  purpose: ScopedTokenPurpose;
  iat?: number;
  exp?: number;
}

export function generateScopedToken(
  userId: number,
  purpose: ScopedTokenPurpose,
  expiresInSeconds = 15 * 60,
): string {
  return jwt.sign({ userId, purpose }, getJwtSecret(), {
    expiresIn: expiresInSeconds,
  });
}

export function verifyScopedToken(
  token: string,
  expectedPurpose: ScopedTokenPurpose,
): { userId: number } {
  const decoded = jwt.verify(token, getJwtSecret()) as ScopedTokenPayload;
  if (
    !decoded ||
    typeof decoded !== "object" ||
    decoded.purpose !== expectedPurpose ||
    typeof decoded.userId !== "number"
  ) {
    throw new Error("Invalid or expired scoped verification token.");
  }
  return { userId: decoded.userId };
}

