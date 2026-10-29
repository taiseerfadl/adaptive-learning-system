import { NextResponse } from "next/server";
import { resetPasswordSchema } from "@/lib/validators/auth-schema";
import { resetPassword } from "@/services/auth-service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = resetPasswordSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password reset data",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    await resetPassword(validation.data.token, validation.data.password);

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to reset password";

    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
