import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken, verifyScopedToken } from "@/lib/auth/jwt";
import { verifyPhone } from "@/services/auth-service";
import { verifyPhoneSchema } from "@/lib/validators/auth-schema";
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

    // Rate limiting: max 10 attempts per IP per 10 minutes
    const rateLimit = checkRateLimit(`verify-phone:ip:${ip}`, {
      windowMs: 10 * 60 * 1000,
      max: 10,
    });

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message: `عدد المحاولات كبير جدًا. يرجى الانتظار ${rateLimit.retryAfterSeconds} ثانية.`,
        },
        { status: 429 },
      );
    }

    const body = await request.json();
    const validation = verifyPhoneSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "رمز التحقق غير صالح، يجب أن يتكون من 6 أرقام",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    let targetUserId: number | null = null;

    // 1. Try resolving userId from cookie session
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (accessToken) {
      try {
        const payload = verifyAccessToken(accessToken);
        targetUserId = payload.userId;
      } catch {
        // Access token might be expired; check other auth proofs below
      }
    }

    // 2. Try resolving userId from scoped verification token
    if (!targetUserId && validation.data.verificationToken) {
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
            message: "جلسة التحقق منتهية الصلاحية أو غير صالحة. أعد المحاولة.",
          },
          { status: 401 },
        );
      }
    }

    // 3. Try resolving userId from phoneNumber lookup
    if (!targetUserId && validation.data.phoneNumber) {
      const normalized = normalizePhone(validation.data.phoneNumber);
      const user = await prisma.user.findUnique({
        where: { phoneNumber: normalized },
      });
      if (user) {
        targetUserId = user.id;
      }
    }

    // 4. Fallback to explicit userId if provided
    if (!targetUserId && validation.data.userId) {
      targetUserId = validation.data.userId;
    }

    if (!targetUserId) {
      return NextResponse.json(
        {
          success: false,
          message: "يجب تقديم رمز المصادقة أو رقم الهاتف للتحقق",
        },
        { status: 401 },
      );
    }

    await verifyPhone(targetUserId, validation.data.code);

    return NextResponse.json({
      success: true,
      message: "تم التحقق من رقم الهاتف بنجاح",
    });
  } catch (error) {
    const rawMessage =
      error instanceof Error ? error.message : "فشل التحقق من رقم الهاتف";

    const messages: Record<string, string> = {
      "Phone verification code not found.": "رمز التحقق غير موجود أو تم استخدامه مسبقًا.",
      "Phone verification code has expired.": "انتهت صلاحية رمز التحقق. يرجى طلب رمز جديد.",
      "Too many verification attempts.": "تم تجاوز الحد الأقصى للمحاولات الخاطئة. اطلب رمزًا جديدًا.",
      "Invalid phone verification code.": "رمز التحقق غير صحيح.",
    };

    const message = messages[rawMessage] || rawMessage;

    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

