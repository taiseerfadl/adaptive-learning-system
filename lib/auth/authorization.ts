import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { getUserForSession } from "@/services/auth-service";
import type { AccountType } from "@/types/user";

export async function requireAuth() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("AUTHENTICATION_REQUIRED");
  }

  const payload = verifyAccessToken(accessToken);
  const user = await getUserForSession(payload.userId, payload.sessionId);

  return { payload, user };
}

export async function requireRole(...allowedRoles: AccountType[]) {
  const auth = await requireAuth();

  if (!allowedRoles.includes(auth.user.role)) {
    throw new Error("FORBIDDEN");
  }

  return auth;
}
