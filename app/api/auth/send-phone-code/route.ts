import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken, verifyScopedToken } from "@/lib/auth/jwt";
import { createPhoneVerificationCode } from "@/services/auth-service";
import { sendPhoneCodeSchema } from "@/lib/validators/auth-schema";
import { checkRateLimit } from "@/lib/auth/rate-limiter";
import { prisma } from "@/lib/db/prisma";

export const runtime = "nodejs";

function normalizePhone(phoneNumber: string): string {
  return phoneNumber.replace(/[\s()-]/g, "").trim();
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";

    let bodyData: any = {};
    try {
      bodyData = await request.json();
    } catch {
      // Body can be empty if relying solely on cookie
    }

    const validation = sendPhoneCodeSchema.safeParse(bodyData);

    let targetUserId: number | null = null;

    // 1. Check active session cookie
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (accessToken) {
      try {
        const payload = verifyAccessToken(accessToken);
        targetUserId = payload.userId;
      } catch {
        // Expired cookie, try other sources
      }
    }

    // 2. Check scoped verification token
    if (!targetUserId && validation.success && validation.data.verificationToken) {
      try {
        const scoped = verifyScopedToken(
          validation.data.verificationToken,
          "phone_verification",
        );
        targetUserId = scoped.userId;
      } catch {
        return NextResponse.json(
          {
            success: false,
            message: "جلسة التحقق غير صالحة أو منتهية. يرجى إعادة المحاولة.",
          },
          { status: 401 },
        );
      }
    }

    // 3. Check phone number lookup
    if (!targetUserId && validation.success && validation.data.phoneNumber) {
      const normalized = normalizePhone(validation.data.phoneNumber);
      const user = await prisma.user.findUnique({
        where: { phoneNumber: normalized },
      });
      if (user) targetUserId = user.id;
    }

    // 4. Check explicit userId
    if (!targetUserId && validation.success && validation.data.userId) {
      targetUserId = validation.data.userId;
    }

    if (!targetUserId) {
      return NextResponse.json(
        {
          success: false,
          message: "يجب تسجيل الدخول أو إرسال رمز التحقق المؤقت أو رقم الهاتف",
        },
        { status: 401 },
      );
    }

    // Rate limiting: cooldown 60 seconds per user, max 5 sends per 15 minutes
    const rateLimit = checkRateLimit(`send-phone:${targetUserId}`, {
      windowMs: 15 * 60 * 1000,
      max: 5,
      cooldownMs: 60 * 1000,
    });

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message: `يرجى الانتظار ${rateLimit.retryAfterSeconds} ثانية قبل إعادة إرسال رمز جديد.`,
        },
        { status: 429 },
      );
    }

    const code = await createPhoneVerificationCode(targetUserId);

    return NextResponse.json({
      success: true,
      message: "تم إنشاء رمز التحقق بنجاح",
      ...(process.env.NODE_ENV !== "production" ? { devCode: code } : {}),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "تعذر إرسال رمز التحقق";

    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

