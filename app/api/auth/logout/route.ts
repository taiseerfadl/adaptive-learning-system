import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { logout } from "@/services/auth-service";
import { verifyRefreshToken } from "@/lib/auth/jwt";

export const runtime = "nodejs";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (refreshToken) {
    try {
      const payload = verifyRefreshToken(refreshToken);
      await logout(payload.sessionId);
    } catch {
      // يتم حذف الكوكيز حتى لو كانت الجلسة منتهية أو غير صالحة.
    }
  }

  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  const secure = process.env.NODE_ENV === "production";

  for (const name of ["accessToken", "refreshToken"]) {
    response.cookies.set(name, "", {
      httpOnly: true,
      secure,
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });
  }

  return response;
}
