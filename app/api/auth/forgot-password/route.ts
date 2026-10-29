import { NextResponse } from "next/server";
import { forgotPasswordSchema } from "@/lib/validators/auth-schema";
import { createPasswordResetToken } from "@/services/auth-service";
import { sendPasswordResetEmail } from "@/lib/auth/email";
import { checkRateLimit } from "@/lib/auth/rate-limiter";

export const runtime = "nodejs";

const GENERIC_MESSAGE =
  "إذا كان الحساب مسجلًا، فسيتم إرسال رابط أو رمز إعادة تعيين كلمة المرور.";

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(`forgot-password:${ip}`, {
      windowMs: 15 * 60 * 1000,
      max: 5,
    });

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message: `تم تجاوز الحد الأقصى للمحاولات. يرجى الانتظار ${rateLimit.retryAfterSeconds} ثانية.`,
        },
        { status: 429 },
      );
    }

    const body = await request.json();
    const validation = forgotPasswordSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "يرجى إدخال بريد إلكتروني أو اسم مستخدم صالح",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const identifier =
      validation.data.identifier || validation.data.email || "";

    const token = await createPasswordResetToken(identifier);

    if (
      token &&
      validation.data.email &&
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      try {
        await sendPasswordResetEmail(validation.data.email, token);
      } catch (emailError) {
        console.error("PASSWORD_RESET_EMAIL_ERROR:", emailError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: GENERIC_MESSAGE,
        ...(process.env.NODE_ENV !== "production" && token
          ? { resetToken: token }
          : {}),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("FORGOT_PASSWORD_ERROR:", error);

    return NextResponse.json(
      { success: true, message: GENERIC_MESSAGE },
      { status: 200 },
    );
  }
}
