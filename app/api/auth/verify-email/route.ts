import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken, verifyScopedToken } from "@/lib/auth/jwt";
import { verifyEmail } from "@/services/auth-service";
import { verifyEmailSchema } from "@/lib/validators/auth-schema";
import { checkRateLimit } from "@/lib/auth/rate-limiter";
import { prisma } from "@/lib/db/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";

    // Rate limiting: max 10 attempts per IP per 10 minutes
    const rateLimit = checkRateLimit(`verify-email:ip:${ip}`, {
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
    const validation = verifyEmailSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "بيانات التحقق غير صالحة",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const codeOrToken = validation.data.code || validation.data.token;
    if (!codeOrToken) {
      return NextResponse.json(
        { success: false, message: "رمز التحقق مطلوب" },
        { status: 400 },
      );
    }

    let targetUserId: number | undefined = undefined;

    // 1. Session cookie
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (accessToken) {
      try {
        const payload = verifyAccessToken(accessToken);
        targetUserId = payload.userId;
      } catch {
        // Expired cookie
      }
    }

    // 2. Scoped token
    if (!targetUserId && validation.data.verificationToken) {
      try {
        const scoped = verifyScopedToken(
          validation.data.verificationToken,
          "email_verification",
        );
        targetUserId = scoped.userId;
      } catch {
        // Check if it was issued as phone_verification
        try {
          const scoped = verifyScopedToken(
            validation.data.verificationToken,
            "phone_verification",
          );
          targetUserId = scoped.userId;
        } catch {
          // Token invalid
        }
      }
    }

    // 3. Email lookup
    if (!targetUserId && validation.data.email) {
      const user = await prisma.user.findUnique({
        where: { email: validation.data.email.trim().toLowerCase() },
      });
      if (user) targetUserId = user.id;
    }

    if (!targetUserId && validation.data.userId) {
      targetUserId = validation.data.userId;
    }

    const user = await verifyEmail(codeOrToken, targetUserId);

    return NextResponse.json({
      success: true,
      message: "تم تأكيد البريد الإلكتروني بنجاح",
      data: user,
    });
  } catch (error) {
    const raw = error instanceof Error ? error.message : "";
    const messages: Record<string, string> = {
      "Invalid or missing verification token.": "رمز التحقق غير صحيح أو غير موجود.",
      "Verification token has expired.": "انتهت صلاحية رمز التحقق. يرجى طلب رمز جديد.",
    };
    const message = messages[raw] || "فشل التحقق من البريد الإلكتروني";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
