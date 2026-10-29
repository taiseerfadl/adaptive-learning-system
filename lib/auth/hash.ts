import { createHash, randomBytes, randomInt } from "crypto";

export function hashToken(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

export function generateRandomToken(length = 32): string {
  return randomBytes(length).toString("hex");
}

export function generatePhoneVerificationCode(): string {
  return randomInt(100000, 1000000).toString();
}
