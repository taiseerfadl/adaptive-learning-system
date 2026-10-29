import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { changePasswordSchema } from "@/lib/validators/auth-schema";
import { changePassword } from "@/services/auth-service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 },
      );
    }

    const payload = verifyAccessToken(accessToken);
    const body = await request.json();
    const validation = changePasswordSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password data",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    await changePassword(
      payload.userId,
      validation.data.currentPassword,
      validation.data.newPassword,
      payload.sessionId,
    );

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to change password";

    const status = message === "Authentication required" ? 401 : 400;

    return NextResponse.json({ success: false, message }, { status });
  }
}
