import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { getUserForSession } from "@/services/auth-service";

export const runtime = "nodejs";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 401 },
      );
    }

    const payload = verifyAccessToken(accessToken);
    const user = await getUserForSession(payload.userId, payload.sessionId);

    return NextResponse.json({ authenticated: true, user });
  } catch {
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 401 },
    );
  }
}
